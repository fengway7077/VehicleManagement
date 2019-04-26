import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE,NO_IMAGE} from "./imageExport.js";
import { Dropdown } from 'react-native-material-dropdown';
import { LinkInsertVehicle ,LinkUpdateVehicle } from '../constLink/linkService.js';
var FloatingLabel = require('react-native-floating-labels');
var ImagePicker = require('react-native-image-picker');

export default class ManageVehicle extends Component{
    constructor(props) {
        super(props);
        params = this.props.navigation.getParam('params', null);
        if( params === null){
            this.vehicleInit();
        }
        else
        {
            item = params.item
            this.state = { 
                vehicleCode        : item.vehiclecode ,
                vehicleName        : item.vehiclename ,
                vehicleNumber      : item.vehiclenumber ,
                vehicleType        : item.vehicletype , 
                rentalPrice        : item.rentalprice ,
                registrationNumber : item.registrationnumber ,
                managementNumber   : item.managementnumber ,
                status             : item.status ,
                vehicleColor       : item.vehiclecolor ,
                purchasePrice      : item.purchaseprice ,
                imageVehicle       : item.vehicleimage ,
                describe           : item.describe ,
                language           : 'Trạng Thái',
                filePath           : {uri: item.vehicleimage},
            };
        }
    }
    
    vehicleInit(){
        this.state = { 
            vehicleCode        : '',
            vehicleName        : '',
            vehicleNumber      : '',
            vehicleType        : '', 
            rentalPrice        : '',
            registrationNumber : '',
            managementNumber   : '',
            status             : '',
            vehicleColor       : '',
            purchasePrice      : '',
            imageVehicle       : '',
            describe           : '',
            language           : 'Trạng Thái',
            filePath           : {uri: ''},
        };
    }

