/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 自定的cell的item
 *
 */
// 如果要为View添加普通点击事件，请直接使用Touchable系列组件替代View，然后添加onPress函数）。
import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// 商品详情
import ProductDetails from '../Pages/JYProductDetails';

export default class JYHomeNewCellItem extends Component{
  static propTypes = {
    topImageSource:PropTypes.string,
    title: PropTypes.string,
    priceTitle: PropTypes.string,
    style: PropTypes.object,
    topImageStyle: PropTypes.object,
    itemPress: PropTypes.func,
  }

  render(){
    return(
      <TouchableOpacity
        style={[styles.itemStyle, this.props.style]}
        activeOpacity = {0.8}
        onPress={(cellData)=>{
          const { navigator } = this.props;
          if(navigator) {
            navigator.push({
              name: 'ProductDetails',
              component: ProductDetails,
            })
          }
        }}
      >
        <Image
          style={this.props.topImageStyle}
          source={{uri:this.props.topImageSource}}

        />

        <Text style={styles.titleStyle} numberOfLines={1} onPress={this._myPress}>
          {this.props.title}

        </Text>

        <Text style={styles.priceStyle}>
          {this.props.priceTitle}
        </Text>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  titleStyle:{
    color: "black",
    fontSize: 12,
    width:65,
    marginVertical:5
  },
  priceStyle:{
    color: "#f84e4e",
    fontSize: 12,
  }
});
