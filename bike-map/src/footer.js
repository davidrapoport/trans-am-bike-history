import { firebaseAuth } from "./firebase";
import { Link } from "react-router-dom";

function Footer() {
  const currentUser = firebaseAuth.currentUser;
  const link = currentUser ? (
    <Link to="/uploadForm">Upload Form</Link>
  ) : (
    <Link to="/adminLogin">Admin Login</Link>
  );
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="about">
          <h3>About the trip</h3>
          <p>
            Last summer I was biking along the Trans Am trail and I stopped for
            a night in Elkhorn City, KY where the mayor, Mike Taylor, very
            kindly let me spend the night in City Hall to avoid the rain and the
            heat (and to sit in on a very enthusiastic city council meeting). In
            the morning I ran off to grab some breakfast at the{" "}
            <a href="https://goo.gl/maps/aAkR6HxFzMeMB5YcA">RFG cafe</a>*. The
            lady who ran the shop had a map up on the wall with pins marking
            where all her visitors were from. There was one pin up from{" "}
            <a href="https://en.wikipedia.org/wiki/Sweden">Sweden</a>* and she
            told me that that came from a 60ish year old guy who had biked the
            trail about 40 years back. She said that he went on and on about how
            all the towns along the way had changed, how the country had
            changed.
          </p>{" "}
          <p>
            I got the idea then that I wanted to make a time capsule of the
            trail, and then to bike again in 30 years (assuming skiing doesn't
            <a href="https://www.youtube.com/watch?v=6SaLA1CyQk8">
              ruin my knees
            </a>
            * by then). A reroute is taking me up north, to the{" "}
            <a href="https://www.adventurecycling.org/routes-and-maps/adventure-cycling-route-network/northern-tier/">
              Northern Tier of the Trans Am
            </a>
            * instead, but the idea is the same. I wanna go around, ask people
            to tell me a story about their homes, and then hopefully come back
            30 years later and see how things have changed.
          </p>
          <p className="footnote">
            *These are affiliate links. It's 2022, gotta monetize this somehow.
          </p>
          <div>
            <p>
              Some of the questions I'd like to ask people (lemme know if you
              think up any good ones)
            </p>
            <ul>
              <li>What was it like growing up here?</li>
              <li> How has life changed in the past 30 years?</li>
              <li>
                What do you hope the world/your town/state will look like in 30
                years?
              </li>
              <li>Who is your most interesting neighbor? </li>
              <li>
                When did you/your family move here? What brought you/them out
                here?
              </li>
              <li>
                What's your favorite memory of summer/winter/fall/spring?{" "}
              </li>
              <li>Do you see many bikers? Any who stand out?</li>
            </ul>
          </div>
        </div>
        <div className="thanks">
          <h3>With thanks to:</h3>
          <ul>
            <li>Everyone who shared their story</li>
            <li>Leaflet</li>
            <li>React-Leaflet</li>
            <li>
              Priscille for being{" "}
              <a href="https://microstoriefr.weebly.com/storymap.html">
                an inspiration
              </a>
            </li>
          </ul>
        </div>
        <div className="login">
          <h5>
            Are you David? Are you huddled in a McDonald's bathroom leeching
            power and trying to upload a story? Click here. Otherwise, please
            don't.
          </h5>
          {link}
        </div>
      </div>
    </div>
  );
}

export default Footer;
