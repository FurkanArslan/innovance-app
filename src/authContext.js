import { createContext } from "react";

const authContext = createContext({
    authenticated: false,
    setAuthenticated: (auth) => {},
    user: null,
    setUser: (user) => {},
});

export default authContext;
