// Imports
// ========================================================
import { useContext } from "react";
import { WebAuthContext } from "../../providers/WebAuth";

// Main Hook
// ========================================================
const useWebAuth = () => {
  const context = useContext(WebAuthContext);
  if (!context) {
    throw new Error(
      `Components using WebAuthContext must be rendered within the WebAuthProvider`
    );
  }
  return context;
};

// Exports
// ========================================================
export default useWebAuth;