/**
 * Created by Sunshine on 2017/3/15.
 * 清单详情页面
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

var localData_list_details = require('../LocalData/LocalData_list_details.json');

export default class JYListDetails extends Component {
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
            title="清单详情"
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
          title="清单详情"
          leftIcon="ios-arrow-back-outline"
          leftPress={this.leftPress.bind(this)}
        />
        <ListView
          contentContainerStyle={styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderHeader={this._renderListViewHeader.bind(this)}
          renderRow={this._renderRow}
        />
      </View>
    )
  }

  _renderListViewHeader() {

    let headerData = this.state.headerData;
    let userInfoData = this.state.userInfoData;
    return (
      <View style={styles.listHeaderStyle}>
        <Text style={{fontSize:16, lineHeight:22, color:'#454545', marginTop:33}}>
          {headerData.name}
        </Text>

        <View style={styles.cellBotTitleViewStyle}>
          <Image
            style={{width:28, height:28, marginLeft:15, borderRadius:14}}
            source={{uri:userInfoData.avatar_url}}
          />
          <Text style={{paddingLeft:10, fontSize:12, color:'#8888'}}>
            {userInfoData.nickname}
          </Text>
        </View>

        <Text style={{fontSize:15, lineHeight:21, color:'#818181', marginTop:15, paddingHorizontal:25, textAlign:'center'}}>
          {headerData.description}
        </Text>

        <Text style={{fontSize:12, lineHeight:16, color:'#454545', paddingHorizontal:25, textAlign:'center', marginTop:45, marginBottom:5}}>
          - {headerData.items_count}个单品 -
        </Text>

        <Image source={require('../Images/Home/icon_trigle_15x7_.png')}>
        </Image>


      </View>
    )
  }

  _renderRow(rowData) {
    return (
      <Text style={{height:150, width:150, backgroundColor:'pink'}}
      >
        {rowData.name}
      </Text>
    )
  }

  componentDidMount() {
    // https://api.mglife.me/v2/favorite_lists/193604/detail?limit=20&offset=0
    let url = 'https://api.mglife.me/v2/favorite_lists/' + this.props.id + '/detail?limit=20&offset=0';
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
          var jsonData = localData_list_details['data'];
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
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },

  listHeaderStyle: {
    alignItems: 'center',
    backgroundColor:'white',
    // width:width,
  },

  cellBotTitleViewStyle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10,
    borderBottomColor:'#d7d7d7',
    borderBottomWidth:1,
    width:width-50,
  }

});