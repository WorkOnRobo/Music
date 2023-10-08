import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBQE55rhha4pNPjZ90axSNugr77LIBGH_s",
    authDomain: "music-b176c.firebaseapp.com",
    projectId: "music-b176c",
    storageBucket: "music-b176c.appspot.com",
    appId: "1:270352463675:web:d1ddf66cdc88f5e3f5a91e"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


const usersCollection= db.collection('users');
const songsCollection= db.collection('songs');
const commentsCollection= db.collection('comments');

export {
auth,
db,
usersCollection,
songsCollection,
commentsCollection,
storage,
}
 