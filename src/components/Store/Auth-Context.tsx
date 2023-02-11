import React from "react";

const AuthContext = React.createContext<{isLoggedIn: boolean}>({
    isLoggedIn: false
});

export default AuthContext;