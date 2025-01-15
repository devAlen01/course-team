import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "./db";

export async function verifyAuth(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    console.log("🚀 ~ Токен в заголовке Authorization:", token);

    if (!token) {
      console.error("Токен отсутствует");
      return null;
    }

    const tokenRecord = await db.token.findUnique({
      where: { token },
    });

    if (!tokenRecord) {
      console.error("Токен не найден в базе данных");
      return null;
    }

    if (tokenRecord.expires < new Date()) {
      console.log("Токен просрочен, удаляем из базы данных");
      await db.token.delete({
        where: { id: tokenRecord.id },
      });
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    console.log("Декодированный токен:", decoded);

    return decoded.userId; // Возвращаем идентификатор пользователя
  } catch (error) {
    console.error("Ошибка при проверке токена:", error); // Логируем ошибку
    return null;
  }
}
