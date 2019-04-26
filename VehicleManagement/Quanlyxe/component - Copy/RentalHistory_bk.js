import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import { LinkVehicleStatus ,LinkCheckVehicle,LinkCheckCustomer,LinkInsertVehiclerental} from '../constLink/linkService.js'

export default class RentalHistory extends Component{
    constructor(props) {
        super(props);
        
      if((item = this.props.navigation.getParam('item', null)) === null){
        this.state = { 
            vehicleID: '' ,
            vehicleName: '',
            customerID:'',
            customerName:'',
            phone:'',
            price: '',
            rentDate:'',
            payDate:'',
            collectionDate:'',
            mode : 0,
            value: '',
            suggestions: []
           
        };
      }
     else{
        this.state = {
            vehicleID: item.vehiclecode ,
            vehicleName: item.vehiclename,
            customerID: item.customercode,
            customerName:item.fullname,
            phone:item.phone,
            price: item.rentalprice,
            rentDate:item.rentaldate,
            payDate:item.payday,
           // collectionDate: bb,
        };
      }
   }
    
   chkVehicle(){
       fetch(LinkCheckVehicle,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             },
       body: JSON.stringify({
           "vehiclecode": this.state.vehiclecode,
       }),
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson.vehiclecode);
        return responseJson.vehiclecode;
    })
    .catch((error) => {
        console.error(error);
    });
   };

   chkCustomer(){
        fetch(LinkCheckCustomer,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            "customercode": this.state.customerID,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.customercode);
            return responseJson.customercode;
        })
        .catch((error) => {
            console.error(error);
        });
    };
   
    rental(mode) {
    if ((this.chkVehicle.value  =  this.state.vehiclecode)  ||  (this.LinkCheckCustomer.value = this.state.customerID))
    {

      this.addRentalHistory();

    }else
    {
      alert("Cần thêm khách hàng hoặc xe mới");
    }
   } 

    addRentalHistory(){
        console.log('response');
        fetch(LinkInsertVehiclerental, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customercode": this.state.customerID,
                "vehiclecode"   : this.state.vehicleID,
                "rentaldate"    : this.state.rentDate,         
                "rentalprice"    : this.state.price,
                "payday"      :  this.state.payDate,
               
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    updateRentalHistory(){
        fetch(LinkUpdateCustomer,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customercode": this.state.vehicleID,
                "lastname"   : this.state.vehicleName,
                "firstname"  : this.state.vehicleName,         
                "phone"      : this.state.phone,
                "rentalprice"  : this.state.price,       
                "rentaldate"     : this.state.rentDate,
                "payday"     : this.state.payDate,    
               // "status": this.state.status,
         
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
      });   
    };


    render(){

      
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];

        return(
            <ScrollView style={styles.mainContainer}>
              
                <View style={styles.bodyContent}>
                  
                <Dropdown  style={styles.Dropdown}/>
                label='Favorite Fruit'
                data={data}
                <Dropdown />

                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(vehicleID) => this.setState({vehicleID})}
                            placeholder ='Mã Xe...'
                            value={this.state.vehicleID}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuess}
                            onChangeText={(vehicleName) => this.setState({vehicleName})}
                            placeholder ='Tên Xe...'
                            value={this.state.vehicleName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(customerID) => this.setState({customerID})}
                            placeholder ='Mã Khách Hàng...'
                            value={this.state.customerID}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleGuess}
                            onChangeText={(customerName) => this.setState({customerName})}
                            placeholder ='Tên Khách Hàng...'
                            value={this.state.customerName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(phone) => this.setState({phone})}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <View style={styles.bodyViewChild}>
                            <TextInput
                                style={styles.inputStylePrice}
                                onChangeText={(price) => this.setState({price})}
                                placeholder ='Giá cho thuê...'
                                value={this.state.price}
                            />
                            <TextInput
                                style={styles.inputStyleCollection}
                                onChangeText={(collectionDate) => this.setState({collectionDate})}
                                placeholder ='Số ngày còn lại...'
                                value={this.state.collectionDate}
                            />
                        </View>
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(rentDate) => this.setState({rentDate})}
                            placeholder ='Ngày Thuê...'
                            value={this.state.rentDate}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(payDate) => this.setState({payDate})}
                            placeholder ='Ngày Trả...'
                            value={this.state.payDate}
                        />
                    </View>
                  
                  
     
                </View>
                  {/* }
                  keyExtractor={({customercode}, index) => customercode} */}

                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.rental.bind(1)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={INSERT_IMAGE}
                                />  
                                <Text>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.rental.bind(2)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={DELETE_IMAGE}
                                />   
                                <Text>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.rental.bind(3)}>
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

    componentDidMount(){
        return fetch(LinkVehicleStatus)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson

        }, function(){

        });

        })
        .catch((error) =>{
            console.error(error);
        });
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
        marginBottom:10,
        borderRadius:10
    },
    inputStyleCollection:{
        width:'50%',
        height: 40,
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:10
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
        borderRadius:10
    },
    inputStyleGuess: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:10
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
    autocompletesContainer: {
        paddingTop: 0,
        zIndex: 1,
        width: "100%",
        paddingHorizontal: 8,
      },
      input: {maxHeight: 40},
      inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c6c1",
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: "5%",
        width: "100%",
        justifyContent: "flex-start",
      },
      container: {
        flex: 1,
        backgroundColor: "#ffffff",
      },
      plus: {
        position: "absolute",
        left: 15,
        top: 10,
      },
})