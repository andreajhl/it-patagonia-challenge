import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useGlobalContext, useNotificationContext } from "context";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import "@testing-library/jest-dom";
import Form from ".";

jest.mock("context", () => ({
  useGlobalContext: jest.fn(),
  useNotificationContext: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

const mockPush = jest.fn();
const mockSetMessages = jest.fn();
const mockHandleSubmit = jest.fn();
const mockSetNotification = jest.fn();

beforeEach(() => {
  (useGlobalContext as jest.Mock).mockReturnValue({
    setMessages: mockSetMessages,
  });
  (useNotificationContext as jest.Mock).mockReturnValue({
    setNotification: mockSetNotification,
  });
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  (useActionState as jest.Mock).mockReturnValue([{}, jest.fn(), false]);
});

const renderForm = () => render(<Form handleSubmit={mockHandleSubmit} />);

describe("<Form />", () => {
  it("renders the form correctly", () => {
    renderForm();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("show error message when input is left empty", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.blur(titleInput);

    expect(
      await screen.findByText(/please enter a valid title/i),
    ).toBeInTheDocument();
  });

  it("delete the error message when input is corrected", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.blur(titleInput);

    expect(
      await screen.findByText(/please enter a valid title/i),
    ).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.focus(titleInput);

    await waitFor(() =>
      expect(
        screen.queryByText(/please enter a valid title/i),
      ).not.toBeInTheDocument(),
    );
  });

  it("active submit button when input is valid", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/title/i);

    fireEvent.change(titleInput, { target: { value: "Valid Title" } });

    const submitButton = screen.getByRole("button");
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});
