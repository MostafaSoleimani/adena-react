import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import * as React from 'react';
import { FIELDS_DATA_MODELS } from '../../core-fields/field-models';

export default function ChooseFieldDialog(props) {
  const { onClose, open } = props;
  const selectedValue = FIELDS_DATA_MODELS[0];

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select a field to add</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.values(FIELDS_DATA_MODELS).map((field, idx) => (
          <ListItem button onClick={() => handleListItemClick(field)} key={idx}>
            <ListItemText primary={field.data.type} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

ChooseFieldDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
