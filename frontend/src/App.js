import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import AuthProtected from './components/AuthProtected';
import {
  SIGNIN_PATH, SIGNUP_PATH, HOME_PATH, queryClient,
} from './utils/constants';
import AlreadyLoggedIn from './components/AlreadyLoggedIn';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={(
            <AlreadyLoggedIn>
              <LandingPage />
            </AlreadyLoggedIn>
          )}
        />
        <Route
          path={SIGNIN_PATH}
          element={(
            <AlreadyLoggedIn>
              <SignInPage />
            </AlreadyLoggedIn>
          )}
        />
        <Route
          path={SIGNUP_PATH}
          element={(
            <AlreadyLoggedIn>
              <SignUpPage />
            </AlreadyLoggedIn>
          )}
        />
        <Route
          path={HOME_PATH}
          element={
            // AuthProtected is wrapped with an ErrorBoundary to handle token expiration error
            (
              <ErrorBoundary>
                <AuthProtected>
                  <MainPage />
                </AuthProtected>
              </ErrorBoundary>
            )
          }
        />
      </Routes>
      {/* <ReactQueryDevtools></ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
