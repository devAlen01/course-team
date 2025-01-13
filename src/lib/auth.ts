import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";
import { db } from "./db";

const TOKEN_EXPIRATION_DAYS = 7;

async function generateToken(userId: string) {
  const expirationDate = addDays(new Date(), TOKEN_EXPIRATION_DAYS);

  const token = jwt.sign(
    { userId, exp: Math.floor(expirationDate.getTime() / 1000) },
    process.env.JWT_SECRET!
  );

  await db.token.create({
    data: {
      token,
      expires: expirationDate,
      userId,
    },
  });

  return {
    token,
    expires: expirationDate,
  };
}

export async function register(email: string, password: string, name?: string) {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { token, expires } = await generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, expires };
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    await db.token.deleteMany({
      where: {
        userId: user.id,
        expires: {
          lte: new Date(),
        },
      },
    });

    const { token, expires } = await generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token, expires };
  } catch (error) {
    throw error;
  }
}

export async function logout(token: string) {
  try {
    await db.token.delete({
      where: { token },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getMe(userId: string) {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    const user = {
      id: existingUser?.id,
      email: existingUser?.email,
      name: existingUser?.name,
      avatarUrl: existingUser?.avatarUrl,
      role: existingUser?.role,
    };

    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(
  userId: string,
  data: { name?: string; avatarUrl?: string }
) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
}

export async function updateRole(userId: string, data: { role: string }) {
  try {
    const newRole = await db.user.update({
      where: { id: userId },
      data: {
        role: data.role === "ADMIN" ? "ADMIN" : "USER",
      },
    });

    const {
      password: _,
      avatarUrl,
      createdAt,
      name,
      updatedAt,
      ...userWithoutPassword
    } = newRole;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
}
