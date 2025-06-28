import type { INote } from "@/common/types/Note";
import { trpc } from "@/client/api/trpc";

const useNoteTRPC = () => {
  const noteCreateMutation = trpc.noteCreate.useMutation();
  const noteUpdateMutation = trpc.noteUpdate.useMutation();
  const noteDeleteMutation = trpc.noteDelete.useMutation();

  const createNote = async (note: Omit<INote, "id">) => {
    noteCreateMutation.mutate(note);
  };

  const updateNote = async (note: INote) => {
    const { id, ...data } = note;
    noteUpdateMutation.mutate({id, data});
  };

  const deleteNote = async (noteId: string) => {
    noteDeleteMutation.mutate(noteId);
  };

  return { createNote, updateNote, deleteNote };
};

export default useNoteTRPC;
