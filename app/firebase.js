// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCce7zj3l83g1Z8NigEL79TLAzu2qDRSqg',
  authDomain: 'timelycapsule.firebaseapp.com',
  projectId: 'timelycapsule',
  storageBucket: 'timelycapsule.appspot.com',
  messagingSenderId: '535654382616',
  appId: '1:535654382616:web:ad33a8abb36b97b9ac576d',
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
