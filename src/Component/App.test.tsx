import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

test("check container div item is in page", () => {
  render(<App />);
  const s = screen.getByTestId(/app-container/i);
  expect(s).toBeInTheDocument();
});

// test("Sidbar component is present within App component", () => {
//   render(<App />);

//   const SidbarElement = screen.getByTestId("Sidbar");

//   expect(SidbarElement).toBeInTheDocument();
// });

// test("MainPage component is present within App component", () => {
//   render(<App />);

//   const SidbarElement = screen.getByTestId("MainPage");

//   expect(SidbarElement).toBeInTheDocument();
// });
