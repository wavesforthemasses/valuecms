import app from './app.js'
import 'firebase/firestore'
const db = app ? app.firestore() : null
if(db) db.enablePersistence({synchronizeTabs: true})
export default db
