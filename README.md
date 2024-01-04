# The Finals Stats Tracker

This project uses embark's `https://api-gateway.europe.es-dis.net` API endpoints, that gives player statistics. Currently, these endpoints are private and require authentication tokens to view. When request is done using a token, then the server returns player statistics for that user.

Due to these endpoints being also protected by CORS, means that data cannot be fetched normally trough the browser. So there's a proxy server `api.finals-tracker.com` that all requests go trough.

## How to get JSON or JWT token

When you first enter the site, you have two possible inputs. For both of these inputs you can either fetch the data manually or use [The Finals Extractor](https://github.com/Swackles/the-finals-tracker-extractor) to get the data automatically. That project outputs both the JWT and JSON file so you can choose which one you enter.

> The JWT token has a 24h expiration date attached to it

> **NB!** It's important to remember that the JWT token is your authentication token with the embark servers. Although I promise that I **DO NOT SAVE** that token or any data coming from that token in the server, it's understandable if you don't trust me. That's why I've also provided the JSON as a safer way to visualize your data.

## Development

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
