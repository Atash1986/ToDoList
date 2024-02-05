import { sampleAuthors } from "./author";

export const sampleTask = {
  id: "1",
  title: "title1",
  isDone: false,
  creationDate: 1,
  categoryItem: {
    id: 1,
    color: "red",
  },
  author: sampleAuthors[0],
};
