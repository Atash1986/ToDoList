import { render, screen } from "@testing-library/react";
import Addbox from "./AddBox";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

test("for testing liberary", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/Container/i);
  expect(s).toBeInTheDocument();
});
