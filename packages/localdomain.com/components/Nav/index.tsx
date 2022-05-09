// Imports
// ========================================================
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import useWebAuth from "../../hooks/useWebAuth";
import jwtDecode from 'jwt-decode';

// Main Page
// ========================================================
const Nav = () => {
  // State / Props
  const router = useRouter();
  const [title, setTitle] = useState('');
  const { auth0, state } = useWebAuth();

  // Functions
  const onClickSignInUp = () => {
    if (typeof window !== undefined)
      // NOTE: Need to explicitly set `redirectUri` and `state`
      auth0?.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI_AUTHORIZE}`,
        state: `${window.location.host}${window.location.pathname}`,
      });
  }

  const onClickSignOut = () => {
    auth0?.logout({
      returnTo: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI_AUTHORIZE}/logout?state=${window.location.host}${window.location.pathname}`
    });
  };

  // Hooks
  useEffect(() => {
    if (typeof window === undefined) return;
    setTitle(window?.location?.host);
  }, [router.pathname])

  // Render / UI
  return <nav className="border-b bg-slate-800 py-6 px-4">
    <div className="flex justify-between">
      <h1 className="text-2xl font-medium text-slate-100 flex items-center">
        <Link href="/">
          <a href="/">
            {title} <span className="text-lg font-normal text-slate-400">| nextjs + auth0.js</span>
          </a>
        </Link>
      </h1>
      <ul className="flex">
        <li className="mx-2 flex items-center">
          <Link href="/">
            <a className="text-slate-300 hover:text-slate-50" href="/">
              Home
            </a>
          </Link>
        </li>
        <li className="mx-2 flex items-center">
          <Link href="/about">
            <a className="text-slate-300 hover:text-slate-50" href="/about">
              About
            </a>
          </Link>
        </li>
        <li className="mx-2">
          {state?.idToken
            ? <button onClick={onClickSignOut} className="bg-slate-600 text-white h-12 px-8 rounded-full">Sign Out: {(jwtDecode(state.idToken) as any)?.nickname}</button>
            : <button onClick={onClickSignInUp} className="bg-slate-600 text-white h-12 px-8 rounded-full">Sign In/Up</button>}</li>
      </ul>
    </div>
  </nav>
};

// Exports
// ========================================================
export default Nav;