import React, { useEffect, useState } from 'react'
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
import LoadingProgress from './comon/reactLoadingProgress/loadingProgress';
import Profile from './component/profileComponent/profile';
import ProfilePage from './page/profilePage/profilePage';

function App() {
  const [state, setstate] = useState(false)
  useEffect(() => {
    setstate(true)
    setTimeout(() => {
      setstate(false)
    }, 1000);
  }, [])

  const routes = [
    {
      path: "/",
      component: HomePage
    },
    {
      path: "/detail-coin/:id",
      component: DetailPage

    }
    ,
    {
      path: "/wallet-page",
      component: WalletPage

    }
    ,
    {
      path: "/login-page",
      component: LoginPage

    }
    ,
    {
      path: "/sign-up",
      component: SignUpPage

    },
    {
      path: "/verify-page",
      component: VerifyPage

    },
    {
      path: "/author-profile-page",
      component: ProfilePage

    },
    {
      path: "*",
      component: NotFound

    }

  ];
  return (
    <div className="App">
      <NotificationContainer />
      <Router>
        <Switch>
          {routes.map((route, i) => (

            <Route component={state ? LoadingProgress : route.component} path={route.path} exact />
          ))}
          {/* {/* <ProtectedRoute component={HomePage} path="/home" exact /> */}

        </Switch>
      </Router>
    </div>
  );
}

export default App;
