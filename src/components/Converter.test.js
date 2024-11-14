import { render, screen, fireEvent } from "@testing-library/react";
import Converter from "./Converter";

// Mocking the fetch function
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ conversion_rates: { EUR: 0.85 } }) // Mocking an exchange rate response
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

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
