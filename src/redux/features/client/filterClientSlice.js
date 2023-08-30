import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredClients: [],
};

const filterClientSlice = createSlice({
  name: "filterClient",
  initialState,
  reducers: {
    FILTER_CLIENTS(state, action) {
      const { client, search } = action.payload;
      if (Array.isArray(client)) {
        const searchWords = search.toLowerCase().split(" ");

        const tempClients = client.filter((client) => {
          const lowercaseName = client.name.toLowerCase();
          const lowercaseEmail= client.email.toLowerCase();

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
            isMatch(lowercaseEmail, searchWords)
          );
        });

        state.filteredClients = tempClients;
      }
    },
  },
});

export const { FILTER_CLIENTS } = filterClientSlice.actions;

export const selectFilteredClients = (state) => state.filterClient.filteredClients;

export default filterClientSlice.reducer;
