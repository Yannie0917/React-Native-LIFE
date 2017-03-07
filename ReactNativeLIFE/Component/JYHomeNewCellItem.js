/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 自定的cell的item
 *
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
      <View
        style={[styles.itemStyle, this.props.style]}

      >
        <Image
          style={this.props.topImageStyle}
          source={{uri:this.props.topImageSource}}
          onPress={this.props.itemPress}
        />

        <Text style={styles.titleStyle} numberOfLines={1}>
          {this.props.title}
        </Text>

        <Text style={styles.priceStyle}>
          {this.props.priceTitle}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  itemStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    // backgroundColor:'gray'
  },
  titleStyle:{
    // backgroundColor:"blue",
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
