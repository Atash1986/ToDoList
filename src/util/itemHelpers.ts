export function removeItemsWithValue(
  errorMessage: String,
  errorList: String[],
  setErrorList: any
) {
  const newArray = errorList.filter((error) => error !== errorMessage);
  setErrorList(newArray);
}
