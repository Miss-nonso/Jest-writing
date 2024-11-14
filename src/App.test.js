import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Currency Converter title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Currency Converter/i);
  expect(titleElement).toBeInTheDocument();
});
