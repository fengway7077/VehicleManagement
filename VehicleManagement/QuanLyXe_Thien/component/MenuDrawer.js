import React, { Component } from 'react';
import {StyleSheet, View,TouchableOpacity,Image,Text} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer,DrawerItems, SafeAreaView,ScrollView } from 'react-navigation';
import { DRAWER_IMAGE ,MOTOBIKE_IMAGE,CUSTOMER_IMAGE,RENTAL_IMAGE,REPAIR_IMAGE, MESSAGE_IMAGE, CLOCK_IMAGE,ICONMENU_IMAGE,CALENDAR_IMAGE} from './imageExport.js';
import ManageCar from './ManageCar.js';
import ManageCustomer from './ManageCustomer.js';
import RentalHistory from './RentalHistory.js';
import RepairCarHistory from './RepairCarHistory.js';
import VehicleFees from './VehicleFees.js';
import VehicleStatus from './VehicleStatus.js';
import ListCar from './ListCar';
import ListCustomer from './ListCustomer';
import CalendarPickerContent from './CalendarPickerContent.js';
class MenuDrawer extends Component {
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        textAlignVertical: "center",
      },
      headerTintColor: 'white',
    }),
  },
});

const ListCar_Screen = createStackNavigator({
  Five: {
    screen: ListCar,
    navigationOptions: ({ navigation }) => ({
      title: 'ListCar',
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
      },
      headerTintColor: 'white',
    }),
  },
});

const ListCustomer_Screen = createStackNavigator({
  Five: {
    screen: ListCustomer,
    navigationOptions: ({ navigation }) => ({
      title: 'ListCustomer',
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
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
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
      },
      headerTintColor: 'white',
    }),
  },
});

const CalendarPickerContent_Screen = createStackNavigator({
  Six: {
    screen: CalendarPickerContent,
    navigationOptions: ({ navigation }) => ({
      title: 'CalendarPicker',
      headerLeft: <MenuDrawer navigationProps={navigation} />,
      headerStyle: {
        backgroundColor:'#FF9800',
        textAlignVertical: "center",
      },
      headerTintColor: 'white',
    }),
  },
});

const headerMenuDrawer =(props) =>(
  <SafeAreaView style={styles.areaMenuView}>
    <View style={styles.menuView}>
        <Image source={ICONMENU_IMAGE} style={styles.iconMenu}/>
        <Text style={styles.textHeader}>Dịch Vụ Cho Thuê Xe</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

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

  ListCar: {
    screen: ListCar_Screen,
    navigationOptions: {
      drawerLabel: 'ListCar',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={MOTOBIKE_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },

  ListCustomer: {
    screen: ListCustomer_Screen,
    navigationOptions: {
      drawerLabel: 'ListCustomer',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={CUSTOMER_IMAGE}
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

  CalendarPickerContent: {
    screen: CalendarPickerContent_Screen,
    navigationOptions: {
      drawerLabel: 'CalendarPicker',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={CALENDAR_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },
},
{
  contentComponent:headerMenuDrawer
});
export default createAppContainer(DrawerNavigator_Screen);

const styles = StyleSheet.create({
  icon: {
      width: 25,
      height:25
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
  iconMenu: {
    width: 100,
    height:100
  },
  areaMenuView:{
    flex:1,
  },
  menuView:{
    height:150,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FF9800'
  },
  textHeader:{
    fontSize:18,
  }
})
