import { insertMany, deleteMany } from "@/server/db";
import data from "../../data/mock.json";

export const up = () => {
  insertMany(data);
};

export const down = () => {
  deleteMany(data.map((d) => d.id));
};
