import { Route, Routes, useLocation } from "react-router-dom";
import {useContext, useEffect, useReducer, useState} from "react";

import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Registr from "./pages/Auth/Registration";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Brands from "./pages/Brands";
import Contacts from "./pages/Contacts";
import Login from "./pages/Auth/Login";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Cart from "./pages/Cart";

import "./scss/app.scss";
import {useAppDispatch, useAppSelector} from "./redux/hooks/redux";
import {checkAuth, Status} from "./redux/reducers/AccountSlice";
import {accountSlice} from "./redux/reducers/CartSlice";
import Loading from "./components/Loading";


function App() {
  const isAuth = useAppSelector((state)=> state.account.isAuth )
  const isLoading = useAppSelector((state)=> state.account.isLoading )

  const dispatch = useAppDispatch()
  // const state = useAppSelector(state=>state.userReducer);
  const location = useLocation();
  const [login, setLogin] =useState<boolean>(true);
  const status = useAppSelector((state)=>state.account.status)
  useEffect(() => {
    console.log("checkAuth UseEffect")
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  if (status === Status.LOADING) return <Loading />;

    if (!isAuth){
      console.log("isAuth-false ",isAuth);
      return <Login setLogin={setLogin} login={login}/>
    }
  else {
    console.log("isAuth ",isAuth);
    return (
      <>

        {isAuth ? <Header /> : ""}
        <div className="content">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Main />}></Route>
            <Route
              path="/login"
              element={<Login setLogin={setLogin} login={login} />}
            ></Route>
            <Route path="/registration" element={<Registr />}></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/brands" element={<Brands />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
        {login ? <Footer /> : ""}
      </>
    );
  }
}

export default App;
