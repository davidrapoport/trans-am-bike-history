import "./App.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BikeMap from "./bikeMap";

import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseDb, firebaseAuth } from "./firebase";

function App() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const storage = getStorage();

    // Why is this query returning dupes?
    getDocs(collection(firebaseDb, "interviews")).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        const metadata = doc.data();
        if (!metadata.interview) {
          return;
        }
        getDownloadURL(ref(storage, metadata.interview)).then((url) => {
          setInterviews((prevInterviews) => [
            {
              interviewURL: url,
              location: metadata.location,
              isInterview: metadata.isInterview,
              timestamp: metadata.timestamp,
            },
            ...prevInterviews,
          ]);
        });
      })
    );
  }, []);
  const currentUser = firebaseAuth.currentUser;
  return (
    <div className="App">
      {currentUser ? (
        <Link to="/uploadForm">Upload Form</Link>
      ) : (
        <Link to="/adminLogin">Admin Login</Link>
      )}
      <BikeMap interviews={interviews} />
    </div>
  );
}

export default App;
