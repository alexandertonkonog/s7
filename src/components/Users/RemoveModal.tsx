import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material";
import { UserModel } from "../../store/users/users.types";

export type RemoveModalProps = {
  origin: UserModel | null;
  handleClose: () => void;
  handleRemove: () => void;
};

const RemoveModal: FC<RemoveModalProps> = ({ origin, handleClose, handleRemove }) => {
  const onRemoveClick = () => {
    handleRemove();
    handleClose();
  }

  return (
    <Dialog
      open={!!origin}
      onClose={handleClose}
    >
      <DialogTitle>
        Removing user
      </DialogTitle>
      <DialogContent>
        Remove user {origin?.first_name} {origin?.last_name}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onRemoveClick} color={'primary'}>Remove</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveModal;