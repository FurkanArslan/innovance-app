import React from 'react';
import Typography from "@mui/material/Typography";

function Copyright () {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            Furkan Arslan {' - '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default Copyright;
