export function removeItemsWithValue(
  errorMessage: string,
  errorList: string[],
  setErrorList: any
) {
  const newArray = errorList.filter((error) => error !== errorMessage);
  setErrorList(newArray);
}
