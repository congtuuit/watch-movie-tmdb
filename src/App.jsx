import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import Protected from "./components/Common/Protected";
import Bookmarked from "./pages/Bookmarked";
import Error from "./pages/Error";
import History from "./pages/History";
import Profile from "./pages/Profile";
import { auth, db } from "./shared/firebase";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setCurrentUser } from "./store/slice/authSlice";
import { routes } from "./config/routes.config";
import LinearProgress from "@mui/material/LinearProgress";
import { processSelector } from "./store/slice/processSlice";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(processSelector);

  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("isSignedIn") ? true : false);

  useEffect(() => {
    let unSubDoc;
    const unSubAuth = () =>
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          dispatch(setCurrentUser(null));
          setIsSignedIn(false);
          localStorage.setItem("isSignedIn", "0");
          return;
        }

        setIsSignedIn(true);
        localStorage.setItem("isSignedIn", "1");

        if (user.providerData[0].providerId === "google.com") {
          unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
            dispatch(
              setCurrentUser({
                displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: doc.data()?.photoUrl || "",
                uid: user.uid,
              })
            );
          });
        } else if (user.providerData[0].providerId === "facebook.com") {
          unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
            dispatch(
              setCurrentUser({
                displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: doc.data()?.photoUrl || "",
                // user.photoURL + "?access_token=" + doc.data()?.token || "",
                // doc.data()?.photoUrl.startsWith("https://i.ibb.co") ?
                uid: user.uid,
              })
            );
          });
        } else {
          unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
            dispatch(
              setCurrentUser({
                displayName: doc.data()?.lastName + " " + doc.data()?.firstName || "",
                photoURL: doc.data()?.photoUrl || "",
                email: user.email,
                emailVerified: user.emailVerified,
                uid: user.uid,
              })
            );
          });
        }
      });

    return () => {
      if (unSubAuth) {
        unSubAuth();
      }
      if (unSubDoc) {
        unSubDoc();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <div className={`loading-container ${isLoading ? "d-block" : "d-none"}`}>
        <LinearProgress />
      </div>
      <Routes location={location}>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route
          path="bookmarked"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Bookmarked />
            </Protected>
          }
        />
        <Route
          path="history"
          element={
            <Protected isSignedIn={isSignedIn}>
              <History />
            </Protected>
          }
        />
        <Route
          path="profile"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Profile />
            </Protected>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
