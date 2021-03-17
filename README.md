# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Using Firebase

To use this application, you need Firabase account.

## Steps:

### 1: Add firebase file:

Add `firebase.js` to `src` folder and copy this code into the file:

    import firebase from "firebase/app";
    import "firebase/auth";
    import '@firebase/firestore'

        const app = firebase.initializeApp({
            apiKey: "own key",
            authDomain: "own domain",
            projectId: "own id",
            storageBucket: "own data",
            messagingSenderId: "own id",
            appId: "own id"
        });


    export const auth = app.auth();
    export const db = firebase.firestore();
    export default app

### 2: Create a new Firebase project:

`Add project` in Firebase website.\
Type a project name and click `continue`.\
Decide you need Google Analytics or not.\
Click to `Create project` and wait...

### 3: Get started by adding Firebase to your app:

Click `Web`.\
And click again.\
Copy the datas from your `Firebase config` into `firebase.js` to config you app.

### 6: Create a new Cloud Firestore:

Search `Cloud Firestore` in Firabase page and click.\
Select `production` or `test` mode.\
Select a server.

### 7: Configure a new collection:

`Start collection`:\
Give collection id: `aliases`.\
Create a fake document with id (you can delete it later).

### 8: Set rules:

Select `Rules` and change this row: `allow read, write: if false` to this `allow read, write: if true`.\
WARNING: it can be dangorous, to know more about permission read the Firebase documentation: https://firebase.google.com/docs/firestore

### 9: Enable Anonymus authentication:

Go to `Athentication` ->
`Get started` ->
`Sign-in method`.\
Set Anonymus from disabled to enabled

### Enjoy the app

## How it works:
Language of application: Hungarian.\
You can save url-s and aliases in to the Cloud Firestore.
Give a valid `url` and its `alias` and save them the cloud.
One alias may included in the database only one (controlled by application).
You get a `secret code`, and you can delete the alias with this.

## Enpoints:

`/a/:alias`\
Searching the alias in database, and if it exists, the app redirect to the URL what belongs to this alias.
If alias does not exist, the application indacates this to the user.

`/remove/:alias/:secretCode`\
You need the alias and its secret code to remove an alias.\
If alias exists and the code is correct, the application removes the alias from the cloud.
