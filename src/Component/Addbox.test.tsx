import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Addbox from "./AddBox";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import * as taskApis from "../apis/task";
import { addTask } from "../apis/task";
import * as authorApis from "../apis/author";
import { sampleAuthors } from "../fixtures/author";
import { sampleTask } from "../fixtures/task";

jest.mock("axios");

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

test("check call api", async () => {
  const addTaskSpy = jest.spyOn(taskApis, "addTask");
  // const setItemMock = jest.spyOn(MainPageFunc, "addNewItemToState");
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
  // fireEvent.change(author, { target: { value: { id: "1" } } });
  const authorId = 1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const addbtn = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(addbtn);

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  expect(addTaskSpy).toHaveBeenCalledWith(1, "do the dishes", "1");

  // expect(setItemMock).toHaveBeenCalled();
});

test.skip("addNewItemToState updates activeItems correctly", async () => {
  const mockAddNewItemToState = jest.fn();
  render(
    <Addbox
      activeCategoryId={1}
      addNewItemToState={mockAddNewItemToState}
      authorsItems={sampleAuthors}
    />
  );

  const title = screen.getByTestId(/add-box-title/i);
  fireEvent.change(title, { target: { value: "do the dishes2" } });
  const authorInput = screen.getByTestId(/add-box-author/i);
  const authorId = 1;
  fireEvent.change(authorInput, { target: { value: authorId.toString() } });
  fireEvent.blur(authorInput);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", event.target.value);
    // ... rest of your code
  };
  //
  // fireEvent.change(author, { target: { value: "2" } });
  // Assuming there's a button or element triggering the function
  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton, handleChange);

  // Check if addNewItemToState is called once
  await waitFor(() => expect(mockAddNewItemToState).toHaveBeenCalledTimes(1));
});

test("addNewItemToState updates activeItems correctly (new)", async () => {
  // jest.spyOn(authorApis, "getAuthorsItems").mockResolvedValue(sampleAuthors);

  // jest.spyOn(taskApis, "addTask").mockResolvedValue(sampleTask);
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
  // act(() => {
  // fireEvent.click(authorDropdown);
  // fireEvent.mouseDown(authorDropdown);
  // });

  // expect(screen.getByText("Qoli")).toBeVisible();

  // fireEvent.click(screen.getByText("Qoli"));
  // fireEvent.mouseDown(screen.getByText("Qoli"));

  const triggerButton = screen.getByTestId(/add-box-add-button/i);
  fireEvent.click(triggerButton);

  // Check if addNewItemToState is called once
  await waitFor(() => expect(mockAddNewItemToState).toHaveBeenCalledTimes(1));
});

// test("addNewItemToState updates activeItems correctly", () => {
//   const initialItems = [
//     {
//       id: "2",
//       title: "string",
//       isDone: true,
//       author: { id: 2, name: "string", fullName: "string " },
//       creationDate: 43254,
//       categoryItem: { id: 2, color: "" },
//     },
//   ];
//   const newItem = {
//     id: "2",
//     title: "string",
//     isDone: true,
//     author: { id: 2, name: "string", fullName: "string " },
//     creationDate: 43254,
//     categoryItem: { id: 2, color: "" },
//   };

//   // Mock setActiveItems function
//   const setActiveItemsMock = jest.fn();

//   // Test the addNewItemToState function
//   addNewItemToState(newItem);

//   // Check if setActiveItems is called with the correct arguments
//   expect(setActiveItemsMock).toHaveBeenCalledWith([...initialItems, newItem]);
// });
