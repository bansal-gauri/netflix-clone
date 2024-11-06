import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { addDoc,
    collection, 
    getFirestore } from "firebase/firestore"; 
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBwVLoRoUvWogdeMWqX_ODBDAAKlJgIoaU",
  authDomain: "netflix-clone-64630.firebaseapp.com",
  projectId: "netflix-clone-64630",
  storageBucket: "netflix-clone-64630.firebasestorage.app",
  messagingSenderId: "350342674753",
  appId: "1:350342674753:web:9c3114f64669fab3f709c0",
  measurementId: "G-BJD6VKLB3G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};