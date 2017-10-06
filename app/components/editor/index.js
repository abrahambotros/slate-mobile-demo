import React, {Component} from 'react';
import { StyleSheet, View, Text, WebView } from 'react-native';
import stateJson from './initialState.json';

export default class Editor extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Slate Mobile Demo'
  }

  sendMessage() {
    this.webviewbridge.postMessage(JSON.stringify(stateJson));
  }

  onBridgeMessage(message) {
    console.log(message);
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
        scalesPageToFit={false}
        ref={(r) => this.webviewbridge = r}
        onMessage={this.onBridgeMessage}
        javaScriptEnabled={true}
        source={require('../../webview/index.html')}
        startInLoadingState
        style={styles.webView}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  webView: {
      flex: 1,
      height: '100%',
      width: '100%'
  }
});
