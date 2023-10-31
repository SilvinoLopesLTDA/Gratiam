import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartItems from "./CartItems";

const mockStore = configureStore();

describe("CartItems Component", () => {
  it("renders CartItems component", () => {
    expect(true).toBeDefined();
    const store = mockStore({
      product: {
        cart: {
          cart: [],
          isLoading: false,
        },
      },
      transaction: {
        transactions: [],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <CartItems cartItems={[]} isLoading={false} />
      </Provider>
    );
  });
});
