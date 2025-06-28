import { trpc } from "@/client/api/trpc";
import { Note } from "../Note/Note";
import { NoteList } from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import type { INote } from "@/common/types/Note";
import { ActionMode } from "@/client/configs/modes";
import { NoteMutationType } from "@/common/constants/note-mutation-type";

export const NoteBoard = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { data } = trpc.noteList.useQuery();

  trpc.noteSubscription.useSubscription(undefined, {
    onData: (e) => {
      switch (e.action) {
        case NoteMutationType.CREATE:
          setNotes((prev) => [...prev, e.data]);
          break;
        case NoteMutationType.UPDATE:
          setNotes((prev) =>
            prev.map((note) => (note.id === e.data.id ? e.data : note))
          );
          break;
        case NoteMutationType.DELETE:
          setNotes((prev) => prev.filter((note) => note.id !== e.data.id));
          break;
        default:
          console.log("Invalid action!");
          break;
      }
    },
  });

  useEffect(() => {
    if (data) setNotes(data);
  }, [data]);

  return (
    <>
      <div style={{ width: 500, margin: "auto", marginBottom: 20 }}>
        <Note mode={ActionMode.CREATE} />
      </div>
      <NoteList notes={notes} />
    </>
  );
};
