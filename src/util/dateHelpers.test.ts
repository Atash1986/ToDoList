import { getDateTimeFromTimeStamp, getFormatedDateTime } from "./dateHelpers";

it("getFormatedDateTime() should return proper result", () => {
  const sampleInput = new Date("05.16.1986");
  const result = getFormatedDateTime(sampleInput);
  expect(result).toEqual({ date: "Friday,16 May", time: "0:0" });
});

it("getDateTimeFromTimeStamp() should return proper result", () => {
  const sampleTimestamps = [1123736034, 987345765, 0];
  const expectedResults = [
    { date: "Thu,11 Aug", time: "6:53" },
    { date: "Sun,15 Apr", time: "16:42" },
    { date: "Thu,1 Jan", time: "1:0" },
  ];

  sampleTimestamps.forEach((sampleTimestamp, index) => {
    const result = getDateTimeFromTimeStamp(sampleTimestamp);
    expect(result).toEqual(expectedResults[index]);
  });
});
