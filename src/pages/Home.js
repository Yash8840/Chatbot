import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import "./Home.css";
import ColorContext from "../Context/ColorContext";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AuthContext from "../Context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Messages from "../components/Messages";
import ThemeBox from "../components/ThemeBox";

const Home = () => {
  const [messages, setMessages] = useState([]);

  const [themeOpen, setThemeOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [text, setText] = useState("");
  const colorCtx = useContext(ColorContext);
  const authCtx = useContext(AuthContext);

  const openThemeHandler = () => {
    setThemeOpen((prev) => {
      return !prev;
    });
  };

  const submitInputHandler = async (e) => {

    //on submitting user input, we check if user inputted an image or not. Then we upadte the "chat" collection in fireabase with the user's data and the input text along with the current time.
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", authCtx.currentUser.uid), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: authCtx.currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", authCtx.currentUser.uid), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: authCtx.currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setText("");
    setImg(null);
  };


  // the code inside useEffect helps in getting realtime updates from firestore database
  useEffect(() => {
    if (!db || !authCtx.currentUser || !authCtx.currentUser.uid) {
      console.error("Missing required variables:", { db, authCtx });
      return;
    }

    const unsub = onSnapshot(
      doc(db, "chats", authCtx.currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          // console.log(doc.data());  // Here, we get the messages array from firebase
          doc.exists() && setMessages(doc.data().messages);
        } else {
          console.error("Document does not exist:");
        }
      }
    );

    return () => {
      unsub();
    };
  }, [db, authCtx.currentUser.uid]);

  return (
    <>
      <div
        className="home"
        style={{
          background: `linear-gradient(239.26deg, ${colorCtx.currentColor.mainColor} 63.17%, ${colorCtx.currentColor.gradient} 94.92%)`,
        }}>
        <div className="theme-change">
          <button onClick={openThemeHandler}>Change Theme</button>
          <button
            onClick={() => {
              signOut(auth);
            }}>
            Log out
          </button>
          {themeOpen && <ThemeBox toggleThemeBar={openThemeHandler} />}
        </div>

        <div className="chatSection">
          <div className="chatContainer">
            <Messages messages={messages} />
          </div>
          <form className="chatInput" onSubmit={submitInputHandler}>
            <input
              className="inputMessage"
              name="message"
              type="text"
              placeholder="type your message here..."
              onChange={(e) => setText(e.target.value)}
              value={text}></input>

            <div>
              <input
                type="file"
                name=""
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="file">
                <AttachFileIcon />
              </label>
            </div>
            <div
              onClick={submitInputHandler}
              style={{ cursor: "pointer", marginLeft: "3px" }}>
              <SendIcon />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
