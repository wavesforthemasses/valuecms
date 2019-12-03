import * as admin from 'firebase-admin'
admin.initializeApp({
  credential: admin.credential.cert({...customVars.firebaseKey}),
  databaseURL: customVars.firebase.databaseURL
});
export default admin
