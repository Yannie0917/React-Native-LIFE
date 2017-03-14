/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Navigator,
  View
} from 'react-native'

import Main from './Main'

export default class JYWrapper extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{flex: 1}}>
        <Main navigator={this.props.navigator}/>
      </View>
    )
  }
}
