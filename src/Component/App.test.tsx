import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("check container div item is in page", () => {
  render(<App />);
  const s = screen.getByTestId(/app-container/i);
  expect(s).toBeInTheDocument();
});
