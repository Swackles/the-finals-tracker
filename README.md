# The Finals Stats

This is a proof of concept for The Finals stats website, where players can see different in-game statistics about themselves.

> The `https://api-gateway.europe.es-dis.net` endpoints are currently locked away behind authorization tokens that get generated every time the game launches and are user specific, so you get the user data for the user that generated the token. As it stands there is no other way of getting the tokens, besides listening to the traffic between the game and the servers. Since this is quite cumbersome, I've added mock data that can show the website without the token.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.