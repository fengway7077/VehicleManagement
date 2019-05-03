import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SEARCH_IMAGE } from './imageExport.js'
import { Dropdown } from 'react-native-material-dropdown';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import RentalHistory from './RentalHistory.js';
import RepairVehicleHistory from './RepairVehicleHistory';
import { LinkVehicleStatus,LinkSearchVehicleStatus } from '../constLink/linkService.js'
class VehicleStatus extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            search: '',
            vehicleCode:'',
        };
        //
    }

    getDataVehicleStatus(){
        return fetch(LinkVehicleStatus)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
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

    componentDidMount(){
        this.getDataVehicleStatus();
    }    

    SearchVehicleStatus(){
        console.log("test");
        fetch(LinkSearchVehicleStatus, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehicletype": this.state.search,
                "status": this.state.status
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    DropdownListSearch = value => {
        if(value === 'Trống'){
            this.setState({
                status: 0,
            },this.SearchVehicleStatus.bind(this))
        }else if(value === 'Cho Thuê'){
            this.setState({
                status: 1,
            },this.SearchVehicleStatus.bind(this))
        }else if(value === 'Bảo Trì'){
            this.setState({
                status: 2,
            },this.SearchVehicleStatus.bind(this))
        }
    }
    
    UpdateSearch = search => {
        this.setState({ search },this.SearchVehicleStatus.bind(this));
    };
    render(){
        let data = [{
            value: 'Trống',
        }, {
            value: 'Cho Thuê',
        }, {
            value: 'Bảo Trì',
        }];
        const { search } = this.state;
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.contentSearch}>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                        <TextInput
                            style={styles.searchStyle}
                            placeholder="Nhập Loại Xe Muốn Tìm Kiếm..."
                            onChangeText={this.UpdateSearch}
                            value={search}
                        />
                    </View>
                    <View style={styles.pickerContent}>
                        <View style={styles.pickerContentChild}>
                            <Dropdown
                                label='Trạng Thái'
                                data={data}
                                onChangeText={this.DropdownListSearch}
                            />
                        </View>
                        <Text style={styles.spaceRight}></Text>
                    </View>
                    
                </View>
               
                <View style={styles.bodyContent}>
                    <FlatList
                        style={styles.flatStyle}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                            onPress={() => item.status === 2 ? navigate('RepairVehicleHistory',{ 
                                params: { 
                                    item,
                                    reFetchVehicleStatus: (() => {
                                        this.getDataVehicleStatus()
                                    }).bind(this)
                                } 
                            }):
                            navigate('RentalHistory',{ 
                                params: { 
                                    item,
                                    reFetchVehicleStatus: (() => {
                                        this.getDataVehicleStatus()
                                    }).bind(this)
                                } 
                            })}>
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            />
                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên Xe : {item.vehiclename}</Text>
                                            <Text style={styles.generalStyle}>Giá : {item.rentalprice}</Text>
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.status=== 0 ?'Trống':item.status=== 1 ?'Cho Thuê':'Bảo Trì'}</Text>
                                        </View>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={({customercode}, index) => customercode.toString()}
                    />
                </View>
            </ScrollView>
        );
    }
}

const RootContent = createStackNavigator(
{
    VehicleStatus: {
        screen: VehicleStatus,
        navigationOptions:{
            title: 'List Of VehicleStatus',
            headerStyle: {
                width:'100%',
                textAlign: 'center',
                color: 'white',
                backgroundColor:'green',
                textAlignVertical: "center",
                fontSize:11,
                height:50,
            },
            headerTintColor: 'white',
        },
    },
    RentalHistory: {
        screen: RentalHistory,
        navigationOptions: {
            title: 'Manage RentalVehicle History',
            headerStyle: {
                width:'100%',
                textAlign: 'center',
                color: 'white',
                backgroundColor:'green',
                textAlignVertical: "center",
                fontSize:11,
                height:50,
            },
            headerTintColor: 'white',
        },
    },
    RepairVehicleHistory: {
        screen: RepairVehicleHistory,
        navigationOptions: {
            title: 'Manage RepairVehicle History',
            headerStyle: {
                width:'100%',
                textAlign: 'center',
                color: 'white',
                backgroundColor:'green',
                textAlignVertical: "center",
                fontSize:11,
                height:50,
            },
            headerTintColor: 'white',
        },
    },
},
{
    initialRouteName: 'VehicleStatus',
}
);
    
const AppContainer = createAppContainer(RootContent);
    
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

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
    },
    contentChildSearch:{
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderWidth:1,
        marginBottom:8,
        borderRadius:1,
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
    pickerContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        flexDirection:'row',
        marginBottom:8
    },
    pickerContentChild:{
        justifyContent:'center',
        height:40,
        width:'50%',
        borderRadius:1,
        borderColor:'black',
        borderWidth:1,
    },
    spaceRight:{
        flex:1,
    },
    imageStyle: {
        height:100,
        width:'100%',
    },
})