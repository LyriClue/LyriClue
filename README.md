# 🎵 LyriClue

LyriClue is a game where the player is presented with the lyrics of their favorite songs and try to guess the title and artist before the time runs out.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#📦-installation)
3. [Third Party Components](#third-party)
4. [Project Structure](#project-structure)

## Overview

### 🚀 What's Been Done

- [x] Basic layout
- [x] Spotify Authentication
- [x] Spotify API calls
- [x] Lyric API calls
- [x] Finalize game loop
- [x] Iterate layout based on user feedback
- [x] Per user persistance
- [x] Authorization scopes

### 📅 Planned Features

- [ ] User specific settings
- [ ] Redesign of Landing page

## 📦 Installation

In order to run the website locally, install the requried dependencies with:

```bash
npm install
```

To start the website, you have to both run the backend server aswell as the frontend hosting.

### Starting the server

While positioned in the '/functions/' directory, run:

```bash
npm run server
```

### Start website hosting

In a separate terminal instance, while positioned in the root directory of the project, run:

```bash
npm run dev
```

The website should now be available at:

```bash
http://localhost:5173/
```

### A note on Spotify

The trial of the spotify API that was used in this project requires us to manually add each spotify user that should have access to the API. This means that unless manually added by us, you will not be able to log in through spotify. If you'd like access, please contact us and we'll make sure to add you as quickly as possible.

## ⚙️Third Party Components <a name="third-party"></a>

Two components were used from a third party.

### React-Lrc

[Link to GitHub page](https://github.com/mebtte/react-lrc/tree/74df10e762b12fce1ca54bab27a6d4844be25503)

A component createed to display lyrics of the LRC format. This component enables easy lyrics management using time stamps for each line, automatic scrolling aswell as easy styling for active lines. The component was used in the game view in order to display the lyrics to the user.

### Material UI - Slider

[Link to Documentation](https://mui.com/material-ui/react-slider/)

The slider for the difficulty was created using the material ui slider component. It offered a surprising amount of customizability while remaining easy to configure and setup. It can be found while choosing playlists when logged in with spotify.

## 📁 Project File Structure <a name="project-structure"/>

```plaintext
.
├── dist                                                    # Built production files
├── eslint.config.js                                        # ESLint configuration
├── firebase.json                                           # Firebase deployment settings
├── functions                                               # Main directory for backend server functions
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   └── index.ts                                        # Backend server
│   └── tsconfig.json
├── index.html                                              # Main HTML entry point
├── lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json  # (ignored in repo) Firebase API secrets
├── package.json                                            # Project dependencies and scripts
├── package-lock.json                                       # Exact dependency versions
├── public                                                  # Static assets and public files
│   └── vite.svg
├── README.md                                               # Exact dependency versions
├── src                                                     # Main application source code
│   ├── App.css                                             # Main application styles
│   ├── App.tsx                                             # Root React component
│   ├── assets
│   │   └── react.svg
│   ├── index.css                                           # Base CSS styles
│   ├── main.tsx                                            # Application entry point
│   ├── Model.tsx                                           # Handles firestore
│   ├── presenters                                          # Application presentation components
│   │   ├── AuthPresenter.tsx                               # Presents the AuthView and handles Spotify Authentication
│   │   ├── CountdownPresenter.tsx                          # Presents the countdown before game is shown
│   │   ├── GamePresenter.tsx                               # Presents the gameView and formats lyrics from api
│   │   ├── LandingPresenter.tsx                            # Presents landingView
│   │   ├── PostGamePresenter.tsx                           # Presents PostGameView
│   │   ├── PostGuessPresenter.tsx                          # Presents PostGuessView
│   │   ├── SettingsPresenter.tsx                           # Presents PlayListSelectionView
│   │   └── SpotifyLanding.tsx                              # Redirects to /landing if user is logged in
│   ├── style.css                                           # Importing typefaces
│   ├── utils                                               # Utility functions and configurations
│   │   ├── firebaseConfig.tsx                              # Config file for Firebase
│   │   ├── firestoreModel.tsx                              # Handles firestore
│   │   ├── lyricApiConfig.tsx                              # Config file for Lyric API
│   │   ├── lyricSource.tsx                                 # Setup Lyric API
│   │   ├── pathUtil.tsx                                    # Gets params from URL
│   │   ├── resolvePromise.tsx                              # Prevents race conditions
│   │   ├── spotifyApiConfig.tsx                            # Config file for Spotify API
│   │   ├── spotifySource.tsx                               # Setup Spotify API
│   │   └── ViewUtils.tsx                                   # Utils for views and components
│   ├── views                                               # Component view implementations
│   │   ├── AuthView.tsx                                    # Displays login page
│   │   ├── CountdownView.tsx                               # Displays a 3s countdown before game
│   │   ├── DifficultyView.tsx                              # Player can choose difficulty
│   │   ├── GameView.tsx                                    # Displays the lyrics of a song and a guessing form
│   │   ├── LandingView.tsx                                 # Menu Page, shows highscores and user can choose game mode
│   │   ├── PlaylistSelectionView.tsx                       # Displays the user's availible playlists on their spotify account
│   │   ├── PostGameView.tsx                                # Shows a summary of the recently played game
│   │   ├── PostGuessView.tsx                               # Shows results of a guess for an individual song
│   │   └── SuspenseView.tsx                                # Displays loading icon while data is loading
├── tsconfig.app.json                                       # App-specific TS config
├── tsconfig.json                                           # TypeScript configuration
├── tsconfig.node.json                                      # Node-specific TS config
└── vite.config.ts                                          # Vite build configuration
```
