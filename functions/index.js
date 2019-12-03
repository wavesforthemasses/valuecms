const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

//admin.initializeApp(functions.config().firebase);

// We have to import the built version of the server middleware.
const { sapper, cv, admin } = require('./__sapper__/build/server/server.js');
//import * as sapper from '@sapper/server';

middleware = sapper.middleware();

const oneHour = 60 * 60
const oneDay = oneHour * 24
const oneWeek = oneDay * 7
const oneMonth = oneWeek * 4
const oneYear = oneDay * 365
const emailSender = {
  ...cv.email.sender
}

exports.ssr = functions.https.onRequest((req, res) => {
  req.baseUrl = '';
  res.set(
    'Cache-Control',
    `public, max-age=${oneWeek}, must-revalidate, s-maxage=${oneMonth}, proxy-revalidate, stale-while-revalidate=${oneDay}, stale-if-error=${oneWeek}`
  );
  middleware(req, res);
});

if(emailSender && emailSender.auth && emailSender.auth.pass){
  let transporter = nodemailer.createTransport(emailSender);
}

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const from = req.body.from;
    const name = req.body.name;
    const txt = req.body.txt;

    const mailOptions = {
      from: `${name} <${from}>`,
      to: `${cv.email.receiver.name} <${cv.email.receiver.address}>`,
      subject: 'Subject',
      text: txt
    };

    if(!transporter) return res.send('You need to configure nodemailer first!');

    return transporter.sendMail(mailOptions, (erro, info) => {
      if(erro){
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });
  });
});

exports.setup = functions.https.onRequest(async (req, res) => {
  const users = await admin.firestore().collection('users').get()
  if(users.size === 1){
    const user = await admin.firestore().collection('users').doc('admin').get()
    if(user.data()){
      const firstAdmin = await admin.auth().createUser({
        email: cv.website.admin.email,
        password: cv.website.admin.password
      });
      await admin.auth().setCustomUserClaims(firstAdmin.uid, {admin: true})
      await admin.firestore().collection('users').doc(firstAdmin.uid).update({
        name: 'Admin',
        roles: {'admin': true}
      });
      await admin.firestore().collection('users').doc('admin').delete();
      return res.send("Done!")
    }
  }
  return res.send("Error!")
});

exports.onUnRegister = functions.firestore.document('users/{userId}').onDelete((snap, context) => {
  // snap could be used to backup the data before delete
  return admin.auth().deleteUser(context.params.userId)
});

exports.onRegister = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    name: user.displayName || user.email
  });
});

exports.addUser = functions.https.onCall( async (data, context) => {
  if(context.auth.token.admin !== true) return {success: false, error: "Request not allowed"}
  const { name, email, password } = data
  return await admin.auth().createUser({
    displayName: name,
    email: email,
    password: password
  });
});

exports.setRole = functions.https.onCall((data, context) => {
  if(context.auth.token.admin !== true) return {success: false, error: "Request not allowed"}
  const { uid, role, status } = data
  if(status === false){
    return removeRole(uid, role)
  }
  return grantRole(uid, role)
});

const grantRole = async (uid, role) => {
  const user = await admin.auth().getUser(uid)
  if(user.customClaims && user.customClaims[role] === true) return;
  const currentCustomClaims = user.customClaims || {};
  currentCustomClaims[role] = true;
  return admin.auth().setCustomUserClaims(uid, currentCustomClaims)
    .then(() => admin.firestore().collection('users').doc(uid).update({ roles: {[role]: true} }))
}

const removeRole = async (uid, role) => {
  const user = await admin.auth().getUser(uid)
  if(user.customClaims && user.customClaims[role] === true){
    const currentCustomClaims = user.customClaims || {};
    delete currentCustomClaims[role];
    return admin.auth().setCustomUserClaims(uid, currentCustomClaims)
      .then(() => admin.firestore().collection('users').doc(uid).update({ roles: {[role]: null} }))
  }
}
