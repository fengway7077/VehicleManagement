import React, { Component } from 'react';
import { TextInput,View,Text,StyleSheet,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
import { LinkCheckDataCustomer,
         LinkCheckDataVehicle,
         LinkListVehicle,
         LinkListCustomer,
         LinkInsertRentalHistory,
         LinkUpdateRentalHistory,LinkDeleteRentalHistory } from '../constLink/linkService.js';
import AutoCompleteCustomer from '../customize/AutoCompleteCustomer.js';
import AutoCompleteVehicle from '../customize/AutoCompleteVehicle';
import DatePicker from '../customize/DatePicker'
import { callbackify } from 'util';
export default class RentalHistory extends Component {
    constructor(props) {
        super(props);
        this._loadDataUser();
        params = this.props.navigation.getParam('params', null);
        if(params === null){
            this.state = { 
                vehicleCode    : '',
                vehicleName    : '',
                customerCode   : '',
                customerName   : '',
                phone          : '',
                price          : '',
                rentDate       : '',
                payDate        : '',
                collectionDate : '',
                vehicleSuggest : '',
                rentalCheck    : false,
                
                phoneValidate: true,
                priceValidate: true,
                dateValidate: true,
            };
        }
        else
        {
            item = params.item
            var nowDate = new Date(Date.now());
            var payDate = new Date(item.payday);
          //  console.warn("test" +valueRentDate);
            this.state = { 
                vehicleCode    : item.vehiclecode.toString(),
                vehicleName    : item.vehiclename,
                customerCode   : item.customercode.toString(),
                customerName   : item.fullname,
                phone          : item.phone,
                price          : item.rentalprice,
                rentDate       : item.rentaldate,
                payDate        : item.payday,//.replace(/T/, ' ').replace(/\..+/, ''),
                collectionDate : (payDate.getUTCDate()- nowDate.getUTCDate()).toString(),    
                rentalCheck    : false,  
                //
                phoneValidate: true,
                priceValidate: true,
                dateValidate: true,
            };
        }
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
                this.setState({
                    vehicleCode : ''
                })
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
                console.log(responseJson)
                this.setState({
                    customerName : responseJson[0].fullname,
                    customerCode : query
                });
            }
            else{
                this.setState({
                    customerCode : ''
                })
                alert("Mã Khách Hàng Không Tồn Tại");
            }
            return;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    checkDataRental(callBack){
        fetch(LinkCheckDataCustomer, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customercode" : this.state.customerCode,
                "vehiclecode"  : this.state.vehicleCode,
                "rentaldate"   : this.state.rentDate,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.length === 1){
                console.log(responseJson)
                this.setState({
                    rentalCheck : true
                }, () => {
                    if (callBack) {
                        console.log(this.state.customerCode)
                        callBack()
                    }
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    update(){
        this.checkDataRental(this.updateRentalHistory.bind(this))
    }

    updateRentalHistory(){
        if(this.state.customerCode === '' || this.state.vehicleCode === ''){
            alert("Vui lòng kiểm tra lại mã code");
        }
        else 
        {
            console.log(this.state.rentDate)
            console.log(this.state.payDate)
            if(this.state.rentalCheck === true){
                fetch(LinkUpdateRentalHistory, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "vehiclecode"    : parseInt(this.state.vehicleCode),
                        "customercode"   : parseInt(this.state.customerCode),
                        "rentaldate"     : this.state.rentDate,
                        "payday"         : this.state.payDate,    
                    }),
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson.rowCount === 1){
                        if(params.reFetchVehicleStatus){
                            alert("Sửa Thành Công",params.reFetchVehicleStatus(),this.props.navigation.navigate('VehicleStatus'));
                        }
                        else if(params.reFetchVehicleFees)
                        {
                            alert("Sửa Thành Công",params.reFetchVehicleFees(),this.props.navigation.navigate('VehicleFees'));
                        }
                    }
                    else
                    {
                        alert("Nhập lại dữ liệu sửa")
                    }
                    return;
                })
                .catch((error) => {
                    console.error(error);
                });
            }
            else
            {
                alert("Nhập lại dữ liệu sửa")
            }
        }
    }

    insert(){
        this.checkDataRental(this.insertRentalHistory.bind(this))
    }

    insertRentalHistory(){
        if(this.state.customerCode === '' || this.state.vehicleCode === ''){
            alert("Vui lòng kiểm tra lại mã code");
        }
        else
        {
            if(this.state.rentalCheck === false){
                fetch(LinkInsertRentalHistory, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "vehiclecode"    : this.state.vehicleCode,
                        "customercode"   : this.state.customerCode,
                        "rentaldate"     : this.state.rentDate,
                        "payday"         : this.state.payDate,  
                    }),
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if(responseJson.rowCount === 1){
                        if(params.reFetchVehicleStatus){
                            alert("Thêm Thành Công",params.reFetchVehicleStatus(),this.props.navigation.navigate('VehicleStatus'));
                        }
                        else if(params.reFetchVehicleFees)
                        {
                            alert("Thêm Thành Công",params.reFetchVehicleFees(),this.props.navigation.navigate('VehicleFees'));
                        }
                    }
                return;
                })
                .catch((error) => {
                    console.error(error);
                });
            }                
            else
            {
                alert("Trùng Dữ liệu thêm")
            }
        }
    }

    DeleteVihicle(){
        fetch(LinkDeleteRentalHistory, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vehiclecode"    : this.state.vehicleCode,
                "customercode"    : this.state.customerCode,
                "rentaldate"    : this.state.rentDate,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.rowCount === 1){
                alert("Xóa Thành Công",params.reFetchVehicle(),this.props.navigation.navigate('ListVehicle'));
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


    
    validate(text,type){
        alph =/^[a-zA-Z]\s\t+$/;
        number = /^[0-9]/;
        date = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; //YYYY-mm-DD
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

        if(( type ='rentdate ') || ( type ='payday')){
            if(date.test(text)){  
                 this.setState({ dateValidate: true});  
            }else{
                this.setState({ dateValidate: false}); 
            }
        }
    }
    // componentDidMount() {
    //     this.props.navigation.navigate('Login');   
    //   }
    _loadDataUser = async() =>{
        try {
        const isLoggedIn = await AsyncStorage.getItem('user');
        this.props.navigation.navigate( isLoggedIn !== null ? 'RentalHistory' : 'Login');  
        } catch (error) {
        console.log(error);
      }
    }

    render(){
        console.disableYellowBox = true; //fix warn yellow
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
                            onBlur={this.checkVehicleCode}
                        /> */}
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuessVehicle}
                            onChangeText={(vehicleName) => this.setState({vehicleName})}
                            placeholder ='Tên Xe...'
                            value={this.state.vehicleName}
                            editable={false}
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
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuess}
                            onChangeText={(customerName) => this.setState({customerName})}
                            placeholder ='Tên Khách Hàng...'
                            value={this.state.customerName}
                            editable={false} 
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull ,!this.state.phoneValidate ? styles.error:null]}
                            onChangeText={(phone) =>{ this.setState({phone}) ; this.validate(this.state.phone ,'phone'); }}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <View style={styles.bodyViewChild}>
                            <TextInput
                                style={[styles.inputStylePrice, !this.state.priceValidate ? styles.error:null]}
                                onChangeText={(price) => {this.setState({price}) ; this.validate(this.state.price ,'price'); }}
                                placeholder ='Giá cho thuê...'
                                value={this.state.price}
                            />
                            <TextInput
                                style={styles.inputStyleCollection}
                                onChangeText={(collectionDate) => this.setState({collectionDate})}
                                placeholder ='Số ngày còn lại...'
                                value={this.state.collectionDate}
                                editable={false} selectTextOnFocus={false}
                            />
                        </View>
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,, !this.state.dateValidate ? styles.error:null]}
                            onChangeText={(rentDate) => {this.setState({rentDate}); this.validate(this.state.rentDate ,'rentdate'); }}
                            placeholder ='Ngày Thuê (YYYY-MM-DD)'
                            value={this.state.rentDate}
                        />
                    </View>
                    {/* <View style={styles.bodyViewDatePicker}>
                        <View style={styles.bodyViewChildDatePicker}>
                            <DatePicker
                                valueRentDate = {this.state.rentDate}
        
                            />
                        </View>
                        <View style={styles.bodyViewChildDatePicker}>
                            <DatePicker
                                valuePayDate = {this.state.payDate}
                            />
                        </View>
                    </View> */}
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,, !this.state.dateValidate ? styles.error:null]}
                            onChangeText={(payDate) =>{  this.setState({payDate}); this.validate(this.state.payDate ,'paydate');}}
                            placeholder ='Ngày Trả (YYYY-MM-DD)'
                            value={this.state.payDate}
                        />
                    </View>
                </View>
                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.insert.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={INSERT_IMAGE}
                                />  
                                <Text>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent}  onPress={this.DeleteVihicle.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={DELETE_IMAGE}
                                />   
                                <Text>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.update.bind(this)}>
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
    bodyViewDatePicker:{
        width:'85%',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:10,
    },
    bodyViewChildDatePicker:{
        width:'47%',
    },
    bodyViewChild:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inputStylePrice:{
        height: 40,
        width:'47%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:1
    },
    inputStyleCollection:{
        width:'47%',
        height: 40,
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:1
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
        borderRadius:1
    },
    inputStyleGuess: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:1
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