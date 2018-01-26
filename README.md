[![Build Status](https://travis-ci.org/alevor657/chat-client.svg?branch=master)](https://travis-ci.org/alevor657/chat-client)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/alevor657/chat-client/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-client/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/alevor657/chat-client/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-client/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/alevor657/chat-client/badges/build.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-client/build-status/master)


# Chat client

[Chat server](https://github.com/alevor657/chat-server)

# Table of Contents
1. [Overview](#overview)
    - [Technological stack](#stack)
        - [express](#express)
        - [React](#react)
        - [Redux](#redux)
        - [Socket.io](#socketio)
        - [JWT](#jwt)
        - [Webpack](#webpack)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Testing](#testing)
    - [Code coverage](#code-coverage)
    - [Docker containers](#docker-containers)

## Overview
---
This is a JavaScript chat client, built with React. It also uses Express to serve the only one HTML file, Redux for state management and socket io for communication with [chat-server](https://github.com/alevor657/chat-server).

Before you read further i am going to mention some **essential things** you _should_ before you proceed.

- If you make ANY changes to code you do need to run `npm run webpack`
- By default the client will connect to the chat server on my rpi. To change that go ahead and modify API_URL constant in `src/constants/index.js`, then run `npm run webpack`


### Stack
---
#### Express

This application uses Express js which is built on top of a vanilla node http server.
Express only serves one html file that contains whole application, so no server rendering.

#### React

[React](https://reactjs.org/) is a library for building user interface. It makes it simplier to write Single Page Applications that use the power of JavaScript. It makes the applications to feel more responsible. It is also easyer to maintan such application and allows me to solve more complicated tasks.

#### Redux

Application uses [Redux](#https://redux.js.org/) to maintain its state and manage it in more convinient manner. Redux does play well with React so it was a pretty straightforward choice.

I do persist the state for the application in localStorage, that is why user does not have to log in every time page refresh occurs.

#### Socket.io

Client uses [socket.io](https://socket.io/) to provide real-time messaging functionality. It is a further abstraction over long-polling XHR requests and websockets standard. It also serves as a polyfill for browsers that does not support websockets.

#### JSON Web Token

JSON Web Token is stored in the applications store to use the [servers](https://github.com/alevor657/chat-server) functionality.

#### Webpack

I use webpack to minify all code. Minified version of the program is availiabe in the dist folder.

### Installation
---
You can play with the application directly over [here](http://80.78.218.120:1345), or install it locally. Do not forget to modify the API_URL constant as described in foreword if you want to use locally installed server. By default the applciation will connect to the server running on my rpi.

In order to install the application do:

    git clone https://github.com/alevor657/chat-client.git
    cd chat-client
    npm install
    npm start

By default server will be listening at 127.0.0.1:1337

You are ready to go!

### Configuration
---
You can specify following envirnment variables:

    // Server will listen at DBWEBB_PORT or 1338
    export DBWEBB_PORT=

Whenever you make changes to code **DO RUN**

    npm run webpack

then Ctrl + C when its done.

### Testing

In order to run the test suite do:

    npm test

You also have a possibility to run the tests by starting up docker containers

    npm run test_latest
    npm run test_8

If something goes wrong:

    sudo docker-compose build --no-cache

#### Code coverage

You can find in in coverage/lcov-report. Open up index.html file.

#### Docker containers

In order to start application in either 9 or 8 run following:

    npm run node_latest
    npm run node_8
