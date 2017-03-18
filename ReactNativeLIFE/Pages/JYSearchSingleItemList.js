/**
 * Created by Sunshine on 2017/3/18.
 * 搜索 - 单品 - 点击tag进入的页面
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView,
  Text,
  ListView,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

let {width, height} = Dimensions.get('window')

// 导航条
import NavBar from '../Component/JYNavBar';

var localData_search_singleItemList = require('../LocalData/LocalData_search_singleItemList.json');

// cellItem
import SearchSingleItemTagCellItem from '../Component/JYSearchSingleItemTagCellItem';

var ItemWidth = (width-30)/2;
var ItemHeight = ItemWidth*244/173;

export default class JYSearchSingleItemList extends Component {
  constructor(props){
    super(props)
    // 头部view的高度
    this.headerViewHeight = 233.5

    this.state = {
      loading:true,
      headerData:{},
      userInfoData:{},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }
  render() {

    if (this.state.loading) {
      return (
        <View style={{flex:1}}>
          <NavBar
            title={this.props.title}
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
      <View style={{flex:1, backgroundColor:'#efeff4'}}>
        <NavBar
          title={this.props.title}
          leftIcon="ios-arrow-back-outline"
          leftPress={this.leftPress.bind(this)}
        />
        <ListView
          contentContainerStyle={styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  }

  _renderRow(rowData) {
    return (
      <SearchSingleItemTagCellItem
        style={{marginTop:10}}
        backImgUri={rowData.cover_image_url}
        itemWidth={ItemWidth}
        itemHeight={ItemHeight}
        title={rowData.name}
        price={rowData.price}
        likeCount={rowData.favorites_count}
      >
      </SearchSingleItemTagCellItem>
    )
  }

  componentDidMount() {
    // https://api.mglife.me/v2/item_subcategories/3/items?limit=20&offset=0
    let url = 'https://api.mglife.me/v2/item_subcategories/' + this.props.id + '/items?limit=20&offset=0';
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
          var jsonData = localData_search_singleItemList['data'];
          this._detailWithData(jsonData);
        }
      })
  }

  _detailWithData(json) {

    // 刷新状态
    this.setState({
      headerData:json.favorite_info,
      userInfoData:json.user_info,
      dataSource:this.state.dataSource.cloneWithRows(json.items),
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
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingHorizontal:5,
  },

});