import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import AuthProtected from './components/AuthProtected';
import { SIGNIN_PATH, SIGNUP_PATH, HOME_PATH, queryClient } from './utils/constants';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AlreadyLoggedIn from './components/AlreadyLoggedIn';


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={
            <AlreadyLoggedIn>
              <SignInPage />
            </AlreadyLoggedIn>
          } />
          <Route path={SIGNIN_PATH} element={
            <AlreadyLoggedIn>
              <SignInPage />
            </AlreadyLoggedIn>
          } />
          <Route path={SIGNUP_PATH} element={
            <AlreadyLoggedIn>
              <SignUpPage />
            </AlreadyLoggedIn>
          } />
          <Route path={HOME_PATH} element={
            <AuthProtected>
              <MainPage />
            </AuthProtected>
          } />
        </Routes>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

export default App;
