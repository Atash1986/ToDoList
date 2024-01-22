import { render, screen } from "@testing-library/react";
import Addbox from "./AddBox";
import "@testing-library/jest-dom";

test("for testing liberary", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-container/i);
  // console.log(">>>>>> s=", s);
  expect(s).toBeInTheDocument();
});
