<script>
  import {Carousel, Slide} from '../ui/Carousel'
  import {Section} from '../ui/Section'
</script>

<style>

</style>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
  <meta property="og:image" content="/logo-512.png" />
</svelte:head>

<Carousel>
  <Slide overlay={true}>
    <h1>Home</h1>
  </Slide>
</Carousel>

<Section>
  <h2>START</h2>
  <ol>
    <li>
      <strong>open /package.json</strong>
      <p>Set you the app info</p>
      <pre>
        "name": "YOUR APP NAME",
        "description": "YOUR APP DESCRIPTION",
        "version": "YOUR APP VERSION",
      </pre>
    </li>
  </ol>
  <h2>FIREBASE</h2>
  <ol>
    <li>
      <strong>Go to firebase.google.com</strong>
      <p>If you don't have an account create one. Otherwise just add a new project</p>
    </li>
    <li>
      <strong>Go to the Project Settings</strong>
      <p>In the app card at the bottom of the page click on the web app icon and create a new web app</p>
      <ol>
        <li>Add a name at first step and check Firebase Hosting</li>
        <li>Ignore all the next steps</li>
        <li>Once you'll complete the procedure go at the bottom of the Project settings page and copy the Configuration object</li>
      </ol>
    </li>
    <li>
      <strong>open /env.js or /secret.js</strong>
      <p>Replace the firebase config keys with the ones you copied</p>
      <pre>
        firebase: &#x7B;
          apiKey: "AIzaSyBAQgwhwtezbaDG6NWhtmGAvEHni_TBw8k",
          authDomain: "myapp.firebaseapp.com",
          databaseURL: "https://myapp.firebaseio.com",
          projectId: "myapp",
          storageBucket: "myapp.appspot.com",
          messagingSenderId: "251146660040",
          appId: "1:251146660040:web:b1ad29934d68919dbb9d8f"
        &#x7D;,
      </pre>
      <strong>if you want to use env.js remember to add it to .gitignore</strong>
    </li>
    <li>
      <strong>open /firebase.json and /.firebaserc</strong>
      <p>Set the firebase project id</p>
      <pre>
        "projects": &#x7B;
          "default": "myapp"
        &#x7D;
      </pre>
    </li>
    <li>
      <strong>Go back to the Project Settings on firebase.google.com</strong>
      <p>Open Service Account TAB and download the Node.js private key</p>
    </li>
    <li>
      <strong>Open the downloaded private key and copy it</strong>
      <p>Replace the firebaseKey values inside secret.js</p>
    </li>
    <li>
      <strong>Go back to firebase.google.com</strong>
      <p>On Authentication, configure Email/password authentication method</p>
    </li>
    <li>
      <strong>Go back to Database</strong>
      <p>Create a Firestore Database</p>
      <ol>
        <li>On first modal choose the first option (Block Mode)</li>
        <li>On the second modal choose nam5 for USA or eur3 if your users will be europeans</li>
      </ol>
    </li>
    <li>
      <strong>Create a new collection</strong>
      <ol>
        <li>Call it <strong>users</strong></li>
        <li>You'll be forced to add at least 1 user, use <strong>admin</strong> as ID</li>
      </ol>
    </li>
    <li>
      <strong>open the Terminal</strong>
      <p>Run the following commands</p>
      <pre>
        firebase login
        firebase init functions
      </pre>
      <p>The answers are usually these</p>
      <ol>
        <li>Javascript</li>
        <li>ESlint: <strong>No</strong></li>
        <li>Overwrite functions/package.json: <strong>No</strong></li>
        <li>Overwrite functions/index.js: <strong>No</strong></li>
        <li>Overwrite functions/.gitignore: <strong>No</strong></li>
        <li>Install dependencies: <strong>Yes</strong></li>
      </ol>
      <pre>
        cd /functions
        npm install
      </pre>
    </li>
  </ol>
  <h2>SETUP</h2>
  <ol>
    <li>
      <strong>Run the following commands</strong>
      <pre>
        npm run build
        firebase serve
      </pre>
    </li>
    <li>
      <strong>open http://localhost:5000/setup</strong>
      <p></p>
    </li>
  </ol>
  <h2>CSS (TailwindCss)</h2>
  <ol>
    <li>
      <strong>open /tailwind.config.json</strong>
      <p>Config what you need..</p>
    </li>
  </ol>
  <h2>STATIC FILES</h2>
  <ol>
    <li>
      <strong>go to /static folder</strong>
      <p>Update these files with your logo: logo-192.png + logo-512.png + favicon.png</p>
    </li>
    <li>
      <strong>open /static/manifest.json</strong>
      <p>Update these info</p>
      <pre>
        "name": "YOUR APP NAME",
        "short_name": "YOUR APP SHORT NAME",
        "start_url": "/",
      </pre>
    </li>
  </ol>
  <h2>FONTS</h2>
  <ol>
    <li>
      <strong>run the following command (replace roboto with the font you want to use): </strong>
      <pre>
        npm install --save typeface-roboto
        cp -r node_modules/typeface-roboto static
      </pre>
    </li>
    <li>
      <strong>do this process for all the fonts you need:</strong>
      <pre>
        npm install --save typeface-lato
        cp -r node_modules/typeface-lato static
      </pre>
    </li>
    <li>
      <strong>then</strong>
      <p>Go inside static/typeface-YOURFONT/fonts and copy all fonts</p>
    </li>
    <li>
      <strong>go to static/fonts</strong>
      <p>Add all the copied fonts there</p>
    </li>
    <li>
      <strong>open static/typeface-YOURFONT/index.css</strong>
      <p>copy all the rules you need</p>
    </li>
    <li>
      <strong>open static/fonts.css</strong>
      <p>paste the rules here</p>
    </li>
  </ol>
  <h2>TEMPLATE</h2>
  <ol>
    <li>
      <strong>open /src/template.html</strong>
      <pre>
        <meta name="apple-mobile-web-app-title" content="MY APP NAME">
        <meta name="application-name" content="MY APP NAME">
      </pre>
    </li>
  </ol>
</Section>
