/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import 'firebase/auth';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
