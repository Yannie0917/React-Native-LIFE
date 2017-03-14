

import React, { Component } from 'react'
import {
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
