import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { SEARCH_IMAGE } from './imageExport.js'
import ManageVehicle from './ManageVehicle.js'
import { LinkListVehicle,LinkSearchListVehicle } from '../constLink/linkService.js'

class ListVehicle extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            search: '',
        };
    }

    getDataVehicle(){
        return fetch(LinkListVehicle)
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

    componentDidMount(){
        this.getDataVehicle();
    }   
    
    updateSearch = search => {
        this.setState({ search }, () => {
            fetch(LinkSearchListVehicle, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "vehicletype": this.state.search
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
        });
    };
    
    render(){
        const { search } = this.state;
        const { navigate } = this.props.navigation;
     //  var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
        return(
            <ScrollView style={styles.mainContainer}>
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
                                onPress={
                                    () => navigate('ManageVehicle',
                                        { 
                                            params: { 
                                                item,
                                                reFetchVehicle: (() => {
                                                    this.getDataVehicle()
                                                }).bind(this)
                                            } 
                                        }
                                    )
                                }>
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            {/* <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            /> */}
                                               <Image
                                                onLayout={ 
                                                    () => {
                                                        console.log(item)
                                                    }
                                                } 

                                                style={styles.imageStyle}
                                                // source={ item.vehicleimage }

                                             //     source={require( item.vehicleimage.toString)}
                                                 source={{ uri:  '../Photo/Customer/baby.jpg' }}
                                               // source={require(item.vehicleimage.toString() )}
                                                 // source={require(item.vehicleimage.toString() )}
                                            //    source={{ uri:  require(item.vehicleimage.toString())}}
                                             //   source={{  uri: item.vehicleimage.toString() === null ? " ": item.vehicleimage.toString()}}
                                                //   style={{
                                                //     width: 51,
                                                //     height: 51,
                                                //     resizeMode: 'contain',
                                                //   }}
                                                 style={{width: 100, height: 100}} 
                                            />

                                   {/* const encodedData = 'R0lGODlhAQABAIAAAAAA...7';
                                 <Image source={{uri: `data:image/gif;base64,${encodedData}`}} /> */}

                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên Xe : {item.vehiclename}</Text>
                                            <Text style={styles.generalStyle}>Giá : {item.rentalprice}</Text>
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.status=== 0 ?"Trống":item.status=== 1 ?"Cho Thuê":'Bảo Trì'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={({vehiclecode}, index) => vehiclecode.toString()}
                    />
                </View>
            </ScrollView>
        );
    }
}

const RootContent = createStackNavigator(
    {
        ListVehicle: {
            screen: ListVehicle,
            navigationOptions: {
                title: 'ListVehicle',
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: 'center',
                },
                headerTintColor: 'white',
            },
        },
        ManageVehicle: {
            screen: ManageVehicle,
            navigationOptions: {
                title: 'ManageVehicle',
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: "center",
                },
                headerTintColor: 'white',
            }
        },
    },
    {
        initialRouteName: 'ListVehicle',
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
        borderRadius:11,
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