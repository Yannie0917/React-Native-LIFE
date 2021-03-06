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

// 导航条
import NavBar from '../Component/JYNavBar';

export default class JYProductDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true,
    }
  }
  render() {

    if (this.state.loading) {
      return (
        <View style={{flex:1}}>
          <NavBar
            title="商品详情"
            leftIcon="ios-arrow-back-outline"
            leftPress={this.leftPress.bind(this)}
          />
          <View style={styles.container}>
            <Text style={{textAlign:'center'}}>Loading...</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{flex:1}}>
        <NavBar
          title="商品详情"
          leftIcon="ios-arrow-back-outline"
          leftPress={this.leftPress.bind(this)}
        />
        <WebView
          style={styles.webViewStyle}
          source={{uri: this.state.strategyDetailsData['content_url']}}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        >
        </WebView>
      </View>
    )
  }

  leftPress() {
    const { navigator } = this.props;

    console.log('navigator=' + navigator + 'props='+ this.props);

    if(navigator) {
      navigator.pop({

      })
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  webViewStyle:{
    backgroundColor:'#F5FCFF',
  }

});