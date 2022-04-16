import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  currentUser: null,
  canRead: null,
  canWrite: null,
  updateAuthData: () => {},
});

export default AuthContext;
