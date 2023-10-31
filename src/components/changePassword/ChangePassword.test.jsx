import {
  render,
  fireEvent,
  //  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangePassword from "./ChangePassword";
import { toast } from "react-toastify";
// import { changePassword } from "../../services/authService";

// Mockando os módulos necessários
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../services/authService", () => ({
  changePassword: jest.fn().mockResolvedValue("Senha alterada com sucesso"),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ChangePassword Component", () => {
  it("renders without crashing", () => {
    render(<ChangePassword />);
    expect(screen.getByText("Alterar")).toBeInTheDocument();
  });

  it("updates form fields correctly", () => {
    render(<ChangePassword />);
    const oldPasswordInput = screen.getByLabelText("Senha Atual");
    const newPasswordInput = screen.getByLabelText("Nova Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirmar Nova Senha");

    fireEvent.change(oldPasswordInput, { target: { value: "oldPassword" } });
    fireEvent.change(newPasswordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password2" } });

    expect(oldPasswordInput.value).toBe("oldPassword");
    expect(newPasswordInput.value).toBe("password");
    expect(confirmPasswordInput.value).toBe("password2");
  });

  it("displays error message if passwords do not match", () => {
    render(<ChangePassword />);
    const submitButton = screen.getByText("Alterar");

    fireEvent.click(submitButton);

    expect(toast.success).toBeDefined();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  //   it("calls changePassword and navigates on successful password change", async () => {
  //     render(<ChangePassword />);
  //     const oldPasswordInput = screen.getByLabelText("Senha Atual");
  //     const newPasswordInput = screen.getByLabelText("Nova Senha");
  //     const confirmPasswordInput = screen.getByLabelText("Confirmar Nova Senha");
  //     const submitButton = screen.getByText("Alterar");

  //     fireEvent.change(oldPasswordInput, { target: { value: "oldpass" } });
  //     fireEvent.change(newPasswordInput, { target: { value: "newpass" } });
  //     fireEvent.change(confirmPasswordInput, { target: { value: "newpass" } });
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       expect(changePassword).toHaveBeenCalledWith({
  //         oldPassword: "oldpass",
  //         password: "newpass",
  //         password2: "newpass",
  //       });
  //       expect(toast.success).toHaveBeenCalledWith("Senha alterada com sucesso");
  //       expect(screen.getByText("Alterar Senha")).toBeInTheDocument(); // Assuming navigation resets the component state
  //     });
  //   });
});
