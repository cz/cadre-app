import { AsyncStorage } from 'react-native';

export const auth0 = {
  clientId: 'WVWnx0kr8lwoKpM3IpNgyMcB51GNLjQs',
  domain: 'mobilization.auth0.com',
};

const authTokenKey = '@Assemble:auth0IdToken';

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
