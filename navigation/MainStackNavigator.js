import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, Alert, Linking, View } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import GerBinOrderingForm from '../screens/GerBinOrderingForm'
import CheckList from '../screens/CheckList'



const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer>



            <Stack.Navigator
                initialRouteName='GerBinOrderingForm'

                screenOptions={{
                    gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#2C903D'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false
                }

                }



                headerMode='float'>


                <Stack.Screen name='GerBinOrderingForm' component={GerBinOrderingForm} options={({ navigation }) => ({
                    headerRight: () =>
                        <View style={{ margin: 5 }}>

                            <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle}
                                onPress={() => navigation.navigate('CheckList')}>
                                <Image source={require('../assets/menu32.png')}

                                    style={styles.FloatingButtonStyle2} />

                            </TouchableOpacity>

                            <View style={{
                                marginRight: 3
                            }}></View>
                        </View>
                    , title: 'T&G Global', headerLeft: () => null
                })} />

                <Stack.Screen name='CheckList' component={CheckList} options={{ title: 'T&G Global' }} />

            </Stack.Navigator>

        </NavigationContainer >



    )
}

const styles = StyleSheet.create({


    text: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 10
    },

    TouchableOpacityStyle11: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },


    TouchableOpacityStyle: {


        alignItems: 'center',
        justifyContent: 'center',
        right: 5,

    },

    FloatingButtonStyle2: {

        resizeMode: 'contain',
        width: 24,
        height: 24,
    },



    TouchableOpacityStyle2: {


        alignItems: 'center',
        justifyContent: 'center',
        right: 5,

    },


})



export default MainStackNavigator