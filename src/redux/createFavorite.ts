import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string;
  price: string;
}

const initialState: { favorite: FavoriteItem[] } = {
  favorite:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorite") || "[]")
      : [],
};

export const createFavoriteSlice = createSlice({
  name: "CREATE_FAVORITE",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const favorite = [...state.favorite, action.payload];
      state.favorite = favorite;
      localStorage.setItem("favorite", JSON.stringify(favorite));
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter((el) => el.id !== action.payload);
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
  },
});

export const { addToFavorite, deleteFavorite } = createFavoriteSlice.actions;
export default createFavoriteSlice.reducer;
