import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
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

class App extends Component {
    render() {
        return (
            <Router>
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
                                    to="/"
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
                            <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>
                                Login
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route exact path='/' element={< Home/>}></Route>
                        <Route exact path='/pricing' element={< Pricing/>}></Route>
                        <Route exact path='/gallery' element={< Gallery/>}></Route>
                    </Routes>

                    <Copyright />
                </div>
            </Router>
        );
    }
}

export default App;
