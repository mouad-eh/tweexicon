import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import AuthProtected from './components/AuthProtected';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/mainpage' element={<AuthProtected><MainPage /></AuthProtected>} />
      </Routes>
    </>
  );
}

export default App;
