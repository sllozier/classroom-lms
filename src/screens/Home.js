import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import Navbar from "../components/Navbar";

function Home() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [navigate, loading, user]);

  return (
    <div className="home">
      <div className="home__container">
        <img src="" alt="Google Classroom" className="home__image" />
        <button className="home__login" onClick={signInWithGoogle}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
