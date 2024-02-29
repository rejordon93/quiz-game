import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
// additional components //
import { NavBar } from './components/NavBar.tsx';
import { AppRoutes } from './components/Routes.tsx';
// Context //
import { UserContext } from './context/UserContext.tsx';
import { CategoryContext } from './context/CategoryContext.tsx';
// User api //
import UserApi from './api.ts';
import useLocalStorage from './hooks/UseLocalStorage.tsx';
// socketio //
import { clientSocketInstance } from './socketio-frontend.ts';
// styles //
import { Container, AppRoutesWrapper } from './styles/app.styles.ts';
// types //
import type { AuthorizationPromise, LoginForm, RegistrationForm } from './types/form.ts';
import type { DecodedUser, UserData } from './types/user.ts';

export const App: React.FunctionComponent = (): JSX.Element => {

  const [currentUser, setCurrentUser] = useState(null);

  //automatically adds a new token/ delete a token
  const [token, setToken] = useLocalStorage("token");
  const [catCode, setCode] = useState(9);

  /**  Load user info from API. Until a user is logged in and they have a token,
  * this should not run. It only needs to re-run when a user logs out(deletes token), so
  * the value of the token is a dependency for this effect.
  */
  useEffect(() => {
    async function getCurrentUser(): Promise<void> {
      if (token) {
        try {
          const user: DecodedUser = decodeToken(token)
          // put the token on the Api class so it can use it to call the API.
          UserApi.token = token;
          // finds current user info by username from token
          let currUser = await UserApi.getCurrentUser(user.username);
          setCurrentUser(currUser);   
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   */
  async function register(signupData: RegistrationForm): Promise<AuthorizationPromise> {
    try {
      // implement registration here //
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.*/
  async function login(loginData: LoginForm): Promise<AuthorizationPromise> {
    try {
      // implement login here //
      return { success: false };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide logout
  async function logout(): Promise<void> {
    setCurrentUser(null);
    setToken(null);
  }
  
  /** App returns Navbar and all Routes wrapped in
   * Context Providers to have it's values accessible
   * throughout the app
   */
  return (
    <Container>
      <UserContext.Provider value={{ currentUser }}>
        <CategoryContext.Provider value={{ catCode, setCode }}>
          <NavBar logout = { logout } />
          <AppRoutesWrapper>
            <AppRoutes 
              login={ login } 
              register={ register } 
              setMultiNavShow={ null } // will need to get implemented //
              multiNavShow={ null }    // will need to get implemented //
            /> 
          </AppRoutesWrapper>
        </CategoryContext.Provider>
      </UserContext.Provider>
    </Container>
  );
}

export default App