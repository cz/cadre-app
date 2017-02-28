import { AsyncStorage } from 'react-native';

export const auth0 = {
  clientId: '8x8P8NdK7hU8xlKjWFSL7Dvmu9jPV84y',
  domain: 'mobilization.auth0.com',
};

const authTokenKey = '@Mobilization:auth0IdToken';

export async function getAuth0IdToken() {
  try {
    const value = await AsyncStorage.getItem(authTokenKey);
    if (value !== null){
      return value;
    }
  } catch (error) {
    console.error(`Error retrieving auth0IdToken: ${error}`);
  }
}

export function setAuth0IdToken(token) {
  try {
    console.log(`AsyncStorage setting ${authTokenKey} to ${token}`);
    AsyncStorage.setItem(authTokenKey, token);
    const newToken = getAuth0IdToken();
    console.log(`token now: ${newToken}`);
  } catch (error) {
    console.error(`Error setting auth0IdToken with value '${token}': ${error}`);
  }
}
