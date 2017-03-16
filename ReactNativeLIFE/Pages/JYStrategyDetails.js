/**
 * Created by Sunshine on 2017/3/15.
 * 攻略详情
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

export default class JYStrategyDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      strategyDetailsData:{}
    }
  }
  render() {

    if (this.state.loading) {
      return (
        <View style={{flex:1}}>
          <NavBar
            title="攻略详情"
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
          title="攻略详情"
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

  componentDidMount() {
    // https://api.mglife.me/v2/posts_v2/959
    let url = 'https://api.mglife.me/v2/posts_v2/' + this.props.id;
    console.log('url = ' + url);
    this._loadDataFromNet(url);
  }

  // 获取网络数据
  _loadDataFromNet(url) {
    fetch(url)
      .then((response) => response.json())
      .then(responseData => {
        var jsonData = responseData['data'];
        // 数据转换
        this._detailWithData(jsonData);
      })
      .catch((error) => {
        if (error) {
          console.log('错误信息:' + error);
          var jsonData = localData_hom_new['data'];
          this._detailWithData(jsonData);
        }
      })
  }

  _detailWithData(json) {
    // 刷新状态
    this.setState({
      strategyDetailsData:json,
      loading:false
    })
  }


  leftPress() {
    const { navigator } = this.props;
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
    backgroundColor: 'white',
  },

  webViewStyle:{
    backgroundColor:'white',
  }

});