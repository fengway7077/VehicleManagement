import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import {SEARCH_IMAGE} from './imageExport.js'
import { Dropdown } from 'react-native-material-dropdown';
import {LinkVehicleStatus,LinkSearchVehicleStatus} from '../constLink/linkService.js'
export default class VehicleStatus extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            imageVehicle: '' ,
            vehicleName: '',
            price:'',
            status:'Trống',
            search: '',
        };
    }

    componentDidMount(){
        return fetch(LinkVehicleStatus)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
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

    searchVehicleStatus(){
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
    
    updateSearch = search => {
        this.setState({ search },this.searchVehicleStatus.bind(this));
    };
    render(){
        let data = [{
            value: 'Trống',
        }, {
            value: 'Cho Thuê',
        }, {
            value: 'Đang Sửa',
        }];
        const { search } = this.state;
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.contentSearch}>
                <Text>{this.state.status}</Text>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                        <TextInput
                            style={styles.searchStyle}
                            placeholder="Nhập Loại Xe Muốn Tìm Kiếm..."
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                    <View style={styles.pickerContent}>
                        <View style={styles.pickerContentChild}>
                            <Dropdown
                                label='Trạng Thái'
                                data={data}
                                onChangeText={(status) => this.setState({status})}
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
                            onPress={() => item.status === 'Đang Sửa' ? navigate('RepairCarHistory', {item: item}):navigate('RentalHistory',{item: item})}>
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
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.status==='0'?'Trống':item.status==='1'?'Cho Thuê':'Đang Sửa'}</Text>
                                        </View>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={({customercode}, index) => customercode}
                    />
                </View>
            </ScrollView>
        );
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
    },
    pickerContentChild:{
        justifyContent:'center',
        height:40,
        width:'50%',
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
        marginBottom:8
    },
    spaceRight:{
        flex:1,
    },
    imageStyle: {
        height:100,
        width:'100%',
    },
})