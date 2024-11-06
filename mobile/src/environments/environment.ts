import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyARQ0VD9TA1KvR0FmHiUVNU3V5SAgn-mKU",
    authDomain: "task-list-ionic.firebaseapp.com",
    projectId: "task-list-ionic",
    storageBucket: "task-list-ionic.appspot.com",
    messagingSenderId: "353852127130",
    appId: "1:353852127130:web:b8c5466d829a4611b8ec23",
    measurementId: "G-XV35B7WKZM"
  },
  API_ENDPOINT: 'http://127.0.0.1:5000'
};

const firebaseApp= initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(firebaseApp);