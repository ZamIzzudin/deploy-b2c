import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBUS4vcB7jK6vKKyY-YOJjCfQbdmekzNg0',
    authDomain: 'fir-lunar.firebaseapp.com',
    projectId: 'fir-lunar',
    storageBucket: 'fir-lunar.appspot.com',
    messagingSenderId: '617548211760',
    appId: '1:617548211760:web:96140374a85bd60893eff5',
    measurementId: 'G-ZWVG6H42WB',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
