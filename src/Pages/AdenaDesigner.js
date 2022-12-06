import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../utils/browser-storage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function AdenaDesigner() {
  const [savedForms] = React.useState(() => loadState());

  const formList = savedForms.map((form) => (
    <Link key={form.id} to={`view/${form.id}`}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={form.name} secondary={form.description} />
      </ListItem>
    </Link>
  ));

  const formCards = savedForms.map((form) => (
    <Card sx={{ width: 250, height: 250 }} key={form.id}>
      <CardHeader title={form.name}></CardHeader>
      <CardContent>
        <div>{form.description}</div>
        <div>{new Date(form.createdAt).toLocaleString()}</div>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <div className="adena-designs">
      {formList.length === 0 && (
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
      {formList.length > 0 && <>{formCards}</>}
    </div>
  );
}
