/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View,Image,TouchableOpacity} from 'react-native';
import ManageCar from './component/ManageCar.js';
import ManageCustomer from './component/ManageCustomer.js';
import RentalHistory from './component/RentalHistory.js';
import RepairCarHistory from './component/RepairCarHistory.js';
import VehicleStatus from './component/VehicleStatus.js';
import VehicleFees from './component/VehicleFees.js';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { DRAWER_IMAGE ,MOTOBIKE_IMAGE,CUSTOMER_IMAGE,RENTAL_IMAGE,REPAIR_IMAGE, MESSAGE_IMAGE, CLOCK_IMAGE,ICONMENU_IMAGE} from './component/imageExport.js';

import CalendarPicker1 from './component/CalendarPicker1.js';

class App extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={DRAWER_IMAGE}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    
    );
  }
}

const ManageCar_Screen = createStackNavigator({
  First: {
    screen: ManageCar,
    navigationOptions: ({ navigation }) => ({
      title: 'Vehicle Information Management',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});

const ManageCustomer_Screen = createStackNavigator({
  Second: {
    screen: ManageCustomer,
    navigationOptions: ({ navigation }) => ({
      title: 'Customer Information Management',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});

const RentalHistory_Screen = createStackNavigator({
  Third: {
    screen: RentalHistory,
    navigationOptions: ({ navigation }) => ({
      title: 'Manage Car Rental History',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
        marginBottom:20
    },
      headerTintColor: 'white',
    }),
  },
});

const RepairCarHistory_Screen = createStackNavigator({
  Four: {
    screen: RepairCarHistory,
    navigationOptions: ({ navigation }) => ({
      title: 'Manage Car Repair History',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});

const VehicleFees_Screen = createStackNavigator({
  Five: {
    screen: VehicleFees,
    navigationOptions: ({ navigation }) => ({
      title: 'VehicleFees',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});

const VehicleStatus_Screen = createStackNavigator({
  Six: {
    screen: VehicleStatus,
    navigationOptions: ({ navigation }) => ({
      title: 'VehicleStatus',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});
//test
const CalendarPicker1_Screen = createStackNavigator({
  Seven: {
    screen: CalendarPicker1,
    navigationOptions: ({ navigation }) => ({
      title: 'CalendarPicker',
      headerLeft: <App navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
        marginBottom:20
      },
      headerTintColor: 'white',
    }),
  },
});
//test
const DrawerNavigator_Screen = createDrawerNavigator({
  ManageCar: {
    screen: ManageCar_Screen,
    navigationOptions: {
      drawerLabel: 'ManageCar',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={MOTOBIKE_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    },
  },

  ManageCustomer: {
    screen: ManageCustomer_Screen,
    navigationOptions: {
      drawerLabel: 'ManageCustomer',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={CUSTOMER_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    },
  },

  RentalHistory: {
    screen: RentalHistory_Screen,
    navigationOptions: {
      drawerLabel: 'RentalHistory',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={RENTAL_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    },
  },

  RepairCarHistory: {
    screen: RepairCarHistory_Screen,
    navigationOptions: {
      drawerLabel: 'RepairCarHistory',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={REPAIR_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },

  VehicleFees: {
    screen: VehicleFees_Screen,
    navigationOptions: {
      drawerLabel: 'VehicleFees',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={CLOCK_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },

  VehicleStatus: {
    screen: VehicleStatus_Screen,
    navigationOptions: {
      drawerLabel: 'VehicleStatus',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={MESSAGE_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },
  //test
  CalendarPicker1: {
    screen: CalendarPicker1_Screen,
    navigationOptions: {
      drawerLabel: 'CalendarPicker',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={MESSAGE_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },
  //test

});



export default createAppContainer(DrawerNavigator_Screen);

const styles = StyleSheet.create({
  icon: {
      width: 25,
      height:25
  },
  iconMenu: {
    width: 40,
    height:40
  },
  textStyle: {
    width:'100%',
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    backgroundColor:'green',
    textAlignVertical: "center",
    fontSize:20,
    height:50,
    marginBottom:20
  },
})


