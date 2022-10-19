import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { baseUrl } from "../components/data";
import { useState } from "react";
const AuthVoterContext = createContext();
export const AuthVoterProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {



        axios.get(`${baseUrl}/voter?email=${user.email}`).then((res) => {
          setCurrentUser(res.data);

        }).catch((err) => {
          console.log(err);
        });
      } else {

      }
    });
    setLoading(false);
    return () => {
      unsub();
    };
  }, []);

  const logout = async () => {

    await signOut(auth);
  };

  return (
    <AuthVoterContext.Provider value={{ logout, currentUser }}>
      {loading ? null : children}
    </AuthVoterContext.Provider>
  );
};

export const useVoter = () => useContext(AuthVoterContext);
