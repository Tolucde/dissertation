import React from 'react';
import { DialogOverlay, DialogContent, Button } from './styles';

const SubmitDialog = ({ onConfirm, onCancel }) => (
  <DialogOverlay>
    <DialogContent>
      <h3>Are you sure you want to submit?</h3>
      <p>You cannot change your answers after submission.</p>
      <Button onClick={onConfirm}>Yes, Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </DialogContent>
  </DialogOverlay>
);

export default SubmitDialog;