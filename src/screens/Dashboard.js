import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClassCard from "../components/ClassCard";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      await db
        .collection("users")
        .where("uid", "==", user.uid)
        .onSnapshot((snapshot) => {
          setClasses(snapshot?.docs[0]?.data()?.enrolledClassrooms);
        });
      // 👇🏻 below code doesn't update realtime, so updated to snapshot listener
      // const userData = querySnapshot.docs[0].data();
      // setClasses(userData.enrolledClassrooms);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading) return;
    fetchClasses();
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        {classes.length === 0 ? (
          <div className="dashboard__404">
            No classes found! Join or create one!
          </div>
        ) : (
          <div className="dashboard__classContainer">
            {classes.map((individualClass) => (
              <ClassCard
                key={individualClass.id}
                creatorName={individualClass.creatorName}
                creatorPhoto={individualClass.creatorPhoto}
                name={individualClass.name}
                id={individualClass.id}
                style={{ marginRight: 30, marginBottom: 30 }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
