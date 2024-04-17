import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
  
    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      // Update profile
      await updateProfile(res.user, {
        displayName,
      });
  
      // Create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email
      });
  
      // Create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ninjas Chat-App Chat</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="User Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <button disabled={loading}>Sign up</button>
          {loading && "Creating User..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already an Account holder? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );  
};

export default Register;