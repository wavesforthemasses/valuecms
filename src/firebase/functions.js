import app from './app.js'
import 'firebase/functions'
export default app ? app.functions() : null
