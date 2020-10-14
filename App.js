/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import MainStackNavigator from './navigation/MainStackNavigator'
import SplashScreen from 'react-native-splash-screen'
import Realm from 'realm';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';


let realm;

export default class App extends Component {

  constructor(props) {
    super(props);

    realm = new Realm({
      path: 'BinOrderingOfflineDB.realm',
      schema: [
          {
              name: 'bin_ordering_offline_table',
              properties: {
                  entry_id: { type: 'int', default: 0 },
                  site_name                : 'string',
                  pickup_Front             : 'string',
                  pickup_Back              : 'string',
                  size15Front_general      : 'string',
                  size15Front_green        : 'string',
                  size30Front_general      : 'string',
                  size30Front_green        : 'string',
                  size15Back_general      : 'string',
                  size15Back_green        : 'string',
                  size30Back_general      : 'string',
                  size30Back_green        : 'string',
                  pickup_date_time        : 'string',
                  order_number            : 'string',
                  data_send               : 'string',

              },
          },
      ],
  });

  //ENDS
    
  }

  async componentDidMount() {

    SplashScreen.hide();
  


  }

  render() {
    return (



      <MainStackNavigator />


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
});