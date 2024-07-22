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
    minWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'rgb(245 245 244)',
    color: '#020617',
  },
}));

const Title = styled(DialogTitle)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

const Content = styled(DialogContent)({
  fontSize: '1.1rem',
  margin: '20px 0',
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
  computer: any; // Use specific Computer type if defined
  onClose: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, computer, onClose }) => {
  if (!computer) return null;

  const {
    name,
    serialNum,
    manufacturer,
    model,
    processor,
    memoryType,
    memorySize,
    storageType,
    storageSize,
    operatingSystem,
    purchaseDate,
    purchaseCost,
    warrantyExpiry,
    shortNote,
    lastMaintenanceDate,
    nextMaintenanceDate
  } = computer;

  return (
    <DialogContainer open={open} onClose={onClose}>
      <Title>Computer Details</Title>
      <Content>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr>
              <td className="border p-2 font-bold">Name:</td>
              <td className="border p-2">{name}</td>
            </tr>
            {serialNum && (
              <tr>
                <td className="border p-2 font-bold">Serial Number:</td>
                <td className="border p-2">{serialNum}</td>
              </tr>
            )}
            {manufacturer && (
              <tr>
                <td className="border p-2 font-bold">Manufacturer:</td>
                <td className="border p-2">{manufacturer}</td>
              </tr>
            )}
            {model && (
              <tr>
                <td className="border p-2 font-bold">Model:</td>
                <td className="border p-2">{model}</td>
              </tr>
            )}
            {processor && (
              <tr>
                <td className="border p-2 font-bold">Processor:</td>
                <td className="border p-2">{processor}</td>
              </tr>
            )}
            {memoryType && (
              <tr>
                <td className="border p-2 font-bold">Memory Type:</td>
                <td className="border p-2">{memoryType}</td>
              </tr>
            )}
            {memorySize && (
              <tr>
                <td className="border p-2 font-bold">Memory Size:</td>
                <td className="border p-2">{memorySize}</td>
              </tr>
            )}
            {storageType && (
              <tr>
                <td className="border p-2 font-bold">Storage Type:</td>
                <td className="border p-2">{storageType}</td>
              </tr>
            )}
            {storageSize && (
              <tr>
                <td className="border p-2 font-bold">Storage Size:</td>
                <td className="border p-2">{storageSize}</td>
              </tr>
            )}
            {operatingSystem && (
              <tr>
                <td className="border p-2 font-bold">Operating System:</td>
                <td className="border p-2">{operatingSystem}</td>
              </tr>
            )}
            {purchaseDate && (
              <tr>
                <td className="border p-2 font-bold">Purchase Date:</td>
                <td className="border p-2">{purchaseDate}</td>
              </tr>
            )}
            {purchaseCost && (
              <tr>
                <td className="border p-2 font-bold">Purchase Cost:</td>
                <td className="border p-2">{purchaseCost}</td>
              </tr>
            )}
            {warrantyExpiry && (
              <tr>
                <td className="border p-2 font-bold">Warranty Expiry:</td>
                <td className="border p-2">{warrantyExpiry}</td>
              </tr>
            )}
            {shortNote && (
              <tr>
                <td className="border p-2 font-bold">Short Note:</td>
                <td className="border p-2">{shortNote}</td>
              </tr>
            )}
            {lastMaintenanceDate && (
              <tr>
                <td className="border p-2 font-bold">Last Maintenance Date:</td>
                <td className="border p-2">{lastMaintenanceDate}</td>
              </tr>
            )}
            {nextMaintenanceDate && (
              <tr>
                <td className="border p-2 font-bold">Next Maintenance Date:</td>
                <td className="border p-2">{nextMaintenanceDate}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Content>
      <Actions>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Actions>
    </DialogContainer>
  );
};

export default CustomDialog;
