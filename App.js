import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WebView from "react-native-webview";
import Constants from 'expo-constants';

export default function App() {
  return (
      <View
          style={styles.container}
      >
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
