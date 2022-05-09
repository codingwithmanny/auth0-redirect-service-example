// Imports
// ========================================================
import { WebAuth, Auth0Error } from "auth0-js";

// Types
// ========================================================
/**
 *
 */
export interface WebAuthContextType {
  auth0?: WebAuth;
}

/**
 *
 */
export interface WebAuthContextStateType {
  isLoading: boolean;
  isError: boolean;
  error: Auth0Error | null;
  idToken: string;
}
