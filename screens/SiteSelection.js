import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, ImageBackground, Alert, useEffect, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


var houseSelected;

var screenWidth = (Dimensions.get('window').width)/1.6;

export default class SiteSelection extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: '',
        }

    }


    componentDidMount() {


        try {
            AsyncStorage.getItem('house').then((text1Value) => {
                houseSelected = JSON.parse(text1Value);
                this.setState({ selected: text1Value });

                if (houseSelected === 'HAR') {

                    this.props.navigation.navigate('HarBinOrderingForm');

                } else if (houseSelected === 'GER') {

                    this.props.navigation.navigate('GerBinOrderingForm');


                } else if (houseSelected === 'OHA') {

                    //this.props.navigation.navigate('OhaQualityActivity');


                } else if (houseSelected === 'REP') {

                    //this.props.navigation.navigate('RepQualityActivity');

                } else {

                }

            }).done();
        } catch (error) {


        }




    }

    setAsyncData = (siteName) => {

        AsyncStorage.setItem('house', JSON.stringify(siteName));

        console.log("Data Saved successfully : " + JSON.stringify(siteName));

        if (siteName === 'HAR') {

            this.props.navigation.navigate('HarBinOrderingForm');

        } else if (siteName === 'GER') {

            this.props.navigation.navigate('GerBinOrderingForm');

        } else if (siteName === 'OHA') {

            this.props.navigation.navigate('GerBinOrderingForm');

        } else if (siteName === 'REP') {

            this.props.navigation.navigate('GerBinOrderingForm');


        }else {


        }


    }



    harAlertButton = () => {
        Alert.alert(
            'Are you sure ?',
            'It cannot be changed',
            [
                { text: 'Yes', onPress: () => this.setAsyncData('HAR') },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: false
            }
        );


    }

    gerAlertButton = () => {
        Alert.alert(
            'Are you sure ?',
            'It cannot be changed',
            [
                { text: 'Yes', onPress: () => this.setAsyncData('GER') },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: false
            }
        );
    }

   
    ohaAlertButton = () => {
        Alert.alert(
            'Are you sure ?',
            'It cannot be changed',
            [
                { text: 'Yes', onPress: () => this.setAsyncData('OHA') },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: false
            }
        );
    }

    repAlertButton = () => {
        Alert.alert(
            'Are you sure ?',
            'It cannot be changed',
            [
                { text: 'Yes', onPress: () => this.setAsyncData('REP') },
                { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
            ],
            {
                cancelable: false
            }
        );
    }



    render() {

        return (
            <View style={styles.container}>
      
              <View style={styles.containerText}>
      
                <Text style={styles.text}>What site are you from ? </Text>
      
              </View>
      
              <View style={styles.marginDimensionTop}></View>
      
              <View style={styles.containerButtons}>
      
      
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.harAlertButton}>
                  <Text style={styles.buttonText}>HAR</Text>
                </TouchableOpacity>
      
                <View style={styles.marginSmallDimensionTop}></View>
      
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.gerAlertButton}>
                  <Text style={styles.buttonText}>GER</Text>
                </TouchableOpacity>
      
                <View style={styles.marginSmallDimensionTop}></View>
      
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.ohaAlertButton}>
                  <Text style={styles.buttonText}>OHA</Text>
                </TouchableOpacity>
      
                <View style={styles.marginSmallDimensionTop}></View>
      
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.repAlertButton}>
                  <Text style={styles.buttonText}>REP</Text>
                </TouchableOpacity>
      
              </View>
      
            </View>
          );
        }
      }
      
      
      
      
      const styles = StyleSheet.create({
        container: {
      
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        
      
        },
      
        containerText: {
      
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
      
        },
      
        containerButtons: {
      
          marginLeft: 95,
          marginRight: 95,
      
        },
      
        text: {
          margin: 6,
          margin: 20,
          fontSize: 32,
          color: 'black',
          fontWeight: 'bold',
      
        },
      
        buttonContainer: {
          backgroundColor: '#2C903D',
          borderRadius: 8,
          padding: 10,
          margin: 20,
          height: 50,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center'
      
        },
      
        marginDimensionTop: {
      
          marginTop: 20,
      
        },
      
        marginSmallDimensionTop: {
      
          marginTop: 18,
      
        },
      
        buttonText: {
          fontSize: 15,
          color: '#ffffff',
          fontWeight: 'bold',
          //fontStyle: 'italic'
      
        },
      
        text: {
          margin: 6,
          margin: 20,
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
        },
      }); 