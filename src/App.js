import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import DetailCoin from './component/detailCoinComponent/detailCoin';
import DetailPage from './page/detailPage/detailPage';
import HomePage from "./page/homePage/Home";
import LoginPage from './page/login/loginPage';
import SignUpPage from './page/SignUpPage/Sign-up';
import WalletPage from './page/walletPage/wallet';
// import WalletAccount from './component/walletComponent/walletAccount';
import VerifyPage from './page/verifyPage/verify';
//notification
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ProtectedRoute from './protectedRoute';
import NotFound from './comon/404NotFound/notFound';

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <Router>
        <Switch>
          <ProtectedRoute component={HomePage} path="/home" exact />
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/detail-coin/:id" exact>
            <DetailPage />
          </Route>
          <Route path="/wallet-page" exact>
            <WalletPage />
          </Route>
          <Route path="/login-page" exact>
            <LoginPage />
          </Route>
          <Route path="/sign-up" exact>
            <SignUpPage />
          </Route>
          <Route path="/verify-page" exact>
            <VerifyPage />
          </Route>
          <Route path="*" exact>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
