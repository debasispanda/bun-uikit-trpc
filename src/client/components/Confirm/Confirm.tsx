import {
  HvDialog,
  HvDialogTitle,
  HvDialogContent,
  HvDialogActions,
  HvButton,
} from "@hitachivantara/uikit-react-core";

interface ConfirmProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemName?: string;
}

export const Confirm = ({
  open,
  onConfirm,
  onCancel,
  itemName = "this item",
}: ConfirmProps) => {
  return (
    <HvDialog open={open} variant="warning" onClose={onCancel}>
      <HvDialogTitle variant="warning">Delete Confirmation</HvDialogTitle>
      <HvDialogContent indentContent>
        Are you sure you want to delete <strong>{itemName}</strong>? This action
        cannot be undone.
      </HvDialogContent>
      <HvDialogActions>
        <HvButton variant="secondaryGhost" onClick={onConfirm}>
          Confirm
        </HvButton>
        <HvButton autoFocus variant="secondaryGhost" onClick={onCancel}>
          Cancel
        </HvButton>
      </HvDialogActions>
    </HvDialog>
  );
};
