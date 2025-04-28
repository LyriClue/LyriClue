# LyriClue

LyriClue is a game where the player is presented with the lyrics of their favorite songs and try to guess the title and artist before the time runs out.

## 🚀 What's Been Done

- [x] Basic layout
- [x] Spotify Authentication
- [x] Spotify API calls
- [x] Lyric API calls

## 📅 Planned Features

- [ ] Finalize game loop
- [ ] Iterate layout based on user feedback
- [ ] Per user persistance
- [ ] Authorization scopes
- [ ] User settings

## 📁 Project File Structure

```plaintext
project-root/
│
├── dist/                               # Built production files
├── node_modules/                       # NPM dependencies
├── public/                             # Static assets and public files
├── src/                                # Main application source code
│   ├── assets/                         # Image/asset storage
│   ├── presenters/                     # Application presentation components
│   │   ├── AuthPresenter.tsx           # Presents the AuthView and handles Spotify Authentication
│   │   ├── gamePresenter.tsx           # Presents the gameView and formats lyrics from api
│   │   ├── landingPresenter.tsx        # Presents landingView
│   │   ├── postGuess.tsx               # Presents postGuessView
│   │   ├── SettingsPresenter.tsx       # Presents PlayListSelectionView
│   │   └── SpotifyLanding.tsx          # Redirects to /landing if user is logged in
│   ├── utils/                          # Utility functions and configurations
│   │   ├── firebaseConfig.tsx          # Config file for Firebase
│   │   ├── firestoreModel.tsx          # Handles firestore
│   │   ├── lyricApiConfig.tsx          # Config file for Lyric API
│   │   ├── lyricSource.tsx             # Setup Lyric API
│   │   ├── pathUtil.tsx                # Gets params from URL
│   │   ├── resolvePromise.tsx          # Prevents race conditions
│   │   ├── spotifyApiConfig.tsx        # Config file for Spotify API
│   │   └── spotifySource.tsx           # Setup Spotify API
│   ├── views/                          # Component view implementations
│   │   ├── AuthView.tsx
│   │   ├── difficultyView.tsx          # Player can choose difficulty
│   │   ├── gameView.tsx                # Main game
│   │   ├── landingView.tsx             # Menu page, Shows highscores and here the user can choose gamemode
│   │   ├── PlaylistSelectionView.tsx   # Displays the user's availible playlists on their spotify account
│   │   ├── postGuessView.tsx           # Shows the users guess and the correct answer beween every song
│   │   ├── suspenseView.tsx            # Displays loading icon while data is loading
│   │   └── viteDefault.tsx
│   ├── App.css                         # Main application styles
│   ├── App.tsx                         # Root React component
│   ├── index.css                       # Base CSS styles
│   ├── main.tsx                        # Application entry point
│   ├── Model.tsx                       # Data models/state management
│   ├── style.css                       # Importing typefaces
│   └── vite-env.d.ts                   # Vite type declarations
│
├── .firebaserc                         # Firebase project configuration
├── .gitignore                          # Git exclusion rules
├── eslint.config.js                    # ESLint configuration
├── firebase.json                       # Firebase deployment settings
├── index.html                          # Main HTML entry point
├── package-lock.json                   # Exact dependency versions
├── package.json                        # Project dependencies and scripts
├── README.md                           # Exact dependency versions
├── tsconfig.app.json                   # App-specific TS config
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.node.json                  # Node-specific TS config
└── vite.config.ts                      # Vite build configuration
```
