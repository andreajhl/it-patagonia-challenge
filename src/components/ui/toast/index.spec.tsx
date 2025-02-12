import { render, screen } from "@testing-library/react";
import { useNotificationContext } from "context";
import "@testing-library/jest-dom";
import Toast from ".";

jest.mock("context", () => ({
  useNotificationContext: jest.fn(),
}));

const renderToast = () => render(<Toast />);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("<Toast />", () => {
  it("renders correctly with a message", () => {
    (useNotificationContext as jest.Mock).mockReturnValue({
      notification: { message: "Test message", type: "success", delay: 4000 },
      setNotification: jest.fn(),
    });

    renderToast();

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByLabelText("success")).toBeInTheDocument();
  });

  it("does not render when there is no message", () => {
    (useNotificationContext as jest.Mock).mockReturnValue({
      notification: { message: "", type: "info", delay: 4000 },
      setNotification: jest.fn(),
    });

    renderToast();
    expect(screen.queryByRole("notification")).not.toBeInTheDocument();
  });
});
