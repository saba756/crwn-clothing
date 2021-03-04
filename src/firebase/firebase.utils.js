import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
        apiKey: "AIzaSyDilVXaM_ZfzFjyQFjvjaHjSR6skxbxHYY",
        authDomain: "crwn-db-1a129.firebaseapp.com",
        databaseURL: "https://crwn-db-1a129.firebaseio.com",
        projectId: "crwn-db-1a129",
        storageBucket: "crwn-db-1a129.appspot.com",
        messagingSenderId: "901648454484",
        appId: "1:901648454484:web:ceec8275c57ad5d3b3aec1",
        measurementId: "G-SXY9H11TTF"
      };
        export const createUserProfileDocument = async (userAuth, additionalData) => {
          if(!userAuth) return
          const userRef = firebase.doc(`users/${userAuth.uid}`)
          const snapshot = await  userRef.get();
          if(!snapshot.exists) {
            const {displayName , email} = userAuth;
            const createdAt = new Date()
            try{
                await userRef.set({
                  displayName, 
                  email,
                createdAt,
              ...additionalData})
            }catch(error){
                console.log("error creating user",error.message)
            }
          }
        }
      firebase.initializeApp(config);
      
      
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;