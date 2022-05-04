import "./App.css";

import { useState, useEffect } from "react";

import BikeMap from "./bikeMap";
import Footer from "./footer";
import Header from "./header";

import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseDb } from "./firebase";

function App() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const storage = getStorage();

    // Why is this query returning dupes?
    // TODO: use Promise.all to collect all of the interviews
    // Then sort them before storing inState, maybe dedupe,
    // and set isDataLoaded bool to true.
    getDocs(collection(firebaseDb, "interviews"))
      .then((querySnapshot) =>
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
      )
      .catch((reason) => console.error("Failed to get docs for ", reason));
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="bike-map">
        <BikeMap interviews={interviews} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
