// Imports
// ========================================================
import WebAuthProvider from "./WebAuth";

// Root Provider
// ========================================================
const RootProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <>
    <WebAuthProvider>
      {children}
    </WebAuthProvider>
  </>
};

// Exports
// ========================================================
export default RootProvider;