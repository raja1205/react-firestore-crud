import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCzZKemybvqIW9Z2wAVJbsbNRAygHr-U_0",
  authDomain: "auth-demo-4a234.firebaseapp.com",
  projectId: "auth-demo-4a234",
  storageBucket: "auth-demo-4a234.appspot.com",
  messagingSenderId: "145375543988",
  appId: "1:145375543988:web:7ae7213e46fce426e54de1",
};

firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;
