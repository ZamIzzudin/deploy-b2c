/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import firebase from '../config/firebase-config';

function socialMediaAuth(provider: any) { firebase.auth().signInWithPopup(provider).then((res) => res.user).catch((err) => err); }

export const socialMediaLogout = () => firebase.auth().signOut();

export default socialMediaAuth;