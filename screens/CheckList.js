import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, ImageBackground, Alert, useEffect, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
let realm;

var houseSelected;

var id = 0;

export default class CheckList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: '',
            FlatListItems: [],
            notFound: 'No Orders Found',
            isLoading: true,
            combinedData: [],
            query: '',
            fullData: [],
            err: '',
            searchTerm: ''
        }



    }


    componentDidMount() {

        //TESTING

        const scriptUrl = 'https://script.google.com/macros/s/AKfycbwPKZ_fuVzitdBwMa6od4qVJsq0Sr1c6RP5CLb74mWJRWZrboC0IrwPxZWFZ3Qoe6tf/exec';
        const url = `${scriptUrl}?callback=ctrlq&action=${'doGetData'}`;

        console.log("URL : " + url);
        fetch(url, { mode: 'no-cors' }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({ combinedData: responseJson, isLoading: false })
                console.log(this.state.combinedData);
                if (responseJson !== null) {

                    //this.renderEntryData();
                }

            }).catch((error) => {

                console.log(error);

                this.setState({ isLoading: false, err: error })
            });

        //END


    }

    renderEntryData = () => {




    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%'

                }}
            />
        );
    }


    GetFlatListItem(order_number, pickup_Back, pickup_Front, pickup_date_time, site_name, size15Back_general, size15Back_green, size15Front_general, size15Front_green, size30Back_general, size30Back_green, size30Front_general, size30Front_green) {

        this.props.navigation.navigate('CheckListItems', { invoice: order_number, pickupBack: pickup_Back, pickupFront: pickup_Front, dateTime: pickup_date_time, address: site_name, back15General: size15Back_general, back15Green: size15Back_green, front15General: size15Front_general, front15Green: size15Front_green, back30General: size30Back_general, back30Green: size30Back_green, front30General: size30Front_general, front30Green: size30Front_green })

    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }



        return (
            <View style={styles.container}>

                <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>

                    <View style={styles.container}>

            
                        <FlatList

                            data={this.state.combinedData.items.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))}

                            ItemSeparatorComponent={this.FlatListItemSeparator}

                            renderItem={({ item }) =>
                                <Text style={{
                                    padding: 16,
                                    fontSize: 18,
                                    height: 55,
                                    fontWeight: 'bold',

                                }} onPress={this.GetFlatListItem.bind(this, item.order_number, item.pickup_Back, item.pickup_Front, item.pickup_date_time, item.site_name, item.size15Back_general, item.size15Back_green, item.size15Front_general, item.size15Front_green, item.size30Back_general, item.size30Back_green, item.size30Front_general, item.size30Front_green)}> Order Number : <Text style={{
                                    color: 'red',

                                }}>  {item.order_number} </Text></Text>}

                            keyExtractor={(item, index) => index.toString()}

                        />


                    </View>


                </ImageBackground>
            </View>
        );
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
    sSearchBar: {
        paddingHorizontal: 10,
        margin: 10,
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 18
    },
    message: {
        padding: 16,
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    redColor: {

        color: 'red'

    },

    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    greenColor: {

        color: 'green'

    },
    submitText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        textAlign: 'center'

    },
    message: {
        padding: 16,
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyling: {

        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',

    },

    textStylingSpace: {

        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 5
    },
    container: {
        flex: 1,
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