import app from './app.js'
import 'firebase/auth'
export default app ? app.auth() : null
