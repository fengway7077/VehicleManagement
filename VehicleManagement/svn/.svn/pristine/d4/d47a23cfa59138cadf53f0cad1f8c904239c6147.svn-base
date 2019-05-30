import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
import {LinkInsertRepairHistory,LinkUpdateRepairHistory,LinkDeleteRepairHistory,LinkListVehicle,LinkListCustomer} from '../constLink/linkService.js';
import AutoCompleteCustomer from '../customize/AutoCompleteCustomer.js';
import AutoCompleteVehicle from '../customize/AutoCompleteVehicle.js';
import Moment from 'moment';
export default class RepairVehicleHistory extends Component{
    constructor(props) {
        super(props);
        params = this.props.navigation.getParam('params', null);
        console.log(params);
       if(params === null){
            this.state ={ 
                vehicleCode    : '',
                vehicleName    : '',
                customerCode   : '',
                customerName   : '',
                phone          : '',
                fixDate        : '',
                price          : '',
                //
                phoneValidate: true,
                priceValidate: true,
            };
        }
        else
        {
            item = params.item
            var toDay = new Date(Date.now());
      //    var temp =  toDay.toLocaleString().slice(0, 19).replace(/,/, ' ');
              var dd = toDay.getDate();
              var mm = toDay.getMonth()+1;//January is 0!
              var yyyy = toDay.getFullYear();
                if(dd<10){dd='0'+dd}
                if(mm<10){mm='0'+mm}
                var hms = toDay.toTimeString().slice(0, 8);
                var day  = yyyy + '-'+ mm + '-'+dd + ' ' + hms

            this.state = { 
                vehicleCode  : item.vehiclecode, 
                vehicleName  : item.vehiclename,
                customerCode : item.customercode,
                customerName : item.fullname,
                phone        : item.phone,
                fixDate      : item.damagedday.replace(/T/, ' ').replace(/\..+/, ''), 
                price        : item.price,
                nowDate      : day ,//toDay.toLocaleString("yyyy-mm-dd HH:MM:SS").slice(0, 19).replace(/,/, ' '),//toDay.toISOString().replace(/T/, ' ').substr(0, 19), //.slice(0, 19)//2019-04-26 02:38:46.943=>2019-04-26 02:38:46
              //
              phoneValidate: true,
              priceValidate: true,
            };
        }
    }

