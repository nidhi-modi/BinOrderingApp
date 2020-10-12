import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Alert, useEffect, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


var houseSelected;

export default class GerBinOrderingForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showRealApp: false,
      selected: '',
    }

  }


  componentDidMount() {

    
    

  }

  


  render() {

    return (
      <View style={styles.container}>

        <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>

        </ImageBackground>

      </View>


    )


  }

}


const styles = StyleSheet.create({
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#54B948',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center'

  },
  container: {
    flex: 1,
    backgroundColor: '#ebebeb'
  },

  buttonContainer1: {
    //backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'

  },

  buttonContainer: {
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    fontSize: 19,
    color: '#000000',
    fontWeight: 'bold',

  },

  backgroundImage: {

    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  TouchableOpacityStyle: {

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  backgroundImage: {

    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  TouchableOpacityStyle2: {


    alignItems: 'center',
    justifyContent: 'center',
    right: 5,

  },

  FloatingButtonStyle2: {

    resizeMode: 'contain',
    width: 40,
    height: 40,
  },

  textInputStyle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "transparent"


  },
  text2: {
    color: '#0B5345',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 18,
    marginRight: 15,

  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
})
//export default SiteSelection
