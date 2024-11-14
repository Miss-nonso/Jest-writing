import { render, screen, fireEvent } from "@testing-library/react";
import Converter from "./Converter";

test("converts currency and displays the result", async () => {
  render(<Converter />);

  const amountInput = screen.getByLabelText(/Amount/i);
  const fromCurrencySelect = screen.getByLabelText(/From/i);
  const toCurrencySelect = screen.getByLabelText(/To/i);
  const convertButton = screen.getByText(/Convert/i);

  fireEvent.change(amountInput, { target: { value: "100" } });
  fireEvent.change(fromCurrencySelect, { target: { value: "USD" } });
  fireEvent.change(toCurrencySelect, { target: { value: "EUR" } });
  fireEvent.click(convertButton);

  const result = await screen.findByText(/100 USD = 85 EUR/i);
  expect(result).toBeInTheDocument();
});
