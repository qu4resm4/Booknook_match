import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDJuUQBwGidl1kFNMiDguNO6SH44ibbok4",
    authDomain: "booknook-3a6ff.firebaseapp.com",
    projectId: "booknook-3a6ff",
    storageBucket: "booknook-3a6ff.firebasestorage.app",
    messagingSenderId: "638720428691",
    appId: "1:638720428691:web:1dea6520f8d939e0a11b66",
    measurementId: "G-N3JJJ5J4BE"
  },
  API_ENDPOINT: 'http://127.0.0.1:5000'
};

const firebaseApp= initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(firebaseApp);