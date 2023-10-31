import {
  render,
   screen,
    waitFor
} from "@testing-library/react";
import { Provider } from "react-redux"; // Certifique-se de ter essa importação
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";
import * as authService from "./services/authService";
import { store } from "./redux/store"; //

// Mocking axios requests
const mock = new MockAdapter(axios);

// Mocking the getLoginStatus function
jest.mock("./services/authService", () => ({
  getLoginStatus: jest.fn(),
}));

// Sample user data for testing
const sampleUserData = {
  email: "test@example.com",
  password: "password123",
};

describe("App", () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
    // Reset any axios mocks
    mock.reset();
  });

  it("renders App component without crashing", () => {
    expect(true).toBeDefined();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Add your assertions or test logic here
  });

  it("logs in a user and updates login status", async () => {
    // Mocking a successful login response
    mock.onPost("/api/users/login").reply(200, { message: "Login successful" });

    // Mocking a successful getLoginStatus response
    authService.getLoginStatus.mockResolvedValue(true);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Perform login actions (filling in form fields, clicking login button, etc.)
    userEvent.type(screen.getByLabelText(/email/i), sampleUserData.email);
    userEvent.type(screen.getByLabelText(/senha/i), sampleUserData.password);
    userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Wait for the login to complete
    await waitFor(() => {
      // Add your assertions here
      // For example, you can check if the user is redirected to the dashboard
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    // Verify that the getLoginStatus function was called
    expect(authService.getLoginStatus).toHaveBeenCalledTimes(1);
  });
});
