import { render, screen } from "@testing-library/react";
import { InputProps } from "./index.d";
import "@testing-library/jest-dom";
import Input from ".";

const renderInput = (props: Partial<InputProps> = {}) =>
  render(<Input name="title" label="Title" type="text" {...props} />);

describe("<Input />", () => {
  it("renders an input with label", () => {
    renderInput();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("displays an error message when provided", () => {
    renderInput({ errorMessage: "Invalid title" });

    expect(screen.getByText("Invalid title")).toBeInTheDocument();
  });

  it("does not show error message when `showErrorMessage` is false", () => {
    renderInput({ errorMessage: "Invalid title", showErrorMessage: false });

    expect(screen.queryByText("Invalid title")).not.toBeInTheDocument();
  });
});
