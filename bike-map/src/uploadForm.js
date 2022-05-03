import { useState, useRef } from "react";
import { firebaseDb, firebaseApp } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getStorage } from "firebase/storage";

function UploadForm() {
  const [formInputs, setFormInputs] = useState({
    timestamp: 0,
    lat: 0,
    lng: 0,
    isInterview: true,
  });

  const fileInputRef = useRef();

  function addToDb(event) {
    event.preventDefault();
    const lat = parseFloat(formInputs.lat);
    const lng = parseFloat(formInputs.lng);
    const timestamp = formInputs.timestamp;
    const isInterview = formInputs.isInterview;
    if (!lat || !lng || !timestamp) {
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
    const storageRef = ref(storage, timestamp);

    // Todo: Is there a way to link uploaded files to documents? Reference types?
    uploadBytes(storageRef, file).then((snapshot) => {
      const docRef = addDoc(collection(firebaseDb, "interviews"), {
        timestamp,
        is_interview: isInterview,
        interview: snapshot.ref.fullPath,
        location: { latitude: lat, longitude: lng },
      })
        .then(() => {
          setFormInputs({
            timestamp: 0,
            lat: 0,
            lng: 0,
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
      <label>Latitude: </label>
      <input
        type="string"
        name="lat"
        value={formInputs.lat}
        onChange={onChangeInput}
      ></input>
      <label>Longitude: </label>
      <input
        type="string"
        name="lng"
        value={formInputs.lng}
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
