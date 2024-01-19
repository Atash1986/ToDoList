import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";
import React from "react";

test("check container div item is in page", () => {
  render(<App />);
  const s = screen.getByTestId(/Container/i);
  expect(s).toBeInTheDocument();
});

test("Sidbar component is present within App component", () => {
  render(<App />);

  const SidbarElement = screen.getByTestId("Sidbar");

  expect(SidbarElement).toBeInTheDocument();
});

test("MainPage component is present within App component", () => {
  render(<App />);

  const SidbarElement = screen.getByTestId("MainPage");

  expect(SidbarElement).toBeInTheDocument();
});
