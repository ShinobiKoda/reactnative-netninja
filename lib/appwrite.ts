import { Client, Account, Databases, Avatars,  } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)  
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

export default client;
