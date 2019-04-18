import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,FlatList,TextInput,Button, TouchableOpacity} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import RentalHistory from './RentalHistory';
import {SEARCH_IMAGE} from './imageExport'
export default class VehicleFees extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            imageVehicle: '' ,
            customerName: '',
            phone:'',
            dateTime:'',
            search: '',
        };
    }

    componentDidMount(){
        return fetch('http://192.168.11.128:3333/vehiclerentalhistory/getListVehiclerental')
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
        }, function(){

        });

        })
        .catch((error) =>{
        console.error(error);
        });
    }    

    updateSearch = search => {
        this.setState({ search });
        fetch('http:///192.168.56.1:3000/database', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehiclename": "a"
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    render(){
        const { search } = this.state;
        return(
            <ScrollView style={styles.mainContainer}>
                {/* <View style={styles.headerContent}>
                    <Text style={styles.textStyle}>List Of Vehicles Coming Soon To Get Money</Text>
                </View> */}
                <View style={styles.contentSearch}>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                        <TextInput
                            style={styles.searchStyle}
                            placeholder="Nhập Loại Xe Muốn Tìm Kiếm..."
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                </View>

                <View style={styles.bodyContent}>
                    <FlatList
                        style={styles.flatStyle}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                            onPress={() => this.props.navigation.navigate('RentalHistory', {item: item})}>
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            />
                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên KH : {item.fullname}</Text>
                                            <Text style={styles.generalStyle}>SDT : {item.phone}</Text>
                                            <Text style={styles.generalStyle}>Ngày Thu Tiền : {item.payday}</Text>
                                        </View>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </ScrollView>
        );
    }
}

// const RootContent = createStackNavigator(
// {
//     VehicleFees: {
//         screen: VehicleFees,
//         navigationOptions: ({ navigation }) => ({
//             title: 'List Of VehicleFees',
//             headerStyle: {
//                 width:'100%',
//                 textAlign: 'center',
//                 color: 'white',
//                 marginBottom: 5,
//                 backgroundColor:'green',
//                 textAlignVertical: "center",
//                 fontSize:11,
//                 height:50,
//                 marginBottom:20
//             },
//             headerTintColor: 'white',
//         }),
//     },
//     RentalHistory: {
//         screen: RentalHistory,
//         navigationOptions: ({ navigation }) => ({
//             title: 'Manage Car Rental History',
//             headerStyle: {
//                 width:'100%',
//                 textAlign: 'center',
//                 color: 'white',
//                 marginBottom: 5,
//                 backgroundColor:'green',
//                 textAlignVertical: "center",
//                 fontSize:11,
//                 height:50,
//                 marginBottom:20
//             },
//             headerTintColor: 'white',
//         }),
//     },
// },
// {
//     initialRouteName: 'VehicleFees',
// }
// );
  
// const AppContainer = createAppContainer(RootContent);
  
// export default class App extends React.Component {
//     render() {
//         return <AppContainer />;
//     }
// }

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        flex: 1,
    },
    headerContent:
    {
        alignItems:'center'
    },
    bodyContent:
    {
        width:'100%',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    flatStyle:{
        width:'100%',
    },
    bodyListView:{
        width:'85%',
        alignItems: 'center',
        justifyContent:'center',
    },
    touchableStyle:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listViewChild:{
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:2,
    },
    generalStyle:{
        color: 'white',
        marginBottom: 10,
        textAlignVertical: "center",
        fontSize:16,
    },
    listViewChildLeft:{
        width:'40%',
    },
    listViewChildRight:{
        height:100,
        width:'60%',
        backgroundColor:'green',
    },
    contentSearch:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:50
    },
    contentChildSearch:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderWidth:1,
        marginBottom:8,
        borderRadius:10,
        borderColor:'black',
    },
    iconInputSearch:{
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    searchStyle:{
        flex:1,
    },
    imageStyle: {
        height:100,
        width:'100%',
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