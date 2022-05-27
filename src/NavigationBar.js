import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React from 'react';

export default function NavigationBar(props) {
    if (props.isLoggedIn) {
        return (
            <React.Fragment>
                <AppBar
                    position="static"
                    color="primary"
                    elevation={0}
                    sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
                >
                    <Toolbar sx={{flexWrap: 'wrap'}}>
                        <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                            {props.user.data.displayName}
                        </Typography>
                        <nav>
                            <Link
                                className="nav-link"
                                to="/home"
                            >
                                Home
                            </Link>
                            <Link
                                className="nav-link"
                                to="/pricing"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="nav-link"
                                to="/gallery"
                            >
                                Gallery
                            </Link>
                        </nav>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
