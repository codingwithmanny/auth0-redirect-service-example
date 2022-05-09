// Imports
// ========================================================
import { BrowserRouter } from "react-router-dom";
import WebAuthProvider from "./WebAuth";

// Main Providers
// ========================================================
const RootProviders: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <>
    <BrowserRouter>
      <WebAuthProvider>
        {children}
      </WebAuthProvider>
    </BrowserRouter>
  </>;
};

// Exports
// ========================================================
export default RootProviders;