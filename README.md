# Welcome to TrashChat 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Design

I've tried to use a flat approach in the layout application to make it more generic and open to any desired customization.
The ui framework used here is [React Native Paper](https://callstack.github.io/react-native-paper/), the decision to use it was based specially on his popularity and the simplicity of use.

### Screen Demos


## The building process

- First I had to decide which cloud resources to use, after a quick research I decided to move on with Google Cloud, because it give me the chance to work in only one provider for everthing.
- The next step was to prepare the database structure so that I could meet all the project requirements.
- The Authorization process was the third step. And I had to figured out how to integrate the users from Auth to the users in the chat.
- To be able to list all the users created from the Auth process. I created a Cloud Function that was able to do it for me.