import React from "react";
import TextField from "@mui/material/TextField";

export default function DesignerNumberField({config}) {
    return (
        <TextField id={config.id} type="number" label={config.data.label} variant="outlined" />
    )
}