import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Addbox from "./AddBox";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { addTask } from "../apis/task";
import { sampleAuthors } from "../fixtures/author";
import { sampleTask } from "../fixtures/task";

jest.mock("axios");
jest.mock("../apis/task");

it("renders correctly when there are no items", () => {
  //resultRender.container
  const { container } = render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      authorsItems={sampleAuthors}
    />
  );
  expect(container).toMatchSnapshot();
});

test("containar should be in page", () => {
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
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
      authorsItems={sampleAuthors}
    />
  );
  const title = screen.getByTestId(/add-box-title/i);
  expect(title).toBeEnabled();
  const author = screen.getByTestId(/add-box-author/i);
  expect(author).toBeEnabled();
  const addbtn = screen.getByTestId(/add-box-add-button/i);
  expect(addbtn).toBeEnabled();
});

test("check call add api", async () => {
  (addTask as jest.Mock).mockResolvedValue(sampleTask);

  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={() => {}}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "do the dishes" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = 1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);

  const addbtn = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(addbtn);

  expect(addTask).toHaveBeenCalledWith(1, "do the dishes", 1);
});

test("addNewItemToState updates activeItems correctly", async () => {
  (addTask as jest.Mock).mockResolvedValue(sampleTask);
  const mockAddNewItemToState = jest.fn();

  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const titleInput = screen.getByTestId(/add-box-title/i);
  fireEvent.change(titleInput, { target: { value: "do the dishes2" } });

  const authorDropdown = screen.getByTestId(/add-box-author/i);
  const sampleAuthorId = sampleAuthors[0].id.toString();
  await userEvent.selectOptions(authorDropdown, sampleAuthorId);

  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);

  await waitFor(() => expect(mockAddNewItemToState).toHaveBeenCalledTimes(1));
});

test("should render title required message if user leaves title empty and clicks on the add", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = 1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);
  const errorTitle = screen.getByText(/Title is required/i);
  expect(errorTitle).toBeInTheDocument();
});

test("should render author required message if user leaves author empty and clicks on the add", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "do the shop" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = -1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);
  const errorAuthor = screen.getByText(/Author is required/i);
  expect(errorAuthor).toBeInTheDocument();
});

test("should render title & author required messages if the user leaves the title & author empty and clicks on the add button", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = -1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);
  const errorAuthor = screen.getByText(/Author is required/i);
  const errorTitle = screen.getByText(/Title is required/i);
  expect(errorAuthor).toBeInTheDocument();
  expect(errorTitle).toBeInTheDocument();
});

test("should hide the validation messages after user fix that problem", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = -1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);
  const errorAuthor = screen.getByText(/Author is required/i);
  const errorTitle = screen.getByText(/Title is required/i);
  expect(errorAuthor).toBeInTheDocument();
  expect(errorTitle).toBeInTheDocument();
  fireEvent.change(authorInput, { target: { value: "1" } });
  fireEvent.blur(authorInput);
  fireEvent.change(title, { target: { value: "test" } });
  expect(errorAuthor).not.toBeInTheDocument();
  expect(errorTitle).not.toBeInTheDocument();
});

test("should reset the form if the user add the form data successfully", async () => {
  const mockAddNewItemToState = jest.fn(() => {
    const title = screen.getByTestId(/add-box-title/i);
    fireEvent.change(title, { target: { value: "" } });
    const authorInput = screen.getByTestId(/add-box-author/i);
    const authorId = -1;
    fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  });
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );
  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "test" } });

  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = 1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);
  await waitFor(() => expect(mockAddNewItemToState).toHaveBeenCalledTimes(1));
  expect(title).toHaveValue("");
  expect(authorInput).toHaveValue("-1");
});

test("should show tooltip if the active category is is invalid and cursor is over the form", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={0}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const tooltip = screen.getByTestId(/add-box-title/i);
  fireEvent.mouseOver(tooltip);
  expect(
    screen.getByText((content, element) => {
      const tooltipText = element?.getAttribute("data-tooltip-content");
      return tooltipText === "You Must First Select One Category Item";
    })
  ).toBeInTheDocument();
});

test("should render all of the possible authors inside the Select component", () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );
  const selectElement = screen.getByTestId(/add-box-author/i);
  const options = selectElement.querySelectorAll("option");
  sampleAuthors.forEach((author) => {
    const optionsExists = Array.from(options).some(
      (option) => option.textContent === author.name
    );

    expect(optionsExists).toBeTruthy();
  });
});
