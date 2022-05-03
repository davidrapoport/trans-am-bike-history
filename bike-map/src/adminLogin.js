import { firebaseAuth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function onSubmitForm(event) {
  event.preventDefault();
  signInWithEmailAndPassword(
    firebaseAuth,
    event.target.email.value,
    event.target.password.value
  )
    .then((userCredential) => {
      alert("Signed in!");
    })
    .catch((error) => {
      alert("Error logging in ", error);
    });
}

function AdminLogin() {
  return (
    <form onSubmit={onSubmitForm}>
      <label>Username: </label>
      <input type="email" name="email"></input>
      <br />
      <label>Password: </label>
      <input type="password" name="password"></input>
      <button>Login</button>
    </form>
  );
}

export default AdminLogin;
