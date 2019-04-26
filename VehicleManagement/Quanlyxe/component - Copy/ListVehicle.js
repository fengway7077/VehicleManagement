import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { SEARCH_IMAGE } from './imageExport.js'
import ManageVehicle from './ManageVehicle.js'
import { LinkListVehicle,LinkSearchListVehicle } from '../constLink/linkService.js'
import AutocompleteSuggest from './AutocompleteSuggest.js';

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
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.contentSearch}>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                        <TextInput
                            style={styles.searchStyle}
                            placeholder="Nhập Tên Xe Muốn Tìm Kiếm..."
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
                                            <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            />
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
        borderRadius:5,
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