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

let realm;

export default class App extends Component {

  constructor(props) {
    super(props);

    /*realm = new Realm({
      path: 'QualitySheetDatabase.realm',
      schema: [
          {
              name: 'TL_quality_sheet',
              properties: {
                  entry_id: { type: 'int', default: 0 },
                  auditor_name: 'string',
                  house_number: 'string',
                  row_number: 'string',
                  week_number: 'int',
                  clipping_data1: 'string',
                  clipping_data2: 'string',
                  clipping_data3: 'string',
                  clipping_data4: 'string',
                  pruning_data1: 'string',
                  pruning_data2: 'string',
                  pruning_data3: 'string',
                  pruning_data4: 'string',
                  twisting_data1: 'string',
                  twisting_data2: 'string',
                  twisting_data3: 'string',
                  twisting_data4: 'string',
                  picking_data1: 'string',
                  picking_data2: 'string',
                  picking_data3: 'string',
                  picking_data4: 'string',
                  deleafing_data1: 'string',
                  deleafing_data2: 'string',
                  deleafing_data3: 'string',
                  deleafing_data4: 'string',
                  dropping_data1: 'string',
                  dropping_data2: 'string',
                  dropping_data3: 'string',
                  dropping_data4: 'string',
                  quality_percent: 'int',
                  data_send      : 'string',

              },
          },
      ],
  });*/

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