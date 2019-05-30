import React, { Component } from 'react';
import {StyleSheet, View,TouchableOpacity,Image,Text} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer,DrawerItems, SafeAreaView,ScrollView } from 'react-navigation';
import { DRAWER_IMAGE ,VEHICLE1_IMAGE,MOTOBIKE_IMAGE,CUSTOMER_IMAGE,RENTAL_IMAGE,REPAIR_IMAGE, MESSAGE_IMAGE, CLOCK_IMAGE,ICONMENU_IMAGE,CALENDAR_IMAGE,REGISTER_IMAGE} from './imageExport.js';
import ManageVehicle from './ManageVehicle.js';
import ManageCustomer from './ManageCustomer.js';
import RentalHistory from './RentalHistory.js';
import RepairVehicleHistory from './RepairVehicleHistory.js';
import VehicleFees from './VehicleFees.js';
import VehicleStatus from './VehicleStatus.js';
import ListVehicle from './ListVehicle.js';
import ListCustomer from './ListCustomer.js';
import VehicleRegistration from './VehicleRegistration.js';
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

const ManageVehicle_Screen = createStackNavigator({
  
  First: {
    screen: ManageVehicle,
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

const RepairVehicleHistory_Screen = createStackNavigator({
  Four: {
    screen: RepairVehicleHistory,
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

const ListVehicle_Screen = createStackNavigator({
  Five: {
    screen: ListVehicle,
    navigationOptions: ({ navigation }) => ({
      title: 'ListVehicle',
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
  ListCustomer: {
    screen: ListCustomer,
    navigationOptions:{
      header:null
    }
    // navigationOptions: ({ navigation }) => ({
    //   title: 'ListCustomer',
    //   headerLeft: <TouchableOpacity
    //   onPress={() => navigation.navigate('MenuDrawer')} ><Text>Go</Text></TouchableOpacity>,
    //   headerStyle: {
    //     backgroundColor:'#FF9800',
    //     textAlignVertical: "center",
    //   },
    //   headerTintColor: 'white',
    // }),
  },
//   ManageCustomer: {
//     screen: ManageCustomer,
//     navigationOptions: ({ navigation }) => ({
//       title: 'ManageCustomer',
//       headerLeft: <TouchableOpacity
//       onPress={() => navigation.navigate('ListCustomer')} ><Text>Back</Text></TouchableOpacity>,
//       headerStyle: {
//         backgroundColor:'#FF9800',
//         textAlignVertical: "center",
//       },
//       headerTintColor: 'white',
//     }),
//   },
//   MenuDrawer: {
//     screen: ManageVehicle,
//     navigationOptions: ({ navigation }) => ({
//         title: 'Vehicle Information Management',
//         headerLeft: <MenuDrawer navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#FF9800',
//           textAlignVertical: "center",
//         },
//         headerTintColor: 'white',
//       }),
// },
},
// {
//     initialRouteName: 'ListCustomer',
// }
);

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

// const CalendarPickerContent_Screen = createStackNavigator({
//   Seven: {
//     screen: CalendarPickerContent,
//     navigationOptions: ({ navigation }) => ({
//       title: 'CalendarPicker',
//       headerLeft: <MenuDrawer navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor:'#FF9800',
//         textAlignVertical: "center",
//       },
//       headerTintColor: 'white',
//     }),
//   },
// });

const VehicleRegistration_Screen = createStackNavigator({
  Eight: {
    screen: VehicleRegistration,
    navigationOptions: ({ navigation }) => ({
      title: 'VehicleRegistration',
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
  ManageVehicle: {
    screen: ManageVehicle_Screen,
    navigationOptions: {
      drawerLabel: 'ManageVehicle',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={VEHICLE1_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    },
  },

  // ManageCustomer: {
  //   screen: ManageCustomer_Screen,
  //   navigationOptions: {
  //     drawerLabel: 'ManageCustomer',
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={CUSTOMER_IMAGE}
  //         style={[styles.icon, {tintColor: tintColor}]}
  //       />
  //     ),
  //   },
  // },

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

  RepairVehicleHistory: {
    screen: RepairVehicleHistory_Screen,
    navigationOptions: {
      drawerLabel: 'RepairVehicleHistory',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={REPAIR_IMAGE}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),  
    },
  },

  ListVehicle: {
    screen: ListVehicle_Screen,
    navigationOptions: {
      drawerLabel: 'ListVehicle',
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

  // CalendarPickerContent: {
  //   screen: CalendarPickerContent_Screen,
  //   navigationOptions: {
  //     drawerLabel: 'CalendarPicker',
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={CALENDAR_IMAGE}
  //         style={[styles.icon, {tintColor: tintColor}]}
  //       />
  //     ),  
  //   },
  // },

  VehicleRegistration: {
    screen: VehicleRegistration_Screen,
    navigationOptions: {
      drawerLabel: 'VehicleRegistration',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={REGISTER_IMAGE}
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
