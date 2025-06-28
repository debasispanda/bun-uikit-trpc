import type { INote } from "@/common/types/Note";

let NOTES: INote[] = [];

export const db = {
  note: {
    findMany: () => NOTES,
    findById: (id: string) => NOTES.find((note) => note.id === id),
    insert: (data: Omit<INote, "id">) => {
      const note = { id: crypto.randomUUID(), ...data };
      NOTES.push(note);
      return note;
    },
    update: (id: string, data: Omit<INote, "id">) => {
      let updatedNote;
      NOTES.forEach((note, i) => {
        if (note.id === id) {
          updatedNote = {
            id,
            ...data,
          };
          NOTES[i] = updatedNote;
          return updatedNote;
        }
      });
      return updatedNote;
    },
    delete: (id: string) => {
      NOTES = NOTES.filter((note) => note.id !== id);
    },
  },
};
