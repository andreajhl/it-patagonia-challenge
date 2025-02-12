import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GlobalProvider, useGlobalContext } from "context";
import { getMessages } from "@actions/index";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import Search from ".";

jest.mock("context", () => ({
  ...jest.requireActual("context"),
  useGlobalContext: jest.fn(),
}));
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@actions/index", () => ({ getMessages: jest.fn() }));

const mockPush = jest.fn();
const mockSetMessages = jest.fn();
const mockMessages = [
  {
    id: 1,
    title: "test 1",
    content: null,
    createdAt: new Date("2025-02-12T03:25:13.018Z"),
    updatedAt: new Date("2025-02-12T03:25:13.018Z"),
  },
  {
    id: 2,
    title: "test 2",
    content: null,
    createdAt: new Date("2025-02-12T03:25:13.018Z"),
    updatedAt: new Date("2025-02-12T03:25:13.018Z"),
  },
  {
    id: 3,
    title: "test 3",
    content: null,
    createdAt: new Date("2025-02-12T03:25:13.018Z"),
    updatedAt: new Date("2025-02-12T03:25:13.018Z"),
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  (useGlobalContext as jest.Mock).mockReturnValue({
    allMessages: mockMessages,
    setAllMessages: mockSetMessages,
    filteredMessages: mockMessages,
    setFilteredMessages: mockSetMessages,
  });
});

const renderSearch = () =>
  render(
    <GlobalProvider initialData={mockMessages}>
      <Search />
    </GlobalProvider>,
  );

describe("<Search />", () => {
  it("renders search input", () => {
    renderSearch();

    expect(
      screen.getByPlaceholderText("Search message..."),
    ).toBeInTheDocument();
  });

  it("should filter messages based on search query", async () => {
    renderSearch();

    const input = screen.getByPlaceholderText("Search message...");
    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() =>
      expect(mockSetMessages).toHaveBeenCalledWith([
        {
          id: 2,
          title: "test 2",
          content: null,
          createdAt: new Date("2025-02-12T03:25:13.018Z"),
          updatedAt: new Date("2025-02-12T03:25:13.018Z"),
        },
      ]),
    );
  });

  it("should reset messages when search query is cleared", async () => {
    (getMessages as jest.Mock).mockResolvedValue(mockMessages);

    renderSearch();

    const input = screen.getByPlaceholderText("Search message...");
    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() =>
      expect(mockSetMessages).toHaveBeenCalledWith([
        {
          id: 2,
          title: "test 2",
          content: null,
          createdAt: new Date("2025-02-12T03:25:13.018Z"),
          updatedAt: new Date("2025-02-12T03:25:13.018Z"),
        },
      ]),
    );

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() =>
      expect(mockSetMessages).toHaveBeenCalledWith(mockMessages),
    );
  });
});
