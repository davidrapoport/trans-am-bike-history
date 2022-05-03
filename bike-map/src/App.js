import "./App.css";

import { useState, useEffect } from "react";

import UploadForm from "./uploadForm";
import BikeMap from "./bikeMap";

import { collection, query, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseDb } from "./firebase";

function App() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const q = query(collection(firebaseDb, "interviews"));

    getDocs(q).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        const metadata = doc.data();
        if (!metadata.interview) {
          return;
        }
        getDownloadURL(ref(storage, metadata.interview))
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const interviewData = xhr.response;
              setInterviews((prevInterviews) => [
                {
                  interview: interviewData,
                  location: metadata.location,
                  isInterview: metadata.isInterview,
                },
                ...prevInterviews,
              ]);
            };
            xhr.open("GET", url);
            xhr.send();
          })
          .catch((error) => {
            // Handle any errors
          });
      })
    );
  }, []);
  console.log(interviews);
  return (
    <div className="App">
      <UploadForm />
      <BikeMap interviews={interviews} />
    </div>
  );
}

export default App;
