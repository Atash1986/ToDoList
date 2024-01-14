import { getDateTimeFromTimeStamp } from "./dateHelpers";

it("getDateTimeFromTimeStamp() should return proper result", () => {
  const sampleTimestamp = 1123736034;
  const result = getDateTimeFromTimeStamp(sampleTimestamp);
  expect(result).toEqual({ date: "Thu,11 Aug", time: "6:53" });
});
