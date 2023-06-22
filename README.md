<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#signal-clone)

# ➤ Signal-Clone

Signal-Clone is a messaging app clone built using React Native and Firebase. It provides a platform for users to communicate with each other via text messages. The app supports various features such as user authentication, profile management, group chats, private messaging, online status, and is compatible with web, iOS, and Android devices.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#features)

## ➤ Features

- User authentication: Users can create accounts, log in, and update their profile information including bio and profile pictures.
- Group chats: Users can participate in group conversations with multiple participants.
- Private messaging: Users can engage in one-on-one conversations with other users while maintaining privacy.
- Online status: Users can see who is online and who is not.
- Cross-platform support: The app works seamlessly on web, iOS, and Android devices.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#dependencies)

## ➤ Dependencies

The Signal-Clone app relies on the following dependencies:

- React Native
- Firebase Realtime Database
- Firebase Firestore
- Firebase Storage

Make sure you have these dependencies installed before proceeding with the installation.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

To set up the Signal-Clone app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/signal-clone.git
   ```
2. Navigate to the project directory:

    ```bash
    cd signal-clone
    ```
3. Install the dependencies:

```bash
npm install
```
or
```bash
yarn install
```
4.  Configure Firebase:
     - Create a new Firebase project at the Firebase Console.
     - Enable Firebase Authentication, Realtime Database, Firestore, and Storage for your project.
     - Obtain the necessary Firebase configuration values (API keys, database URLs, etc.).

5.  Set up Firebase configuration:
     - Locate the firebase.js file in the project's source code.
     - Replace the placeholder configuration values with your Firebase project's configuration.

6. Build the app:
   - For Android:
   ```bash
        react-native run-android
   ```
   - For iOS:
   ```bash
     react-native run-ios
   ```
   Ensure you have a working development environment for React Native before running the above commands.

7.  Launch the app on your preferred device or emulator.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage

Once the Signal-Clone app is installed and running, users can perform the following actions:

 - Create an account or log in with existing credentials.
 - Update their profile information, including bio and profile pictures.
 - Join group chats or start private conversations with other users.
 - View the online status of other users.
 - Feel free to explore the app and use it to communicate with other users effectively.

 ## License
  
This project is licensed under the `MIT License`. Feel free to modify and distribute it as per your needs.

Please note that you may need to modify the placeholder URLs, commands, and other specific details according to your project's requirements.
