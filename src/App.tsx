import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Brands from "./pages/Brands";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Cart from "./pages/Cart";

import "./app.scss";
import { useAppDispatch, useAppSelector } from "./redux/hooks/redux";
import { checkAuth, Status } from "./redux/reducers/AccountSlice";
import Loading from "./components/common/Loading";
import { RootState } from "./redux/store";
import AdminPanel from "./components/Admin/AdminPanel";
import FeedBack from "./pages/FeedBack";
import WhereBuy from "./pages/WhereBuy";

function App() {
  const dispatch = useAppDispatch();
  // const state = useAppSelector(state=>state.userReducer);
  const location = useLocation();
  const [login, setLogin] = useState<boolean>(true);
  const status = useAppSelector((state) => state.account.status);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  if (status === Status.LOADING) return <Loading />;

  return (
    <>
      {location.pathname.startsWith("/admin") ? null : (
        <Header login={login} setLogin={setLogin} />
      )}
      <div className="content">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main />}></Route>

          <Route
            path="/admin/*"
            element={
              <RequireAuth redirectTo="/profile">
                <AdminPanel />
              </RequireAuth>
            }
          />
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/brands" element={<Brands />}></Route>
          <Route path="/shops" element={<WhereBuy />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/feedback" element={<FeedBack />}></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth redirectTo="/">
                <Profile />
              </RequireAuth>
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      {location.pathname.startsWith("/admin") ? "" : <Footer />}
    </>
  );
}
function RequireAuth({ children, redirectTo }: any) {
  const isAuth = useAppSelector((state: RootState) => state.account.isAuth);
  console.log("isAuth", isAuth);
  return isAuth ? children : <Navigate to={redirectTo} />;
}

function RequireNotAuth({ children, redirectTo }: any) {
  const isAuth = useAppSelector((state: RootState) => state.account.isAuth);
  console.log("isAuth", isAuth);
  return !isAuth ? children : <Navigate to={redirectTo} />;
}

export default App;
