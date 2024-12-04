  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

  import { getAuth,createUserWithEmailAndPassword ,
    signInWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

  import { getFirestore, collection,addDoc, serverTimestamp, query, orderBy, getDocs,doc,getDoc
    ,updateDoc
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBlxXaSSUZcXxDPI2HVUEYaZd9YdPlrz3k",
    authDomain: "hacktonfire.firebaseapp.com",
    projectId: "hacktonfire",
    storageBucket: "hacktonfire.firebasestorage.app",
    messagingSenderId: "16469147241",
    appId: "1:16469147241:web:b3eb9707600a4374cd6cf8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  export{ getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,db,collection,updateDoc,
    addDoc, serverTimestamp, query, orderBy, getDocs,doc,getDoc
   }
