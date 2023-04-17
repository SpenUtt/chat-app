# Chat App

## Intro

Chat App for Android/iOS created with React Native. Provides users with a chat interface and options to share images and location  

## Tech Stack 
Technologies used: 
<li> React native 
<li> Expo 
<li> Google Firestore Database
<li> Anonymous authentication via Google Firestore
<li> Tested with Android Studio Emulator 

## Key Features

<li> A page where users can enter their name and choose a background color for the chat screen before joining the chat.
<li> A page displaying the conversation, as well as an input field and send button.
<li> The chat provides users with two additional communication features: sending images and location data.
<li> Data is stored online and offline.

## User Stories 

<li> As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family
<li> As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
<li> As a user, I want to send images to my friends to show them what I’m currently doing.
<li> As a user, I want to share my location with my friends to show them where I am.
<li> As a user, I want to be able to read my messages offline so I can reread conversations at any time.
<li> As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Setting up the development environment:

- Clone the repository: `git clone https://github.com/SpenUtt/ChatApp.git`
- Install Expo CLI as a global npm package: `npm install -g expo-cli`
- Install all project dependencies: `npm install`
- Head over to https://expo.dev/, create an account and log in via terminal with `expo login`
- Follow expo CLI's instructions depending on your preferred simulator (XCode, Android Studio, Expo Go)
- Start the project: `npm start` or `expo start`

## Database configuration:

- Go to https://firebase.google.com/ and sign in with your existing or create a new Google account
- Go to Firebase console and click on "Create Project"
- Once on your project's dashboard, click on "Develop" on the left, then "Cloud Firestore", then "Create Database" and follow the instructions, selecting "Test Mode"
- Create a new collection named "messages"
- Under "Project Settings", scroll down and click the "Firestore for Web" button (</>)
- Choose a name for the chat app, then click "Register" and copy the configuration code to the cloned repository into components/Chat.js, replacing the following with your configuration code:
  - apiKey: '...',
  - authDomain: '...',
  - projectId: '...',
  - storageBucket: '...',
  - messagingSenderId: '...',
  - appId: '...',
- To be able to upload photos, go to "Storage" on the left, then the "Rules" tab, then exchange "allow read, write: if false;" for "allow read, write;"

## Dependencies

    "@expo/webpack-config": "^18.0.1",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.6",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "expo-media-library": "~15.2.3",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "0.71.3",
    "react-native-gifted-chat": "^2.0.0",
    "react-native-maps": "^1.3.2",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-web": "~0.18.11"

## Getting started 

<p> To install packages, see dependencies listed above, which are included from the package.json file. Run the project with the command: npm start. Tests to be run via Android Studio Emulator 
