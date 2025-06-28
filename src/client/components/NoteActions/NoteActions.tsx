import {
  HvActionBar,
  HvButton,
  HvCheckBox,
  HvColorPicker,
  HvGrid,
  HvToggleButton,
  theme,
} from "@hitachivantara/uikit-react-core";
import { recommendedColors } from "@/client/configs/colors";
import type { INote } from "@/common/types/Note";
import { ActionMode } from "@/client/configs/modes";
import {
  PencilSimpleIcon,
  PushPinSimpleIcon,
  StarIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react";
import { Confirm } from "../Confirm/Confirm";
import { useState } from "react";
import { css } from "@emotion/css";

const styles = {
  recommendedColorsRoot: css({
    "& .HvColorPicker-PresetColors-swatchWrap div": {
      border: `1px solid ${theme.colors.border}`,
    },
  }),
};

interface NoteActionsProps {
  note?: INote;
  mode?: ActionMode;
  onColorChange: (value: string) => void;
  onCancel?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  onSubmit: () => void;
  onDelete: () => void;
}

const NoteActions = ({
  note,
  mode = ActionMode.VIEW,
  onColorChange,
  onCancel,
  onEdit,
  disabled,
  onSubmit,
  onDelete,
}: NoteActionsProps) => {
  const isEdit = mode === ActionMode.EDIT;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <HvActionBar className="gap-xs">
        {mode !== ActionMode.VIEW && (
          <HvColorPicker
            classes={{ recommendedColorsRoot: styles.recommendedColorsRoot }}
            iconOnly
            showCustomColors={false}
            recommendedColors={recommendedColors}
            value={note?.color}
            onChange={onColorChange}
            aria-label="Select note color"
          />
        )}
        {mode === ActionMode.VIEW && (
          <>
            <HvCheckBox onChange={() => {}} />
            <HvToggleButton
              selectedIcon={<StarIcon weight="fill" size={16} />}
              notSelectedIcon={<StarIcon size={16} />}
            />
            <HvToggleButton
              selectedIcon={<PushPinSimpleIcon weight="fill" size={16} />}
              notSelectedIcon={<PushPinSimpleIcon size={16} />}
            />
            <HvButton icon onClick={onEdit}>
              <PencilSimpleIcon size={16} />
            </HvButton>
            <HvButton icon onClick={() => setIsDeleteOpen(true)}>
              <TrashSimpleIcon size={16} />
            </HvButton>
          </>
        )}
        <HvGrid flex="1" aria-hidden="true" />
        {mode !== ActionMode.VIEW && (
          <>
            <HvButton
              variant="secondaryGhost"
              disabled={disabled}
              onClick={() => onSubmit()}
            >
              {isEdit ? "Save" : "Add"}
            </HvButton>
            <HvButton variant="secondaryGhost" onClick={onCancel}>
              Cancel
            </HvButton>
          </>
        )}
      </HvActionBar>
      {isDeleteOpen && (
        <Confirm
          open={isDeleteOpen}
          onCancel={() => setIsDeleteOpen(false)}
          onConfirm={() => {
            onDelete();
            setIsDeleteOpen(false);
          }}
          itemName={note?.title}
        />
      )}
    </>
  );
};

export default NoteActions;
