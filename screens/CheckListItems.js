import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ImageBackground, Image, ActivityIndicator, SafeAreaView, Alert } from 'react-native'
import { ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';



export default class CheckListItems extends Component {


    constructor() {
        super();
        this.state = {

            pickup_Back: '',
            pickup_Front: '',
            pickup_date_time: '',
            site_name: '',
            size15Back_general: '',
            size15Back_green: '',
            size15Front_general: '',
            size15Front_green: '',
            size30Back_general: '',
            size30Back_green: '',
            size30Front_general: '',
            size30Front_green: '',
            orderNum: '',

        };
    }


    componentDidMount() {


        this.setState({
            orderNum: this.props.route.params.invoice,
            pickup_Back: this.props.route.params.pickupBack,
            pickup_Front: this.props.route.params.pickupFront,
            pickup_date_time: this.props.route.params.dateTime,
            site_name: this.props.route.params.address,
            size15Back_general: this.props.route.params.back15General,
            size15Back_green: this.props.route.params.back15Green,
            size15Front_general: this.props.route.params.front15General,
            size15Front_green: this.props.route.params.front15Green,
            size30Back_general: this.props.route.params.back30General,
            size30Back_green: this.props.route.params.back30Green,
            size30Front_general: this.props.route.params.front30General,
            size30Front_green: this.props.route.params.front30Green,

        })

        console.log("num : "+this.state.orderNum);

    }






    render() {

        return (
            <ImageBackground source={require('../assets/background2.png')} style={styles.backgroundImage}>

                <ScrollView>
                    <Card style={styles.container}>
                        <View style={styles.subContainer}>

                           
                            <View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Pickup Date Time :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.pickup_date_time}</Text>
                            </View>
                            <View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Pickup Address :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.site_name}</Text>
                            </View>

                            {this.state.pickup_Back !== 'No' ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Pickup Location :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>Back of Site</Text>
                            </View>) : null}

                            {this.state.pickup_Front !== 'No' ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Pickup Location :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>Front of Site</Text>
                            </View>) : null}

                            {this.state.size15Back_general !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#FE6768'}}>Back 15M General Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size15Back_general} Bins</Text>
                            </View>) : null}

                            {this.state.size15Back_green !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#FE6768'}}>Back 15M Green Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size15Back_green} Bins</Text>
                            </View>) : null}

                            {this.state.size15Front_general !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#5973ff' }}>Front 15M General Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size15Front_general} Bins</Text>
                            </View>) : null}

                            {this.state.size15Front_green !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#5973ff'}}>Front 15M Green Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size15Front_green} Bins</Text>
                            </View>) : null}

                            {this.state.size30Back_general !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#FE6768'}}>Back 30M General Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size30Back_general} Bins</Text>
                            </View>) : null}

                            {this.state.size30Back_green !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#FE6768'}}>Back 30M Green Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size30Back_green} Bins</Text>
                            </View>) : null}

                            {this.state.size30Front_general !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#5973ff'}}>Front 30M general Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size30Front_general} Bins</Text>
                            </View>) : null}

                            {this.state.size30Front_green !== 0 ? (<View style={styles.directions}>
                                <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' , color: '#5973ff'}}>Front 30M Green Bins :  </Text>
                                <Text style={{ fontSize: 17, marginTop: 10, flexShrink: 1 }}>{this.state.size30Front_green} Bins</Text>
                            </View>) : null}



                        </View>

                    </Card>
                </ScrollView>
            </ImageBackground>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },

    directions: {

        flexDirection: 'row'

    },
    TouchableOpacityStyle: {

        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 5,
        bottom: 12,
    },
    subContainer: {
        flex: 1,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'red',


    },

    FloatingButtonStyle: {

        resizeMode: 'contain',
        marginLeft: 15,

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

    head: {
        height: 50,
        backgroundColor: '#808B97'
    },

    headerText2: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textDecorationLine: 'underline',
    },
    text: {
        margin: 6
    },
    row: {
        flexDirection: 'row'
    },

    textInput: {
        fontSize: 18,
        height: 50
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: 'black',
        fontSize: 18,
        borderWidth: 1
    },

    inputLayout: {
        marginTop: 16,
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },

    formContainer: {

        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: '100%',
        width: '91%'


    },
    buttonContainer1: {
        //backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonContainer: {
        //backgroundColor: 'rgba(0,128,0,0.65)',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontSize: 23,
        color: '#ffffff',
        fontWeight: 'bold',
        fontStyle: 'italic'

    },

    backgroundImage: {

        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    safeContainer: {
        flex: 1,
    },

    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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
    message: {
        padding: 16,
        fontSize: 18,
        color: 'red'
    }
})

