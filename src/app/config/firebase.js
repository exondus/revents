import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDX94h4jCZFC9l9EnLGgBUy-aurwuPRvf0',
	authDomain: 'revents-892bf.firebaseapp.com',
	projectId: 'revents-892bf',
	storageBucket: 'revents-892bf.appspot.com',
	messagingSenderId: '495659175561',
	appId: '1:495659175561:web:36087d57e6027c7d028058',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
