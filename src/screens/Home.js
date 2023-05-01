import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, signInWithGoogle, signInWithEmail } from "../firebase";

function Home() {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [loading, user]);

  const handleSignup = async () => {
    navigate("/sign-up");
  };

  return (
    <div className="home">
      <div className="home__container">
        <img
          src="https://raw.githubusercontent.com/sllozier/classroom-lms/1bc6898419d4a5ba6dd7e7d5ebc25de7373da732/public/piccies/classroom_lms.svg"
          alt="Enter Classroom"
          className="home__image"
        />
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmail(auth, email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/sign-up">Sign Up</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Home;
