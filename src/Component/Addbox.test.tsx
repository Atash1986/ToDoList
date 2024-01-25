import { render, screen } from "@testing-library/react";
import Addbox from "./AddBox";
import "@testing-library/jest-dom";

test("containar should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-container/i);
  expect(s).toBeInTheDocument();
});

test("title box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-title/i);
  expect(s).toBeInTheDocument();
});

test("author box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );

  const s = screen.getByTestId(/add-box-author/i);
  expect(s).toBeInTheDocument();
});

test("add button should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-add-button/i);
  expect(s).toBeInTheDocument();
});

test("error box should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );
  const s = screen.getByTestId(/add-box-error-box/i);
  expect(s).toBeInTheDocument();
});

test("should disable the fields in case of all task has active category id equal 0", () => {
  render(
    <Addbox
      activeCategoryId={0}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
      // setItems={() => {}}
    />
  );
  const title = screen.getByTestId(/add-box-title/i);
  expect(title).toBeDisabled();
  const author = screen.getByTestId(/add-box-author/i);
  expect(author).toBeDisabled();
  const addbtn = screen.getByTestId(/add-box-add-button/i);
  expect(addbtn).toBeDisabled();
});

test("should enable the fields in case of valid active category", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      // itemId={1}
      // setItemId={() => {}}
    />
  );
  const title = screen.getByTestId(/add-box-title/i);
  expect(title).toBeEnabled();
  const author = screen.getByTestId(/add-box-author/i);
  expect(author).toBeEnabled();
  const addbtn = screen.getByTestId(/add-box-add-button/i);
  expect(addbtn).toBeEnabled();
});
