# FlyMate ✈️

A modern React Native flight booking application built with Expo, featuring flight search, user authentication, and a beautiful UI.

## 📱 Features

- **Flight Search**: Search and compare flights with real-time data
- **User Authentication**: Secure login with email/password and Google Sign-In
- **Cross-Platform**: Runs on iOS and Android
- **Modern UI**: Built with NativeWind (Tailwind CSS for React Native)
- **Firebase Integration**: Authentication and backend services
- **Protected Routes**: Secure navigation with authentication guards

## 🚀 Tech Stack

- **Framework**: React Native with Expo (~53.0.17)
- **Navigation**: Expo Router with typed routes
- **Styling**: NativeWind (Tailwind CSS)
- **Authentication**: Firebase Auth with Google Sign-In
- **State Management**: React Context
- **Language**: TypeScript
- **Icons**: Expo Vector Icons

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone [<repository-url>](https://github.com/Omar-bit/FlyMate)
   cd FlyMate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google Sign-In
   - Download configuration files:
     - `google-services.json` for Android (place in `/android/app/`)
     - `GoogleService-Info.plist` for iOS (place in root directory)

4. **Configure Google Sign-In**
   - Follow the setup guide for [@react-native-google-signin/google-signin](https://github.com/react-native-google-signin/google-signin)
   - Add your OAuth 2.0 client IDs to Firebase
   -
5. **SkyScrapper API Key**
   - Hit https://rapidapi.com/apiheya/api/sky-scrapper
   - Create a Rapidapi account
   - Subscribe to SkyScrapper service
   - Get the SkyScrapper API key

6. **Configure .env Variables**
   - Create and modify the .env variables

## 🏃‍♂️ Running the Project

### Development Server

```bash
npm start
```

### Platform-Specific Commands

```bash
# iOS (requires macOS and Xcode)
npm run ios

# Android (requires Android Studio)
npm run android

# Web
npm run web
```

### Build Commands

```bash
# Build for production
npx expo build

# Create development build
npx expo run:android
npx expo run:ios
```

## ⚠️ Important

1. In Order to use Google Sign in you need to run the app on a physical device `npx expo run android/ios`
2. I exposed the .env file to facilate the review and test process for you (im gonna delete these secrets from firebase and skyscrapper later)
