import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  ImageBackground,
  Alert,
  useEffect,
  ActivityIndicator,
  Platform,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Realm from 'realm';

var houseSelected;
let realm;
var ID;
var random = 0;

export default class GerBinOrderingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      visibility: false,
      visibility2: false,
      pickupDateTime: '',
      front15MGeneral: 0,
      front15MGreen: 0,
      front30MGeneral: 0,
      front30MGreen: 0,
      back15MGeneral: 0,
      back15MGreen: 0,
      back30MGeneral: 0,
      back30MGreen: 0,
      orderNumber: '',
      isLoading: false,
      pickupFront: 'No',
      pickupBack: 'No',
      siteAddress: 'GER Covered Crops, 153 Harrisville Road, Tuakau 2121',
    };

    realm = new Realm({path: 'BinOrderingOfflineDB.realm'});
  }

  handleBackButton = () => {
    BackHandler.exitApp();
  };

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };

  componentDidMount() {
    Toast.show(
      'Due to plant disease, green waste bin orders are paused. Please order general waste bins instead.',
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  //-------------------------------------------------------------------------------------------------------------

  generateOrderNumber = () => {
    random = Math.floor(10000 + Math.random() * 90000);

    console.log('order Number : ' + random.toString());

    this.setState({orderNumber: random.toString()});
    console.log('Number generated' + this.state.orderNumber);

    setTimeout(() => {
      this.saveformToDbAlert();
    }, 1000);
  };

  //-------------------------------------------------------------------------------------------------------------

  //DATE TIME PICKER FOR TEXTINPUT

  hideDatePicker = () => {
    this.setState({visibility: false});
  };

  handleConfirm = (datetime) => {
    this.setState({
      pickupDateTime: moment(datetime).format('Do MMMM YYYY , HH:mm'),
    });

    this.hideDatePicker();
  };

  onPressCancel = () => {
    this.setState({visibility: false});
  };

  onPressButton = () => {
    this.setState({visibility: true});
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //DATE TIME PICKER FOR CLEAR BUTTON

  hideDatePicker2 = () => {
    this.setState({visibility2: false});
  };

  handleConfirm2 = (datetime) => {
    this.setState({
      pickupDateTime: moment(datetime).format('Do MMMM YYYY , HH:mm'),
    });
    this.hideDatePicker2();
  };

  onPressCancel2 = () => {
    this.setState({visibility2: false});
  };

  onPressButton2 = () => {
    this.setState({visibility2: true});
  };

  clearText = () => {
    this.setState({visibility2: true, pickupDateTime: ''});
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT BACK SIDE GER 15M GENERAL WASTE

  incrementBack15General = () => {
    if (this.state.back15MGeneral === 0) {
      Alert.alert(
        'Alert!!',
        'Are you sure you want to order 15M General bin ?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () =>
              this.setState({
                back15MGeneral: this.state.back15MGeneral + 1,
                pickupBack: 'Yes',
              }),
          },
        ],
      );

      Keyboard.dismiss();
    } else {
      this.setState({
        back15MGeneral: this.state.back15MGeneral + 1,
        pickupBack: 'Yes',
      });
    }
  };

  decrementBack15General = () => {
    if (this.state.back15MGeneral !== 0) {
      this.setState({
        back15MGeneral: this.state.back15MGeneral - 1,
        pickupBack: 'Yes',
      });
    } else {
      this.setState({
        back15MGeneral: this.state.back15MGeneral,
        pickupBack: 'No',
      });
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT BACK SIDE GER 15M GREEN WASTE

  incrementBack15Green = () => {
    Toast.CENTER(
      'Due to plant disease, green waste bin orders are paused. Please order general waste bins instead.',
    );

    //this.setState({ back15MGreen: this.state.back15MGreen + 1, pickupBack: 'Yes' });
  };

  decrementBack15Green = () => {
    Toast.CENTER(
      'Due to plant disease, green waste bin orders are paused. Please order general waste bins instead.',
    );

    /*if (this.state.back15MGreen !== 0) {

      this.setState({ back15MGreen: this.state.back15MGreen - 1, pickupBack: 'Yes' });

    } else {

      this.setState({ back15MGreen: this.state.back15MGreen, pickupBack: 'No' });


    }*/
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT BACK SIDE GER 30M GREEN WASTE

  incrementBack30Green = () => {
    this.setState({
      back30MGreen: this.state.back30MGreen + 1,
      pickupBack: 'Yes',
    });
  };

  decrementBack30Green = () => {
    if (this.state.back30MGreen !== 0) {
      this.setState({
        back30MGreen: this.state.back30MGreen - 1,
        pickupBack: 'Yes',
      });
    } else {
      this.setState({back30MGreen: this.state.back30MGreen, pickupBack: 'No'});
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT BACK SIDE GER 30M GENERAL WASTE

  incrementBack30General = () => {
    if (this.state.back30MGeneral === 0) {
      Alert.alert(
        'Alert!!',
        'Are you sure you want to order 30M General bin ?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () =>
              this.setState({
                back30MGeneral: this.state.back30MGeneral + 1,
                pickupBack: 'Yes',
              }),
          },
        ],
      );

      Keyboard.dismiss();
    } else {
      this.setState({
        back30MGeneral: this.state.back30MGeneral + 1,
        pickupBack: 'Yes',
      });
    }
  };

  decrementBack30General = () => {
    if (this.state.back30MGeneral !== 0) {
      this.setState({
        back30MGeneral: this.state.back30MGeneral - 1,
        pickupBack: 'Yes',
      });
    } else {
      this.setState({
        back30MGeneral: this.state.back30MGeneral,
        pickupBack: 'No',
      });
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT FRONT SIDE GER 15M GENERAL WASTE

  incrementFront15General = () => {
    if (this.state.front15MGeneral === 0) {
      Alert.alert(
        'Alert!!',
        'Are you sure you want to order 15M General bin ?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () =>
              this.setState({
                front15MGeneral: this.state.front15MGeneral + 1,
                pickupFront: 'Yes',
              }),
          },
        ],
      );
      Keyboard.dismiss();
    } else {
      this.setState({
        front15MGeneral: this.state.front15MGeneral + 1,
        pickupFront: 'Yes',
      });
    }
  };

  decrementFront15General = () => {
    if (this.state.front15MGeneral !== 0) {
      this.setState({
        front15MGeneral: this.state.front15MGeneral - 1,
        pickupFront: 'Yes',
      });
    } else {
      this.setState({
        front15MGeneral: this.state.front15MGeneral,
        pickupFront: 'No',
      });
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT FRONT SIDE GER 15M GREEN WASTE

  incrementFront15Green = () => {
    this.setState({
      front15MGreen: this.state.front15MGreen + 1,
      pickupFront: 'Yes',
    });
  };

  decrementFront15Green = () => {
    if (this.state.front15MGreen !== 0) {
      this.setState({
        front15MGreen: this.state.front15MGreen - 1,
        pickupFront: 'Yes',
      });
    } else {
      this.setState({
        front15MGreen: this.state.front15MGreen,
        pickupFront: 'No',
      });
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT FRONT SIDE GER 30M GREEN WASTE

  incrementFront30Green = () => {
    this.setState({
      front30MGreen: this.state.front30MGreen + 1,
      pickupFront: 'Yes',
    });
  };

  decrementFront30Green = () => {
    if (this.state.front30MGreen !== 0) {
      this.setState({
        front30MGreen: this.state.front30MGreen - 1,
        pickupFront: 'Yes',
      });
    } else {
      this.setState({
        front30MGreen: this.state.front30MGreen,
        pickupFront: 'Yes',
      });
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  //INCREMENT AND DECREMENT FRONT SIDE GER 30M GENERAL WASTE

  incrementFront30General = () => {
    if (this.state.front30MGeneral === 0) {
      Alert.alert(
        'Alert!!',
        'Are you sure you want to order 30M General bin ?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () =>
              this.setState({
                front30MGeneral: this.state.front30MGeneral + 1,
                pickupFront: 'Yes',
              }),
          },
        ],
      );
      Keyboard.dismiss();
    } else {
      this.setState({
        front30MGeneral: this.state.front30MGeneral + 1,
        pickupFront: 'Yes',
      });
    }
  };

  decrementFront30General = () => {
    if (this.state.front30MGeneral !== 0) {
      this.setState({front30MGeneral: this.state.front30MGeneral - 1});
    } else {
      this.setState({front30MGeneral: this.state.front30MGeneral});
    }
  };

  //END

  //-------------------------------------------------------------------------------------------------------------

  saveformToDbAlert = () => {
    console.log(
      'PICKUP FRONT : ' +
        this.state.pickupFront +
        ' PICKUP BACK : ' +
        this.state.pickupBack,
    );

    if (this.state.pickupBack === 'Yes' && this.state.pickupFront === 'No') {
      Alert.alert(
        'Bin Ordering Summary - ' + random,
        'Pickup location : ' +
          this.state.siteAddress +
          '\nPickup Date and Time : ' +
          this.state.pickupDateTime +
          '\nBack pickup : ' +
          this.state.pickupBack +
          '\n15M General waste : ' +
          this.state.back15MGeneral +
          ' Bins' +
          '\n15M Green waste : ' +
          this.state.back15MGreen +
          ' Bins' +
          '\n30M General waste : ' +
          this.state.back30MGeneral +
          ' Bins' +
          '\n30M Green waste : ' +
          this.state.back30MGreen +
          ' Bins',
        [
          {text: 'No', style: 'cancel'},
          {text: 'Yes', onPress: () => this.saveFormToDb()},
        ],
        {
          cancelable: false,
        },
      );
    } else if (
      this.state.pickupFront === 'Yes' &&
      this.state.pickupBack === 'No'
    ) {
      Alert.alert(
        'Bin Ordering Summary - ' + random,
        'Pickup location : ' +
          this.state.siteAddress +
          '\nPickup Date and Time : ' +
          this.state.pickupDateTime +
          '\nFront pickup : ' +
          this.state.pickupFront +
          '\n15M General waste : ' +
          this.state.front15MGeneral +
          ' Bins' +
          '\n15M Green waste : ' +
          this.state.front15MGreen +
          ' Bins' +
          '\n30M General waste : ' +
          this.state.front30MGeneral +
          ' Bins' +
          '\n30M Green waste : ' +
          this.state.front30MGreen +
          ' Bins',
        [
          {text: 'No', style: 'cancel'},
          {text: 'Yes', onPress: () => this.saveFormToDb()},
        ],
        {
          cancelable: false,
        },
      );
    } else if (
      this.state.pickupFront === 'Yes' &&
      this.state.pickupBack === 'Yes'
    ) {
      Alert.alert(
        'Bin Ordering Summary - ' + random,
        'Pickup location : ' +
          this.state.siteAddress +
          '\nPickup Date and Time : ' +
          this.state.pickupDateTime +
          '\nBack pickup : ' +
          this.state.pickupBack +
          '\nFront pickup : ' +
          this.state.pickupFront +
          '\nBack 15M General waste : ' +
          this.state.back15MGeneral +
          ' Bins' +
          '\nBack 15M Green waste : ' +
          this.state.back15MGreen +
          ' Bins' +
          '\nBack 30M General waste : ' +
          this.state.back30MGeneral +
          ' Bins' +
          '\nBack 30M Green waste : ' +
          this.state.back30MGreen +
          ' Bins' +
          '\nFront 15M General waste : ' +
          this.state.front15MGeneral +
          ' Bins' +
          '\nFront 15M Green waste : ' +
          this.state.front15MGreen +
          ' Bins' +
          '\nFront 30M General waste : ' +
          this.state.front30MGeneral +
          ' Bins' +
          '\nFront 30M Green waste : ' +
          this.state.front30MGreen +
          ' Bins',
        [
          {text: 'No', style: 'cancel'},
          {text: 'Yes', onPress: () => this.saveFormToDb()},
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  //-------------------------------------------------------------------------------------------------------------

  saveFormToDb = () => {
    var that = this;
    this.setState({isLoading: true});

    const {pickupDateTime} = this.state;

    if (pickupDateTime) {
      realm.write(() => {
        ID =
          realm.objects('bin_ordering_offline_table').sorted('entry_id', true)
            .length > 0
            ? realm
                .objects('bin_ordering_offline_table')
                .sorted('entry_id', true)[0].entry_id + 1
            : 1;
        realm.create('bin_ordering_offline_table', {
          entry_id: ID,
          site_name: that.state.siteAddress,
          pickup_Front: that.state.pickupFront,
          pickup_Back: that.state.pickupBack,
          size15Front_general: that.state.front15MGeneral.toString(),
          size15Front_green: that.state.front15MGreen.toString(),
          size30Front_general: that.state.front30MGeneral.toString(),
          size30Front_green: that.state.front30MGreen.toString(),
          size15Back_general: that.state.back15MGeneral.toString(),
          size15Back_green: that.state.back15MGreen.toString(),
          size30Back_general: that.state.back30MGeneral.toString(),
          size30Back_green: that.state.back30MGreen.toString(),
          pickup_date_time: that.state.pickupDateTime.toString(),
          order_number: random.toString(),
          data_send: 'Y',
        });
      });

      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbwPKZ_fuVzitdBwMa6od4qVJsq0Sr1c6RP5CLb74mWJRWZrboC0IrwPxZWFZ3Qoe6tf/exec';
      const url = `${scriptUrl}?
      callback=ctrlq&action=${'doPostData'}&entry_id=${ID}&site_name=${
        that.state.siteAddress
      }&pickup_date_time=${that.state.pickupDateTime}&pickup_Front=${
        that.state.pickupFront
      }&pickup_Back=${that.state.pickupBack}&size15Front_general=${
        that.state.front15MGeneral
      }&size15Front_green=${that.state.front15MGreen}&size30Front_general=${
        that.state.front30MGeneral
      }&size30Front_green=${that.state.front30MGreen}&size15Back_general=${
        that.state.back15MGeneral
      }&size15Back_green=${that.state.back15MGreen}&size30Back_general=${
        that.state.back30MGeneral
      }&size30Back_green=${that.state.back30MGreen}&order_number=${random}`;

      console.log('URL : ' + url);
      fetch(url, {mode: 'no-cors'}).then((response) => {
        if (response.status === 200) {
          this.setState({
            pickupDateTime: '',
            front15MGeneral: 0,
            front15MGreen: 0,
            front30MGeneral: 0,
            front30MGreen: 0,
            back15MGeneral: 0,
            back15MGreen: 0,
            back30MGeneral: 0,
            back30MGreen: 0,
            orderNumber: '',
            pickupFront: 'No',
            pickupBack: 'No',
          });

          Toast.show('Form Submitted successfully');
        }
      });

      this.setState({isLoading: false, orderNumber: ''});
    } else {
      this.setState({isLoading: false});
      alert('Please select pickup date and time');
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background2.png')}
          style={styles.backgroundImage}>
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.headerText}>GER Bin Ordering Form</Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.direction}>
              <Text style={styles.titleHeadingText}>
                Select Pickup Date And Time
              </Text>

              <Text
                style={styles.clearHeadingText}
                onPress={() => this.clearText()}>
                Change
              </Text>
              <DateTimePickerModal
                isVisible={this.state.visibility2}
                onConfirm={this.handleConfirm2}
                onCancel={this.onPressCancel2}
                mode="datetime"
                is24Hour={false}
              />
            </View>
            <View style={styles.marginDimension}></View>

            <View style={styles.borderEdit}>
              <TextInput
                style={styles.textInputStyle}
                autoCapitalize="none"
                multiline={false}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={this.onPressButton}
                onPress={this.onPressButton}
                showSoftInputOnFocus={false}
                value={this.state.pickupDateTime}
                onFocus={this.onPressButton}
                onSubmitEditing={() => {
                  this.refsamp.focus();
                }}
              />
              <DateTimePickerModal
                isVisible={this.state.visibility}
                onConfirm={this.handleConfirm}
                onCancel={this.onPressCancel}
                mode="datetime"
                is24Hour={false}
              />
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <Text style={styles.headerText2}>Back Side of GER</Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension10}></View>

            <Text style={styles.headerTextGreen}>
              Select quantity of bins required
            </Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.rowContainerBinSize}>
              <Text style={styles.binSizeText}>15M</Text>

              <Text style={styles.binSizeText}>30M</Text>
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.rowContainerBinSize}>
              <View style={styles.rowContainerimages}>
                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGeneral}>
                    General{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    onPress={() => this.incrementBack15General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upRed.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => this.decrementBack15General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downRed.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGeneralBins}>
                    {this.state.back15MGeneral} bins
                  </Text>
                </View>

                <View style={styles.marginDimension5}></View>

                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGreenWaste}>
                    Green{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.incrementBack15Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upGreen.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.decrementBack15Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downGreen.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGreenWasteBins}>
                    {this.state.back15MGreen} bins
                  </Text>
                </View>
              </View>

              <View style={styles.rowContainerimages}>
                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGeneral}>
                    General{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    onPress={() => this.incrementBack30General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upRed.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => this.decrementBack30General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downRed.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGeneralBins}>
                    {this.state.back30MGeneral} bins
                  </Text>
                </View>

                <View style={styles.marginDimension5}></View>

                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGreenWaste}>
                    Green{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.incrementBack30Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upGreen.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.decrementBack30Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downGreen.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGreenWasteBins}>
                    {this.state.back30MGreen} bins
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.dim}></View>

            <Text style={styles.headerText2}>Front Side of GER</Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension10}></View>

            <Text style={styles.headerTextGreen}>
              Select quantity of bins required
            </Text>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension}></View>

            <View style={styles.rowContainerBinSize}>
              <Text style={styles.binSizeText}>15M</Text>

              <Text style={styles.binSizeText}>30M</Text>
            </View>

            <View style={styles.marginDimension}></View>

            <View style={styles.rowContainerBinSize}>
              <View style={styles.rowContainerimages}>
                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGeneral}>
                    General{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    onPress={() => this.incrementFront15General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upRed.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => this.decrementFront15General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downRed.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGeneralBins}>
                    {this.state.front15MGeneral} bins
                  </Text>
                </View>

                <View style={styles.marginDimension5}></View>

                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGreenWaste}>
                    Green{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.incrementFront15Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upGreen.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.decrementFront15Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downGreen.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGreenWasteBins}>
                    {this.state.front15MGreen} bins
                  </Text>
                </View>
              </View>

              <View style={styles.rowContainerimages}>
                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGeneral}>
                    General{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    onPress={() => this.incrementFront30General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upRed.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => this.decrementFront30General()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downRed.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGeneralBins}>
                    {this.state.front30MGeneral} bins
                  </Text>
                </View>

                <View style={styles.marginDimension5}></View>

                <View style={styles.rowContainerBinSizeColumn}>
                  <Text style={styles.headerTextGreenWaste}>
                    Green{'\n'}waste
                  </Text>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.incrementFront30Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/upGreen.png')}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    disabled={true}
                    onPress={() => this.decrementFront30Green()}>
                    <Image
                      style={styles.imagestyle}
                      source={require('../assets/downGreen.png')}
                    />
                  </TouchableHighlight>

                  <Text style={styles.headerTextGreenWasteBins}>
                    {this.state.front30MGreen} bins
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.dim40}></View>

            {this.state.orderNumber !== '' ? (
              <Text style={styles.titleHeadingText2}>
                Order Number : {this.state.orderNumber}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.generateOrderNumber()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.marginDimension}></View>

            <View style={styles.marginDimension10}></View>
          </ScrollView>
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
    borderColor: '#fff',
  },

  imagestyle: {
    width: 60,
    height: 93,
  },

  binSizeText: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    backgroundColor: '#c4c4c4',
    fontWeight: 'bold',
  },

  rowContainerBinSize: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  rowContainerBinSizeColumn: {
    flexDirection: 'column',
    //justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  rowContainerimages: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  rowContainerimages2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  formContainer: {
    //backgroundColor: 'rgba(192,192,192,0.55)',
    //borderRadius: 5,
    padding: 5,
    margin: 10,
    height: '100%',
    width: '100%',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
  },

  titleHeadingText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  titleHeadingText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  clearHeadingText: {
    color: 'red',
    fontSize: 13,
    marginRight: 15,
  },

  marginDimension: {
    marginTop: 16,
  },

  dim: {
    marginTop: 80,
  },

  dim40: {
    marginTop: 40,
  },

  marginDimension5: {
    marginRight: 11,
  },

  marginDimension4: {
    marginRight: 4,
  },

  marginDimension10: {
    marginTop: 10,
  },

  marginDimension20: {
    marginTop: 20,
  },

  textInputStyle: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,
    marginRight: 20,
    height: 50,
    backgroundColor: '#ffffff',
  },

  borderEdit: {
    marginTop: 8,
    marginRight: 16,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },

  buttonContainerTextInput: {
    borderRadius: 5,
    fontSize: 15,
    color: 'black',
    height: 50,
    backgroundColor: '#ffffff',
  },

  headerText: {
    color: '#000000',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },

  headerText2: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textDecorationLine: 'underline',
  },

  headerTextGreen: {
    color: '#2C903D',
    fontSize: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontStyle: 'italic',
  },

  headerTextGeneral: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  headerTextGeneralBins: {
    marginTop: 5,
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  headerTextGeneral2: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  headerTextGreenWaste: {
    color: '#2C903D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  headerTextGreenWasteBins: {
    marginTop: 5,
    color: '#2C903D',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },

  buttonContainer1: {
    //backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    backgroundColor: 'rgba(0,128,0,0.65)',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    height: 55,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 23,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    resizeMode: 'cover',
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
});
//export default SiteSelection
