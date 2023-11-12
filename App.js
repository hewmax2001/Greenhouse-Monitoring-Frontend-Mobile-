import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import WebView from "react-native-webview";
import Constants from 'expo-constants';

import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {useEffect, useState} from "react";
import * as Notifications from "expo-notifications";
import registerNNPushToken, {registerIndieID} from 'native-notify';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {APP_ID, APP_TOKEN, BASE_URL} from "./constants";

export default function App() {
    const [expoToken, setExpoToken] = useState()


    useEffect(() => {
        getUserToken()
    }, []);

    async function getUserToken() {
        let token = await SecureStore.getItemAsync('user_token')
        if (!token) {
            await axios.get(BASE_URL + 'create_alert_profile/', {

            }).then(async function (response) {
                let token = response.data.expoUserToken
                let subId = response.data.subscriptionToken
                setExpoToken(token)
                await SecureStore.setItemAsync('user_token', token)
                await registerIndieID(subId, APP_ID, APP_TOKEN)
                alert("Token created! " + token + " / " + subId)
            }).catch(error => alert(error))

        }
        else {
            alert(token)
            await axios.post(BASE_URL + 'get_alert_profile/', {
                expo_token: token,
            }).then(async function (response) {
                let token = response.data.expoUserToken
                let subId = response.data.subscriptionToken
                setExpoToken(token)
                await registerIndieID(subId, APP_ID, APP_TOKEN)
                alert("Token exists! " + token + " / " + subId)
            }).catch(error => console.log(error))
        }
    }

  return (
      <View
          style={styles.container}
      >
          <Text>Hello</Text>
          <WebView
            style={styles.webContainer}
            source={{ uri: 'https://capstone-react-frontend.vercel.app/' }}
          />
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


