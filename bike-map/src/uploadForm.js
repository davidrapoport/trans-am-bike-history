import { useState, useRef } from "react";
import { firebaseDb, firebaseApp } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getStorage } from "firebase/storage";

function getGeocodeUrl(city, state, country) {
  return (
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&city=" +
    encodeURIComponent(city) +
    "&state=" +
    encodeURIComponent(state) +
    "&country=" +
    encodeURIComponent(country)
  );
}

function UploadForm() {
  const [formInputs, setFormInputs] = useState({
    timestamp: Date.now(),
    city: "",
    state: "",
    country: "usa",
    isInterview: true,
  });

  const fileInputRef = useRef();

  function addToDb(event) {
    event.preventDefault();
    const city = formInputs.city;
    const state = formInputs.state;
    const country = formInputs.country;
    const timestamp = formInputs.timestamp;
    const isInterview = formInputs.isInterview;
    if (!city || !state || !country || !timestamp) {
      alert("You forgot one of the fields you dumb fuck");
      return;
    }
    if (fileInputRef.current.files.length !== 1) {
      alert("You forgot the file you rat bastard!!");
      return;
    }
    const file = fileInputRef.current.files[0];

    const storage = getStorage(firebaseApp);
    const fileName = timestamp + "_uploaded_" + Date.now().toString();
    const storageRef = ref(storage, fileName);

    // Todo: Is there a way to link uploaded files to documents? Reference types?
    Promise.all([
      uploadBytes(storageRef, file),
      fetch(getGeocodeUrl(city, state, country)),
    ])
      .then(([snapshot, locationResponse]) => {
        return Promise.all([snapshot, locationResponse.json()]);
      })
      .then(([snapshot, location]) => {
        const docRef = addDoc(collection(firebaseDb, "interviews"), {
          timestamp,
          is_interview: isInterview,
          interview: snapshot.ref.fullPath,
          location: location[0],
        })
          .then(() => {
            setFormInputs({
              timestamp: 0,
              city: "",
              state: "",
              country: "usa",
              isInterview: true,
            });
            alert("Uploaded doc ", docRef);
          })
          .catch((e) => console.error("Error adding document: ", e));
      });
  }

  function onChangeInput(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    let formInputsCopy = Object.assign({}, formInputs);
    formInputsCopy[event.target.name] = value;
    setFormInputs(formInputsCopy);
  }

  return (
    <form onSubmit={addToDb}>
      <label>File: </label>
      <input type="file" name="file" ref={fileInputRef}></input>
      <br />
      <label>Timestamp: </label>
      <input
        type="datetime-local"
        name="timestamp"
        value={formInputs.timestamp}
        onChange={onChangeInput}
      ></input>
      <br />
      <label>City: </label>
      <input
        type="string"
        name="city"
        value={formInputs.city}
        onChange={onChangeInput}
      ></input>
      <label>State: </label>
      <input
        type="string"
        name="state"
        value={formInputs.state}
        onChange={onChangeInput}
      ></input>
      <label>Country: </label>
      <input
        type="string"
        name="country"
        value={formInputs.country}
        onChange={onChangeInput}
      ></input>
      <br />
      <label>Is Interview:</label>
      <input
        type="checkbox"
        name="isInterview"
        checked={formInputs.isInterview === true}
        onChange={onChangeInput}
      ></input>
      <br />
      <button>Submit</button>
    </form>
  );
}

export default UploadForm;
