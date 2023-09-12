import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDVshRD7S1GVIr-v4uDRVlQDvHfUmVM2Ho",
    authDomain: "hospital-service-88b77.firebaseapp.com",
    projectId: "hospital-service-88b77",
    storageBucket: "hospital-service-88b77.appspot.com",
    messagingSenderId: "786929217946",
    appId: "1:786929217946:web:df660effef05a6d8464a23"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage =getStorage(app);