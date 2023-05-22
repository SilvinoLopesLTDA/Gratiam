import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { product, search } = action.payload;
      if (Array.isArray(product)) {
        const searchWords = search.toLowerCase().split(" ");

        const tempProducts = product.filter((product) => {
          const lowercaseName = product.name.toLowerCase();
          const lowercaseCategory = product.category.toLowerCase();
          const lowercaseColors = product.colors.map((color) =>
            color.toLowerCase()
          );

          const isMatch = (str, words) => {
            if (typeof str === "string") {
              return words.every((word) => str.includes(word));
            } else if (Array.isArray(str)) {
              return words.every((word) =>
                str.some((item) => item.includes(word))
              );
            }
            return false;
          };

          return (
            isMatch(lowercaseName, searchWords) ||
            isMatch(lowercaseCategory, searchWords) ||
            isMatch(lowercaseColors, searchWords)
          );
        });

        state.filteredProducts = tempProducts;
      }
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
