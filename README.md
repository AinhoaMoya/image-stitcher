## Get started

In order to start up the application, make sure you are running a Node version >= 8.2.1 and simply run:

```
cd client/ && npm install && npm run start
cd ../server/ && npm install && npm run start

```

At this point you should be able to visit the app at http://localhost:3000.

Upload up to 4 images and get your merged image!

## Technical Overview

This project includes both a React front-end app and an Express server as its backend.

Within the React app, I am using Redux to manage the number of files being uploaded through both the Drag and Drop component, and through the File Browse component.

Each of the app components, here referred to as containers, given they are stateful, passes Redux actions and initialState as props, and gets re-render each time the state is updated.

The Express backend offers simply one POST route, `/upload`, which takes an array of images, merges them together, saves the resulting image to disk and sends back said image's data uri for downloading it on the browser.

## Tests

This project does not have an extensive test coverage. Present tests mostly cover Redux actions and reducers. You can run them by:

```
cd client/ && npm run test

```
