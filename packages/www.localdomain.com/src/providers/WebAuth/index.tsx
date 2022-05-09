// Imports
// ========================================================
import { WebAuth } from "auth0-js";
import { useState, createContext, useEffect } from "react";
import { WebAuthContextType, WebAuthContextStateType } from "./type";
import FullLoader from "../../components/FullLoader";

// Config
// ========================================================
const auth0 = new WebAuth({
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientID: `${process.env.REACT_APP_AUTH0_DOMAIN_CLIENT_ID}`,
  audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
  scope: `${process.env.REACT_APP_AUTH0_SCOPE}`,
  responseType: `${process.env.REACT_APP_AUTH0_RESPONSE_TYPE}`,
  redirectUri: `${process.env.REACT_APP_AUTH0_REDIRECT_URI_WEBAUTH}`,
  responseMode: `${process.env.REACT_APP_AUTH0_RESPONSE_MODE}`,
});

// Context
// ========================================================
const WebAuthContext = createContext<{
  auth0: WebAuthContextType['auth0'] | null,
  state: WebAuthContextStateType | null
} | null>(null);

// Main Provider
// ========================================================
const WebAuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // States
  const [state, setState] = useState<WebAuthContextStateType>({
    isLoading: true,
    isError: false,
    error: null,
    idToken: ''
  });

  // Hooks
  /**
   * 1 - Create client
   */
  useEffect(() => {
    auth0?.checkSession({}, (error, authResult) => {
      if (error) {
        console.error({ error });
        setState({
          ...state,
          isLoading: false,
          isError: true,
          error
        })
        return;
      }

      console.log({ authResult });
      setState({
        ...state,
        isLoading: false,
        idToken: authResult?.idToken ?? ''
      })
    });
    // eslint-disable-next-line
  }, []);

  // Render / UI
  if (state.isLoading) return <FullLoader />;

  /**
   * 
   */
  return <WebAuthContext.Provider value={{
    auth0,
    state
  }}>
    {children}
  </WebAuthContext.Provider>
};

// Exports
// ========================================================
export default WebAuthProvider;
export {
  WebAuthContext
};