    InsertVehicle(){
        fetch(LinkInsertVehicle, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehiclenumber"      : this.state.vehicleNumber,
                "vehiclename"        : this.state.vehicleName,
                "vehicletype"        : this.state.vehicleType,
                "rentalprice"        : this.state.rentalPrice,
                "registrationnumber" : this.state.registrationNumber,
                "managementnumber"   : this.state.managementNumber,
                "status"             : this.state.status,
                "vehiclecolor"       : this.state.vehicleColor,    
                "purchaseprice"      : this.state.nationality,
                "vehicleimage"       : this.state.filePath,
                "describe"           : this.state.describe,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.rowCount === 1){
                alert("Thêm Thành Công",this.vehicleInit(),
                params !== null ? params.reFetchVehicle():'',
                this.props.navigation.navigate('ListVehicle'));
                this.vehicleInit()
            }
            return;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    UpdateVehicle(){
        fetch(LinkUpdateVehicle, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehiclecode"        : this.state.vehicleCode,
                "vehiclename"        : this.state.vehicleName,
                "vehiclenumber"      : this.state.vehicleNumber,
                "vehicletype"        : this.state.vehicleType,
                "rentalprice"        : this.state.rentalPrice,
                "registrationnumber" : this.state.registrationNumber,
                "managementnumber"   : this.state.managementNumber,
                "status"             : this.state.status,
                "vehiclecolor"       : this.state.vehicleColor,    
                "purchaseprice"      : this.state.nationality,
                "vehicleimage"       : this.state.filePath,
                "describe"           : this.state.describe,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.rowCount === 1){
                alert("Sửa Thành Công",params.reFetchVehicle(),this.props.navigation.navigate('ListVehicle'));
            }
            return;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else {
                let source = response;
                this.setState({
                filePath: source,
                });
            }
        });
    };
    
    render() {
        let data = [{
            value: 'Trống'
        }, {
            value: 'Cho Thuê'
        }, {
            value: 'Bảo Trì'
        }];
        return (
            <ScrollView style={styles.mainContainer}>  
                <View style={styles.bodyContent}>
                    <View style={styles.bodyView}>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(vehicleName) => this.setState({vehicleName})}
                            value={this.state.vehicleName}
                        >Tên xe</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(vehicleNumber) => this.setState({vehicleNumber})}
                            value={this.state.vehicleNumber}
                        >Số xe</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(vehicleType) => this.setState({vehicleType})}
                            value={this.state.vehicleType}
                        >Loại xe</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(rentalPrice) => this.setState({rentalPrice})}
                            value={this.state.rentalPrice}
                        >Giá cho thuê</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(registrationNumber) => this.setState({registrationNumber})}
                            value={this.state.registrationNumber}
                        >Số đăng kí</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(registrationNumber) => this.setState({registrationNumber})}
                            value={this.state.registrationNumber}
                        >Số Quản Lý</FloatingLabel>
                        {/* <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(vehicleName) => this.setState({vehicleName})}
                            placeholder ='Tên xe...'
                            value={this.state.vehicleName}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(vehicleNumber) => this.setState({vehicleNumber})}
                            placeholder ='Số xe...'
                            value={this.state.vehicleNumber}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(vehicleType) => this.setState({vehicleType})}
                            placeholder ='Loại xe...'
                            value={this.state.vehicleType}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(rentalPrice) => this.setState({rentalPrice})}
                            placeholder ='Giá cho thuê...'
                            value={this.state.rentalPrice}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(registrationNumber) => this.setState({registrationNumber})}
                            placeholder ='Số đăng kí....'
                            value={this.state.registrationNumber}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(managementNumber) => this.setState({managementNumber})}
                            placeholder ='Số Quản Lý...'
                            value={this.state.managementNumber}
                        /> */}
                    </View>
                    <View style={styles.bodyView}>
                        <View style={styles.flexBodyView}>
                            <View style={styles.flexBodyViewLeft}>
                                <View style={styles.pickerContent}>
                                    <Dropdown
                                        label='Trạng Thái'
                                        data={data}
                                        value = {this.state.status === 0 ?'Trống':this.state.status=== 1 ?'Cho Thuê':this.state.status=== 2 ?'Bảo Trì':''}
                                        onChangeText={(value) => {
                                            if(value === 'Trống'){
                                                this.state.status = 0;
                                            }else if(value === 'Cho Thuê'){
                                                this.state.status = 1;
                                            }else if(value === 'Bảo Trì'){
                                                this.state.status = 2;
                                            }
                                        }}
                                    />
                                </View>
                                <FloatingLabel 
                                    labelStyle={styles.labelInput}
                                    inputStyle={styles.input}
                                    style={styles.formInput}
                                    onBlur={this.onBlur}
                                    onChangeText={(vehicleColor) => this.setState({vehicleColor})}
                                    value={this.state.vehicleColor}
                                >Màu xe</FloatingLabel>
                                <FloatingLabel 
                                    labelStyle={styles.labelInput}
                                    inputStyle={styles.input}
                                    style={styles.formInput}
                                    onBlur={this.onBlur}
                                    onChangeText={(purchasePrice) => this.setState({purchasePrice})}
                                    value={this.state.purchasePrice}
                                >Giá xe</FloatingLabel>
                                {/* <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(vehicleColor) => this.setState({vehicleColor})}
                                    placeholder ='Màu xe...'
                                    value={this.state.vehicleColor}
                                />
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(purchasePrice) => this.setState({purchasePrice})}
                                    placeholder ='Giá xe...'
                                    value={this.state.purchasePrice}
                                /> */}
                            </View>
                            <View style={styles.imageBodyView}>
                                <TouchableOpacity style={styles.touchableContentImage} onPress={this.chooseFile.bind(this)} >
                                    {this.state.filePath.uri != '' && <Image style={styles.imageStyle}
                                        source={{ uri:this.state.filePath.uri}}
                                    /> }
                                    {this.state.filePath.uri == '' && <Image style={styles.noImageStyle} source={NO_IMAGE} /> }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.bodyView}>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            onBlur={this.onBlur}
                            onChangeText={(describe) => this.setState({describe})}
                            value={this.state.describe}
                        >Mô tả</FloatingLabel>
                        {/* <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(describe) => this.setState({describe})}
                            placeholder ='Mô tả...'
                            value={this.state.describe}
                        /> */}
                    </View>
                </View>
                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.InsertVehicle.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={INSERT_IMAGE}
                                />  
                                <Text>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={DELETE_IMAGE}
                                />   
                                <Text>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.UpdateVehicle.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={UPDATE_IMAGE}
                                />
                                <Text>Sửa</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop:20,
        flex: 1,
    },
    headerContent:
    {
        alignItems:'center',
    },
    bodyContent:
    {
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    footerContent:
    {
        marginTop:20,
        height:60,
        alignItems:'center',
        justifyContent:'center',
    },
    bodyView:{
        width:'85%',
        alignItems: 'center',
        justifyContent:'center',
    },
    flexBodyView:{
        marginTop:20,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    flexBodyViewLeft:{
        width:'48%'
    },
    flexControl:{
        width:'85%',
        flexDirection:'row',
        justifyContent:'space-between',
        position: 'absolute',
    },
    labelInput: {
        color: 'green',
    },
    formInput: {    
        width:'100%',
        // borderBottomWidth: 1.5, 
        borderColor: '#333',       
    },
    input: {
        borderColor: 'green',  
        borderRadius:10,
        borderWidth: 1
    },
    touchableContent:{
        width:'33%',
        height:60,
        backgroundColor: '#FF9800', 
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0
    },
    iconControl:{
        width:30,
        height:30
    },
    imageBodyView:{
        width:'50%',
        alignItems:'center'
    },
    inputStyleFull: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:10
    },
    inputStyle: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:10
    },
    pickerContent:{
        height: 40,
        width:'100%',
        borderWidth:1,
        justifyContent: 'center',
        borderRadius:8,
        borderColor: 'green',
    },
    imageStyle: {
        height:160,
        width:'100%',
    },
    noImageStyle: {
        height:160,
        width:160,
    },
    touchableContentImage:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
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
  });