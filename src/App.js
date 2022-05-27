import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./component/home/Home";
import Pricing from "./component/pricing/pricing";
import Copyright from "./Copyright";
import Gallery from "./component/gallery/galary";
import SignIn from "./component/sign-in/SignIn";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
                <CssBaseline/>
                <div className="App">
                    <AppBar
                        position="static"
                        color="primary"
                        elevation={0}
                        sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
                    >
                        <Toolbar sx={{flexWrap: 'wrap'}}>
                            <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                                Furkan Arslan
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
                    <Routes>
                        <Route exact path='/' element={< SignIn/>}></Route>
                        <Route exact path='/pricing' element={< Pricing/>}></Route>
                        <Route exact path='/gallery' element={< Gallery/>}></Route>
                        <Route exact path='/home' element={< Home/>}></Route>
                    </Routes>

                    <Copyright />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
