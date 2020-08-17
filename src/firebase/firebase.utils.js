import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMeYbSnSX6eGl2C8RCi4roaETChiAT4cU",
    authDomain: "blaze-db.firebaseapp.com",
    databaseURL: "https://blaze-db.firebaseio.com",
    projectId: "blaze-db",
    storageBucket: "blaze-db.appspot.com",
    messagingSenderId: "970574285504",
    appId: "1:970574285504:web:c161dea40a2a68c0c27b25",
    measurementId: "G-KX3DWKW118"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;