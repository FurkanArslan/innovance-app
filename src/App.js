import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./component/home/Home";
import Pricing from "./component/pricing/pricing";
import Copyright from "./Copyright";
import Gallery from "./component/gallery/galary";
import SignIn from "./component/sign-in/SignIn";
import SignUp from "./component/sign-up/SignUp";

import authContext from "./authContext";
import NavigationBar from "./NavigationBar";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>

            <authContext.Provider value={{authenticated, setAuthenticated, user, setUser}}>
                <div className="App">
                    <NavigationBar isLoggedIn={authenticated} user={user}/>
                    <Routes>
                        <Route exact path='/' element={< SignIn/>}></Route>
                        <Route exact path='/signUp' element={< SignUp/>}></Route>
                        <Route exact path='/pricing' element={< Pricing/>}></Route>
                        <Route exact path='/gallery' element={< Gallery/>}></Route>
                        <Route exact path='/home' element={< Home/>}></Route>
                    </Routes>

                    <Copyright/>
                </div>
            </authContext.Provider>

        </BrowserRouter>
    );
}

export default App;
