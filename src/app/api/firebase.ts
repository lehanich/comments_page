
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDoc, doc } from 'firebase/firestore'; 
import { getDocs, collection } from 'firebase/firestore';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

export class FireBaseApp {
  static instance: FireBaseApp;
  public app: any;
  public db: any;
  public fs: any;
  public analytics: any;

  constructor() {
    if (!FireBaseApp.instance) {
      const firebaseConfig = {
        apiKey: "AIzaSyDriSVG1tQ0pe82j7zVElcN5UCxtvlWQH8",
        authDomain: "comments-app-46098.firebaseapp.com",
        databaseURL: "https://comments-app-46098-default-rtdb.firebaseio.com",
        projectId: "comments-app-46098",
        storageBucket: "comments-app-46098.appspot.com",
        messagingSenderId: "1051131925936",
        appId: "1:1051131925936:web:1128881cb506ff841a3275",
        measurementId: "G-VBYSE3F3W8"
      };
          
      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(this.app);
      this.fs = getFirestore(this.app);
      // this.db = getDatabase(this.app);

      FireBaseApp.instance = this;
    }
    return FireBaseApp.instance;
  }

  // getData() {
  //     return this.data;
  // }

  // updateData(newData) {
  //     this.data = newData;
  // }


  public createUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(FireBaseApp.instance.app), email, password);
  }

  public signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(FireBaseApp.instance.app), email, password);
  }

  public addComment = async (text: string, path: string) => {
    // FireBaseApp.instance.app.collection("comments").add({
    //   text,
    //   userID: 123
    // })
    // .then((docRef: any) => {
    //     console.log("Документ успешно добавлен с ID: ", docRef.id);
    // })
    // .catch((error: any) => {
    //     console.error("Ошибка добавления документа: ", error);
    // });

    const newClient = {
      text,
      userID: 123,
      date: "",
      answers: [""]
    }
    
    // try {
    //   FireBaseApp.instance.app.ref('comments').push(newClient)
    //            console.log(newClient)
    //        } catch (error) {
    //            console.log(error.message)
    //            throw error
    //        }
    const db = getDatabase();
    // set(ref(db, 'comments'), newClient);
    const postListRef = ref(db, path);
    const newPostRef = push(postListRef);
    set(newPostRef, newClient);
       
  }

  // public listComments = async () => {
  //   FireBaseApp.instance.app.collection("comments").get().then((querySnapshot: any) => {
  //     querySnapshot.forEach((doc:any) => {
  //         console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   });
  // }

  public listComments = async() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'comments');
    onValue(starCountRef, (snapshot: any) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      console.log(data);
    });
    // const collectionRef = collection(FireBaseApp.instance.db, 'comments');
    // const querySnapshot = await getDocs(collectionRef);
    // console.log("!!!", querySnapshot)
    // querySnapshot.forEach((doc) => { console.log(doc, doc.id, '=>', doc.data()); }); 
  }
}

// const db = "";
// import { getDoc, doc } from 'firebase/firestore'; 
// async function getDocument(documentId: any) {
//   const documentRef = doc(db, 'collection_name', documentId);
//   const documentSnapshot = await getDoc(documentRef);
//   if (documentSnapshot.exists()) {
//     console.log('Document data:', documentSnapshot.data()); }
//     else { console.log('No such document'); 

//     } 
//   }

// import { getDocs, collection } from 'firebase/firestore';

// export const getAllDocuments = async() => {
//   const collectionRef = collection(db, 'comments');
//   const querySnapshot = await getDocs(collectionRef);
//   console.log("!!!", querySnapshot)
//   querySnapshot.forEach((doc) => { console.log(doc, doc.id, '=>', doc.data()); }); 
// }