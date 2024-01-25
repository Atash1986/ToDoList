import { render, screen } from "@testing-library/react";
import Addbox from "./AddBox";
import "@testing-library/jest-dom";

test("containar should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-container/i);
  expect(s).toBeInTheDocument();
});

test("title box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-title/i);
  expect(s).toBeInTheDocument();
});

test("author box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );

  const s = screen.getByTestId(/add-box-author/i);
  expect(s).toBeInTheDocument();
});

test("add button should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-add-button/i);
  expect(s).toBeInTheDocument();
});

test("error box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      itemId={1}
      setItemId={() => {}}
      setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-error-box/i);
  expect(s).toBeInTheDocument();
});
