import { useEffect, useState } from "react";
import initialFirebase from "../../Firebase/Firebase.init";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Notification from "../../Components/Notification/Notification";
import getUrl from "../../Utilits/getUrl";
initialFirebase();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [firebaseError, setError] = useState("");
  const [isLoding, setIsLoding] = useState(true);
  const auth = getAuth();

  // saveUser in Database
  const saveUser = (displayName, email) => {
    const createUser = {
      displayName,
      email,
    };
    const url = getUrl("users");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  // email password Register
  const register = (email, password, name, histoty, location) => {
    setIsLoding(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        saveUser(user.displayName, user.email);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
      })
      .catch((error) => {
        setError(error.message);
        // ..
      })
      .finally(() => {
        setIsLoding(false);
        Notification("success", "User Registation Successfully");
        const rediract = location.state?.from || "/";
        histoty.replace(rediract);
      });
  };

  // email && password Login
  const login = (email, password, histoty, location) => {
    setIsLoding(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoding(false);
        Notification("success", "Login Successfully");
        const rediract = location.state?.from || "/";
        histoty.replace(rediract);
      });
  };

  //Update User
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    setIsLoding(false);

    return unsubscriber;
  }, [auth]);

  //LogOut User
  const LogOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };
  return {
    user,
    firebaseError,
    register,
    LogOut,
    isLoding,
    login,
  };
};

export default useFirebase;
