import React from "react";
import TextField from "@mui/material/TextField";

export default function DesignerTextField({config}) {
    return (
        <TextField id={config.id} label={config.data.label} variant="outlined" />
    )
}