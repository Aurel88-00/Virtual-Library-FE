import { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignupPage } from './components/pages/SignUp.page';
import { LoginPage } from './components/pages/Login.page';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { AuthPage } from './components/pages/Auth.page';
import PrivateRoute from './components/common/PrivateRoute';
import { HomePage } from './components/pages/Home.page';

function App() {

  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/auth/login"} />} />
      <Fragment>
        <Route path='/home' element={<PrivateRoute element={<HomePage />} />} />
      </Fragment>
      <Route path='/auth' element={<AuthPage />} >
        <Route path='/auth/signup' element={<SignupPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
