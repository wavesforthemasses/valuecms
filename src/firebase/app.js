import config from './config.js'
import firebase from 'firebase/app'
export default process.browser === true ? firebase.initializeApp(config) : null
