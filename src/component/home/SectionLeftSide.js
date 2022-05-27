import * as React from 'react';
import Title from './Title';
import Typography from "@mui/material/Typography";

export default function SectionLeftSide() {
    return (
        <React.Fragment>
            <Title>Section Left Side</Title>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Typography>
            <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Typography>
        </React.Fragment>
    );
}
