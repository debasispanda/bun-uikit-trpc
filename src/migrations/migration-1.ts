import { createTable } from "@/server/db";

export const up = () => {
  createTable();
};

export const down = () => {};
