import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

 
const firebaseConfig = {
    apiKey: "AIzaSyBn3RShZtbCok7LnQSKrKCR1uZPRllYHPg",
    authDomain: "quickchat-f311d.firebaseapp.com",
    databaseURL: "https://quickchat-f311d-default-rtdb.firebaseio.com",
    projectId: "quickchat-f311d",
    storageBucket: "quickchat-f311d.appspot.com",
    messagingSenderId: "225106648344",
    appId: "1:225106648344:web:6ccb1d35177784e657526d"
  };
  

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
export {db};
 