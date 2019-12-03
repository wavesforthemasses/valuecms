import secret from './secret.js'
const vars = {
  website: {
    url: "",
    admin: {
      email: "",
      password: ""
    }
  },
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  firebaseKey: {
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
  },
  email: {
    sender: {
      auth: {
        pass: "",
        user: ""
      },
      service: "gmail"
    },
    receiver: {
      address: "",
      name: ""
    }
  },
  stripe: {
    sk: '',
    pk: ''
  }
}

export default { ...vars, ...secret }
