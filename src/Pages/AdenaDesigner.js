import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../core-design/tools/ConfirmDialog";
import downloadFile from "../core-design/tools/file-exporter";
import { deleteState, loadState } from "../utils/browser-storage";

export default function AdenaDesigner() {
  const [savedForms, setSavedForms] = React.useState(() => loadState());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const navigate = useNavigate();

  const handleCloseDialog = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      deleteState(deleteId);
      setOpenSnack(true);
      setSavedForms((prev) => prev.filter((x) => x.id !== deleteId));
    }
  };

  const handleCloseSnack = () => setOpenSnack(false);

  const openDeleteDialog = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

  const exportJson = (schema) => {
    downloadFile(schema, `${schema.name}-schema`);
  };

  const navigateToDesign = (id) => {
    navigate(`/design/${id}`);
  };

  const navigateToRenderer = (id) => {
    navigate(`/view/${id}`);
  };

  const formCards = savedForms.map((form) => (
    <Card sx={{ width: 250, height: 250, bgcolor: "#eff" }} key={form.id}>
      <CardHeader title={form.name}></CardHeader>
      <CardContent sx={{ height: 100 }}>
        <div>{form.description}</div>
        <small>Create at: {new Date(form.createdAt).toLocaleString()}</small>
        {form.modifiedAt && (
          <>
            <br />
            <small>
              Modified at: {new Date(form.modifiedAt).toLocaleString()}
            </small>
          </>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          size="small"
          onClick={() => navigateToDesign(form.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          size="small"
          onClick={() => openDeleteDialog(form.id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          size="small"
          onClick={() => navigateToRenderer(form.id)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          size="small"
          onClick={() => exportJson(form)}
        >
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <div className="adena-designs">
      {formCards.length === 0 && (
        <h1>
          Come On! You have not implemented any form yet! Please try new design.
          <br />
          ******
          <b>
            Make Sure that all tabs and containers and fields have a unique name
          </b>
          ******
        </h1>
      )}
      {formCards.length > 0 && <>{formCards}</>}

      <ConfirmationDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        message="Are You Sure?"
        title="Confirm Delete"
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          Schema deleted 😒😒!
        </Alert>
      </Snackbar>
    </div>
  );
}
