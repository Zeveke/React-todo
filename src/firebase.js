import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBC6ebLBT6-1FczbXsnl9P43OpSm6LTmW0',
	authDomain: 'todosproject-e104e.firebaseapp.com',
	databaseURL:
		'https://todosproject-e104e-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'todosproject-e104e',
	storageBucket: 'todosproject-e104e.appspot.com',
	messagingSenderId: '133692371575',
	appId: '1:133692371575:web:2a81f9fb30e5cbf1dacc72',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
