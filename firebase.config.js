import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4n5Ld6Rx_g9HZum_H5Wxhu5dI5BJy5hU",
  authDomain: "prime-investment-web.firebaseapp.com",
  databaseURL: "https://prime-investment-web-default-rtdb.firebaseio.com",
  projectId: "prime-investment-web",
  storageBucket: "prime-investment-web.appspot.com",
  messagingSenderId: "913829003927",
  appId: "1:913829003927:web:8dd4247cf1874793d41fd2",
};

const getFirebaseConfig = () =>
  new Promise((resolve, reject) => {
    resolve(firebaseConfig);
    // const database = getDatabase();
  });

export default getFirebaseConfig;