    insertRepairHistory(){
        //console.log(day);
        fetch(LinkInsertRepairHistory, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehiclecode"    : this.state.vehicleCode,
                "customercode"   : this.state.customerCode,
                "amountfixed"    : this.state.price,
                "damagedday"     :  this.state.nowDate,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.rowCount === 1){
                console.log(this.nowDate)
                alert("Thêm Thành Công",params.reFetchVehicleStatus(),this.props.navigation.navigate('VehicleStatus'));
            }
            else
            {
                alert("Trùng Dữ liệu thêm");
            }
            return;
        })
        .catch((error) => {
            console.error(error);
            alert(" Thông tin lỗi :" + error);
        });
    }

    updateRepairHistory(){
     console.log(this.state.fixDate);
         fetch(LinkUpdateRepairHistory, {
             method: "POST",
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 "vehiclecode"    : this.state.vehicleCode,
                 "customercode"   : this.state.customerCode,
                 "amountfixed"    : this.state.price,
                 "damagedday"     :  this.state.fixDate, 
             }),
         }).then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson)
             if(responseJson.rowCount === 1){
                 alert("Sửa Thành Công",params.reFetchVehicleStatus(),this.props.navigation.navigate('VehicleStatus'));
             }
             else
             {
                 alert("Dữ liệu sửa không tồn tại");
             }
             return;
         })
         .catch((error) => {
             console.error(error);
             alert(" Thông tin lỗi :" + error);
         });
     }

     deleteRepairHistory(){
        console.log("this.state.fixDate");
            fetch(LinkDeleteRepairHistory, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "vehiclecode"    : this.state.vehicleCode,
                    "customercode"   : this.state.customerCode,               
                    "damagedday"     :  this.state.fixDate, 
                }),
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(responseJson.rowCount === 1){
                    alert("Xóa Thành Công",params.reFetchVehicleStatus(),this.props.navigation.navigate('VehicleStatus'));
                }
                else
                {
                    alert("Dữ liệu sửa không được xóa");
                }
                return;
            })
            .catch((error) => {
                console.error(error);
                alert(" Thông tin lỗi :" + error);
            });
        }

        checkDataVehicle(query){
            fetch(LinkCheckDataVehicle, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "vehiclecode" : query,
                }),
                
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length === 1){
                    this.setState({
                        vehicleName : responseJson[0].vehiclename,
                        vehicleCode : query
                    });
                }
                else{
                    alert("Mã Xe Không Tồn Tại");
                }
                return;
            })
            .catch((error) => {
                console.error(error);
            });
        }
    
        checkDataCustomer(query){
            fetch(LinkCheckDataCustomer, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "customercode" : query,
                }),
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length === 1){
                    this.setState({
                        customerName : responseJson[0].fullname,
                        customerCode : query
                    });
                }
                else{
                    alert("Mã Khách Hàng Không Tồn Tại");
                }
                return;
            })
            .catch((error) => {
                console.error(error);
            });
        }

 
        validate(text,type){
            alph =/^[a-zA-Z]\s\t+$/;
            number = /^[0-9]/;
            if(type ='phone') {
                if(number.test(text)){   
              //  console.warn("ok");
                this.setState({  phoneValidate: true});             
             }else{
             //   console.warn("ng");
             this.setState({ phoneValidate: false});        
              }   
            }
            if( type ='price'){
                if(number.test(text)){   
              //  console.warn("ok");
                this.setState({   priceValidate: true}); 
             }else{
            //    console.warn("ng");
                this.setState({ priceValidate: false});
              }   
            }
        }

    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.bodyContent}>
                    <View style={styles.bodyView}>
                        <AutoCompleteVehicle
                            value={this.state.vehicleCode}
                            link={LinkListVehicle}
                            checkCode={
                                ((code) => {
                                    this.checkDataVehicle(code)
                                }).bind(this)
                            }
                        />
                        {/* <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(vehicleCode) => this.setState({vehicleCode})}
                            placeholder ='Mã Xe...'
                            value={this.state.vehicleCode}
                        /> */}
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuessVehicle}
                            onChangeText={(vehicleName) => this.setState({vehicleName})}
                            placeholder ='Tên Xe...'
                            value={this.state.vehicleName}
                            editable ={false}
                        />
                        
                    </View>
                    <View style={styles.bodyView}>
                       <AutoCompleteCustomer
                            value={this.state.customerCode}
                            link={LinkListCustomer}
                            checkCode={
                                ((code) => {
                                    this.checkDataCustomer(code)
                                }).bind(this)
                            }
                        />
                        {/* <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(customerCode) => this.setState({customerCode})}
                            placeholder ='Mã Khách Hàng...'
                            value={this.state.customerCode}
                        /> */}
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuessVehicle}
                            onChangeText={(customerName) => this.setState({customerName})}
                            placeholder ='Tên Khách Hàng...'
                            value={this.state.customerName}
                            editable ={false}
                        />

                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[ styles.inputStyleGuess, ,!this.state.phoneValidate ? styles.error:null]}
                            onChangeText={(phone) => {this.setState({phone}) ;this.validate(this.state.phone ,'phone'); }}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(fixDate) => this.setState({fixDate})}
                            placeholder ='Ngày Sửa...'
                            value={this.state.fixDate}
                            editable ={false}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull ,!this.state.priceValidate ? styles.error:null]}
                            onChangeText={(price) => {this.setState({price});this.validate(this.state.price ,'price'); }}
                            placeholder ='Số Tiền Sửa...'
                            value={this.state.price}
                        />
                    </View>
                </View>
                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.insertRepairHistory.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={INSERT_IMAGE}
                                />  
                                <Text>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.deleteRepairHistory.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={DELETE_IMAGE}
                                />   
                                <Text>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.updateRepairHistory.bind(this)}>
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
//

}


const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
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
        height:60,
        alignItems:'center',
        justifyContent:'center',
    },
    bodyView:{
        width:'85%',
        alignItems: 'center',
        justifyContent:'center',
    },
    bodyViewChild:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inputStylePrice:{
        height: 40,
        width:'45%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    inputStyleCollection:{
        width:'50%',
        height: 40,
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
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
    inputStyleFull: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:10,
    },
    inputStyleGuess: {
        borderRadius:10,
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    inputStyleGuessVehicle: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:1
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
    error: {
        borderRadius:2,
        borderWidth:3,
      // backgroundColor:'yellow',
        borderColor:'red'       
    },
})