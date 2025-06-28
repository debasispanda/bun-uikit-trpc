import type { INote } from "@/common/types/Note";
import { Note } from "../Note/Note";
import { HvEmptyState, HvSimpleGrid } from "@hitachivantara/uikit-react-core";
import { InfoIcon } from "@phosphor-icons/react";

export const NoteList = ({ notes }: { notes: INote[] }) => {
  if (notes.length === 0) {
    return <HvEmptyState icon={<InfoIcon />} title="No notes found!" />;
  }

  return (
    <HvSimpleGrid
      cols={1}
      spacing="sm"
      breakpoints={[
        { minWidth: 1600, cols: 6, spacing: "md" },
        { minWidth: 1000, cols: 4, spacing: "sm" },
        { minWidth: 600, cols: 2, spacing: "sm" },
      ]}
    >
      {notes.map((note) => (
        <Note key={note.id} data={note} />
      ))}
    </HvSimpleGrid>
  );
};
