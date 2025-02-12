import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useGlobalContext, useNotificationContext } from "context";
import { getMessages } from "@actions/index";
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

jest.mock("@actions/index", () => ({
  getMessages: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn((callback) => [
    { ok: true },
    () => callback(),
    false,
  ]),
}));

const mockPush = jest.fn();
const mockSetMessages = jest.fn();
const mockHandleSubmit = jest.fn();
const mockSetNotification = jest.fn();

const mockMessages = [
  {
    id: 1,
    title: "test 1",
    content: null,
    createdAt: new Date("2025-02-12T03:25:13.018Z"),
    updatedAt: new Date("2025-02-12T03:25:13.018Z"),
  },
];

beforeEach(() => {
  (useGlobalContext as jest.Mock).mockReturnValue({
    setAllMessages: mockSetMessages,
    setFilteredMessages: mockSetMessages,
  });
  (useNotificationContext as jest.Mock).mockReturnValue({
    setNotification: mockSetNotification,
  });
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  (getMessages as jest.Mock).mockResolvedValue(mockMessages);
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

  it("should call handleSubmit and router.push when form is submitted with valid data", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/title/i);

    fireEvent.change(titleInput, { target: { value: "Valid Title" } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();

    await waitFor(() => expect(mockPush).toHaveBeenCalled());
  });

  it("should call setNotification when an error occurs in form submission", async () => {
    (useActionState as jest.Mock).mockReturnValue([
      { ok: false },
      jest.fn(),
      false,
    ]);
    renderForm();

    const titleInput = screen.getByLabelText(/title/i);

    fireEvent.change(titleInput, { target: { value: "Valid Title" } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(mockSetNotification).toHaveBeenCalledWith({
      type: "error",
      message: "Submission failed.",
    });
  });
});
