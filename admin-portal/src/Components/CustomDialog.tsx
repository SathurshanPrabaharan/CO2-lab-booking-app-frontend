import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DialogContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '15px',
    minWidth: '300px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'rgb(245 245 244)',
    color:'#020617',
  },
}));

const Title = styled(DialogTitle)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

const Content = styled(DialogContent)({
  fontSize: '1.1rem',
  margin: '20px 0',
  textAlign: 'left',
});

const Actions = styled(DialogActions)({
  justifyContent: 'center',
});

const CloseButton = styled(Button)({
  backgroundColor: '#61dafb',
  color: '#282c34',
  '&:hover': {
    backgroundColor: '#21a1f1',
  },
});

interface CustomDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, message, onClose }) => {
  return (
    <DialogContainer open={open} onClose={onClose}>
      <Title>PC Details</Title>
      <Content>
        <pre>{message}</pre>
      </Content>
      <Actions>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Actions>
    </DialogContainer>
  );
};

export default CustomDialog;
