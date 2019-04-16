import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Picker,Image,TouchableOpacity,ScrollView } from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
export default class ManageCar extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            verhicleNumber: '' ,
            typeVehicle: '',
            rentalPrice:'',
            registrationNumber:'',
            managementNumber:'',
            status: '',
            vehicleColor:'',
            priceVehicle:'',
            imageVehicle:'',
            description:'',
            language:'Trạng Thái'
        };
    }
    
    render() {
        return (
            <ScrollView style={styles.mainContainer}>  
                {/* <View sytle={styles.headerContent}>
                    <Text style={styles.textStyle}>Vehicle Information Management</Text>
                </View> */}
                <View style={styles.bodyContent}>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(verhicleNumber) => this.setState({verhicleNumber})}
                            placeholder ='Số xe...'
                            value={this.state.verhicleNumber}
                        />
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(typeVehicle) => this.setState({typeVehicle})}
                            placeholder ='Loại xe...'
                            value={this.state.typeVehicle}
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
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <View style={styles.flexBodyView}>
                            <View style={styles.flexBodyViewLeft}>
                                <View style={styles.pickerContent}>
                                    <Picker
                                        selectedValue={this.state.language}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({language: itemValue})
                                        }>
                                        <Picker.Item label="Trạng Thái" value="trangthai" />
                                        <Picker.Item label="Trống" value="trong" />
                                        <Picker.Item label="Đang Thuê" value="thue" />
                                    </Picker>
                                </View>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(vehicleColor) => this.setState({vehicleColor})}
                                    placeholder ='Màu xe...'
                                    value={this.state.vehicleColor}
                                />
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(priceVehicle) => this.setState({priceVehicle})}
                                    placeholder ='Giá xe...'
                                    value={this.state.priceVehicle}
                                />
                            </View>
                            <View style={styles.imageBodyView}>
                                <TouchableOpacity onPress={() => {this.popupDialogA.openDialog();}}>
                                    <Image style={styles.imageStyle}
                                        source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(description) => this.setState({description})}
                            placeholder ='Mô tả...'
                            value={this.state.description}
                        />
                    </View>
                </View>
                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent}>
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
                        <TouchableOpacity style={styles.touchableContent}>
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
        flex: 1,
    },
    headerContent:
    {

    },
    bodyContent:
    {
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    footerContent:
    {
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
        width:'50%'
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
        marginBottom:10,
        justifyContent: 'center',
        borderRadius:5,
        borderColor: '#428AF8',
    },
    imageStyle: {
        height:140,
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
  });