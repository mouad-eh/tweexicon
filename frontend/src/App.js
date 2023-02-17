import './App.css';
import AuthHeader from './components/AuthHeader';
import OptionsBar from './components/OptionsBar';
import PostsGrid from './components/PostsGrid';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PageNavigation from './components/PageNavigation';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      {/* <SignInPage></SignInPage> */}
      {/* <SignUpPage></SignUpPage> */}
      {/* <AuthHeader></AuthHeader>
      <OptionsBar></OptionsBar>
      <PostsGrid></PostsGrid>
      <PageNavigation></PageNavigation> */}
      <MainPage></MainPage>
    </>
  );
}

export default App;
