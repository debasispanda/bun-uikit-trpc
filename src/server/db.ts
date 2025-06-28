import type { INote } from "@/common/types/Note";
import { Database } from "bun:sqlite";

const db = new Database("data/notedb.sqlite", { create: true });

const TABLE_NAME = "notes";

export const createTable = () =>
  db.run(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      color TEXT
    )`
  );

export const findAll = () =>
  db.query(`SELECT id, title, content, color from ${TABLE_NAME}`).all();

export const insertOne = (data: Omit<INote, "id">) => {
  if (!data) return;

  const values = [
    Bun.randomUUIDv7(),
    data.title,
    data.content ?? "",
    data.color ?? "",
  ] as string[];

  db.run(
    `INSERT INTO ${TABLE_NAME} (id, title, content, color) VALUES (?, ?, ?, ?)`,
    values
  );

  return { id: values[0], ...data };
};

export const insertMany = (data: INote[]) => {
  if (!data?.length) return;

  const placeholders = data.map(() => "(?, ?, ?, ?)").join(", ");
  const values = data.flatMap((d) => [
    d.id || Bun.randomUUIDv7(),
    d.title,
    d.content ?? "",
    d.color ?? "",
  ]) as string[];

  db.run(
    `INSERT INTO ${TABLE_NAME} (id, title, content, color) VALUES ${placeholders}`,
    values
  );
};

export const updateOne = (id: string, data: Omit<INote, "id">) => {
  if (!id || !data) return;

  db.run(
    `UPDATE ${TABLE_NAME} SET title = ?, content = ?, color = ? WHERE id = ?`,
    [data.title, data.content ?? "", data.color ?? "", id]
  );

  return {
    id,
    ...data,
  };
};

export const deleteOne = (id: string) => {
  db.run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
};

export const deleteMany = (ids: string[]) => {
  const placeholders = ids.map(() => "?").join(", ");
  db.run(`DELETE FROM ${TABLE_NAME} WHERE id IN (${placeholders})`, ids);
};
