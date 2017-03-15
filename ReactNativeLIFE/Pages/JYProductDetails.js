/**
 * Created by Sunshine on 2017/3/14.
 * 商品详情
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView,
  Text
} from 'react-native';

export default class JYProductDetails extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <WebView style={styles.webview_style}
                 source={{uri: 'http://www.mglife.me/posts/959/content'}}
                 startInLoadingState={true}
                 domStorageEnabled={true}
                 javaScriptEnabled={true}
        >
        </WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  webview_style:{
    backgroundColor:'#00ff00',
  }

});