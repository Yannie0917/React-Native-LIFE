/**
 * Created by Sunshine on 2017/3/18.
 * 搜索 - 单品 - 点击tag - 进入的页面的cell
 */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class JYSearchSingleItemTagCellItem extends Component{
  static propTypes = {
    itemWidth:PropTypes.number,
    itemHeight:PropTypes.number,
    backImgUri:PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    likeCount:PropTypes.number,
    style: PropTypes.object,
    itemPress: PropTypes.func,
  }

  render(){
    return(
      <View
        style={[styles.itemStyle, this.props.style, {width:this.props.itemWidth, height:this.props.itemHeight,}]}
        onPress={this.props.itemPress}
      >
        {/*flex:仅仅是主轴上的空间比例, 交叉轴空间还需自己设置或者内部的控件自动撑开*/}
        <View style={{flex:354}}>
          <Image
            style={{flex:1,  borderRadius:5}}
            source={{uri:this.props.backImgUri}}
          >
          </Image>
        </View>

        <View style={{flex:172, justifyContent:'space-between', paddingHorizontal:5}}>
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingBottom:5, paddingHorizontal:5}}>
            <Text style={styles.priceStyle}>¥ {this.props.price}</Text>
            <Text style={styles.likeCountStyle}>❤ {this.props.likeCount}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemStyle:{
    flexDirection:'column',
    borderRadius:5,
    borderWidth:0.5,
    borderColor:'#d7d7d7',
    backgroundColor:'white',
  },
  titleStyle:{
    color: "#333333",
    fontSize: 13,
    textAlign:'left',
    marginTop:8,
  },

  priceStyle:{
    color: "#ff2d47",
    fontSize: 14,
    textAlign:'left',

  },
  likeCountStyle:{
    color: "black",
    fontSize: 10,
    textAlign:'right',
  }
});
