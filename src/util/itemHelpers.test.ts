import { removeItemsWithValue } from "./itemHelpers";

test.each([
  ["Select one", ["Select one", "Required Tilte"], ["Required Tilte"]],
  ["Select one", ["Select one"], []],
  ["Select one", ["Required Tilte"], ["Required Tilte"]],
])(
  "remove error message exist in error list",
  (sampleErrorMessage, sampleErrorList, expectedResult) => {
    const setItemsMock = jest.fn();
    removeItemsWithValue(sampleErrorMessage, sampleErrorList, setItemsMock);
    expect(setItemsMock).toHaveBeenCalled();
    expect(setItemsMock).toHaveBeenCalledTimes(1);
    expect(setItemsMock).toHaveBeenCalledWith(expectedResult);
  }
);
