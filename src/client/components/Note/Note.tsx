import { theme } from "@hitachivantara/uikit-react-core";
import { useEffect, useRef, useState } from "react";
import type { INote } from "@/common/types/Note";
import { css } from "@emotion/css";
import NoteActions from "../NoteActions/NoteActions";
import useNoteTRPC from "../../api/useNoteTRPC";
import { ActionMode } from "@/client/configs/modes";

const styles = {
  note: (color?: string) =>
    css({
      boxShadow:
        "0 1px 2px 0 rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)",
      borderRadius: 8,
      background: color ?? "#fff",
      color: color ? theme.colors.base_light : "inherit",
      "& button": {
        color: color ? theme.colors.base_light : "inherit",
      },
      padding: 10,
    }),
  noteInput: (color?: string, editMode?: boolean) =>
    css({
      boxSizing: "border-box",
      outline: "none",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      minHeight: 46,
      lineHeight: "1.25rem",
      padding: "12px 16px",
      display: "inline-block",
      width: "100%",
      "&:empty::before": {
        content: editMode ? "attr(data-placeholder)" : "none",
        color: color ? theme.colors.base_light : theme.colors.secondary_60,
      },
    }),
};

interface NoteProps {
  data?: INote;
  mode?: ActionMode;
}

export const Note = ({ data, mode = ActionMode.VIEW }: NoteProps) => {
  const [note, setNote] = useState<Partial<INote>>();
  const [currentMode, setCurrentMode] = useState(mode);
  const isCreateOrEdit = [ActionMode.CREATE, ActionMode.EDIT].includes(
    currentMode
  );
  const [expanded, setExpanded] = useState(() => !isCreateOrEdit);

  useEffect(() => {
    if (data) {
      setNote(data);
    }
  }, [data]);

  const { createNote, updateNote, deleteNote } = useNoteTRPC();

  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    if (titleRef.current) {
      titleRef.current.innerHTML = "";
    }

    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const isValidNote = note?.title && note?.title.trim().length > 0;

  const handleSubmit = () => {
    if (note?.id) {
      updateNote(note as INote);
    } else {
      createNote(note as Omit<INote, "id">);
      setNote({});
      reset();
    }
    // reset the default mode
    setCurrentMode(mode);
  };

  const handleCancel = () => {
    if (mode === ActionMode.CREATE) {
      setExpanded(false);
      setNote({});
    } else {
      setNote({ ...data });
      setCurrentMode(mode);
    }
  };

  const handleDelete = () => {
    if (note?.id) deleteNote(note.id);
  };

  return (
    <div className={styles.note(note?.color)}>
      <div
        ref={titleRef}
        className={styles.noteInput(note?.color, isCreateOrEdit)}
        data-placeholder={expanded ? "Title" : "Take a note"}
        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
        contentEditable={isCreateOrEdit}
        onInput={(e) =>
          setNote((prev) => ({
            ...prev,
            title: (e.target as HTMLDivElement).textContent || "",
          }))
        }
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(true);
        }}
      >
        {data?.title}
      </div>
      {expanded && (
        <>
          <div
            ref={contentRef}
            className={styles.noteInput(note?.color, isCreateOrEdit)}
            data-placeholder="Take a note"
            contentEditable={isCreateOrEdit}
            onInput={(e) =>
              setNote((prev) => ({
                ...prev,
                content: (e.target as HTMLDivElement).textContent || "",
              }))
            }
          >
            {data?.content}
          </div>
          <NoteActions
            note={note as INote}
            onColorChange={(v) => setNote((prev) => ({ ...prev, color: v }))}
            onCancel={handleCancel}
            disabled={!isValidNote}
            onSubmit={handleSubmit}
            mode={currentMode}
            onEdit={() => setCurrentMode(ActionMode.EDIT)}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};
