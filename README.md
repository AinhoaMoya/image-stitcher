## Get started

In order to start up the application, simply run:

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

## TODOS

You will find several `TODO` comments across the app. These point out areas of improvement (duplicated code, ugly hacks, lack of test coverage...) that would be addressed with enough time.

## Create a NodeJs application that encapsulates the following functionality

  *Accept 4 images as input via browse and drag and drop
  *Given the 4 images, create a new image that stitches the source images in sequence, one after the other
  *Once the stitched image is created, display on a web page
  *And then give the user the ability to download the resulting image to store it on their local computer.

## Requirements:

  *Comment your code as appropriate (no need to comment every line. Only when necessary to clarify)
  *Publish to github including md file and provide us with the repository link via email

## Resources:

  *https://nodejs.org/en/
  *https://www.npmjs.com/package/merge-img
