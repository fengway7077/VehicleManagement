import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
import { LinkInsertCustomer , LinkUpdateCustomer,LinkDeleteCustomer } from '../constLink/linkService.js';
import { Divider } from 'react-native-elements';

export default class ManageCustomer extends Component{
    constructor(props) {
        super(props);
        params = this.props.navigation.getParam('params', null);
        if(params === null){
            this.state ={ 
                customerCode : '',
                lastName     : '',
                firstName    : '',
                birthday     : '',
                address      : '',
                phone        : '',
                email        : '',
                gender       : '',
                idCard       : '',
                nationality  : '',
                checked      : false,
               //validate
                lastnameValidate: true,
                firstnameValidate: true,
                birthdayValidate: true,
                phoneValidate: true,
                emailValidate: true,
                idcardValidate: true,
                nationalityValidate:true,

            };
        }
        else
        {
            item = params.item
                    // var toDay = new Date(Date.now());
                    // var dd = toDay.getDate();
                    // var mm = toDay.getMonth()+1;//January is 0!
                    // var yyyy = toDay.getFullYear();
            this.state = { 
                customerCode : item.customercode,
                lastName     : item.lastname,
                firstName    : item.firstname,
                birthday     : item.birthday, //item.age.toString(),
                address      : item.address,
                phone        : item.phone,
                email        : item.email,
                gender       : item.gender,
                idCard       : item.idcard,    
                nationality  : item.nationality,
                checked      : item.gender === 1 ? true:false,
               //validate
               lastnameValidate: true,
               firstnameValidate: true,
               birthdayValidate: true,
               phoneValidate: true,
               emailValidate: true,
               idcardValidate: true,
               nationalityValidate:true

            };
        }
    }

    UpdateCustomer(){
        fetch(LinkUpdateCustomer, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customercode" : this.state.customerCode,
                "lastname"     : this.state.lastName,
                "firstname"    : this.state.firstName,
                "birthday"     : this.state.birthday,
                "address"      : this.state.address,
                "phone"        : this.state.phone,
                "email"        : this.state.email,
                "gender"       : this.state.gender,
                "idcard"       : this.state.idCard,    
                "nationality"  : this.state.nationality,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.rowCount === 1){
                alert("Sửa Thành Công",params.reFetchCustomer(),this.props.navigation.navigate('ListCustomer'));
            }
            return;
        })
        .catch((error) => {
            console.error(error);
            alert(" Thông tin lỗi :" + error);
        });
    }

    InsertCustomer(){
        fetch(LinkInsertCustomer, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "lastname"    : this.state.lastName,
                "firstname"   : this.state.firstName,
                "birthday"    : this.state.birthday,
                "address"     : this.state.address,
                "phone"       : this.state.phone,
                "email"       : this.state.email,
                "gender"      : this.state.gender,
                "idcard"      : this.state.idCard,    
                "nationality" : this.state.nationality,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.rowCount === 1){
                alert("Thêm Thành Công",params.reFetchCustomer(),this.props.navigation.navigate('ListCustomer'));
            }
            return;
        })
        .catch((error) => {
            console.error(error);
        });
    };

    DeleteCustomer(){
        console.log("test");
        fetch(LinkDeleteCustomer, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "customercode"    : this.state.customerCode,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.rowCount === 1){
                alert("Delete Success",params.reFetchCustomer(),this.props.navigation.navigate('ListCustomer'));
            }
            else
            {
                alert("Edit data is not deleted");
            }
            return;
        })
        .catch((error) => {
            console.error(error);
            alert(" Thông tin lỗi :" + error);
        });
    }

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.firstName != '') {
          //Check for the Name TextInput
          if (this.state.firstName != '') {
            //Check for the Email TextInput
            alert('Success')
          } else {
            alert('Please Enter firstName');
          }
        } else {
          alert('Please Enter Name');
        }
      };
      
  
    validate(text,type){
        email  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        alph =/^[a-zA-Z]\s\t+$/;
        number = /^[0-9]/;
     //   mobi = /^[0-9]\(\d\d\d\) \d\d\d-\d\d\d\d$/; ///^\(\d{3}\) \d{3}-\d{4}$/;
        birth = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; //YYYY-mm-DD
         if((type ='lastname') || (type ='firstname')||(type ='nationality')){
            if(  text.value != ""){
           //   console.warn("ok");
              this.setState({  lastnameValidate: true});
              this.setState({   firstnameValidate: true});
              this.setState({   nationalityValidate:true });
           }else{
             //   console.warn("ng");
                this.setState({ lastnameValidate: false});
                this.setState({ firstnameValidate: false});
                this.setState({ nationalityValidate:false });
            } 
         }     
           if(type ='birthday'){
              if(birth.test(text)){ this.setState({ birthdayValidate: true});
             }else{this.setState({ birthdayValidate: false})}
            } 

             if(type ='phone') {
                if(number.test(text)){   
              //  console.warn("ok");
                this.setState({  phoneValidate: true});             
             }else{
             //   console.warn("ng");
             this.setState({ phoneValidate: false});        
              }   
            }
            if (type = 'email'){
                if(email.test(text)){
                   this.setState({emailValidate:true})
                 // console.warn("ok");
                }else{
                //   console.warn("ng");
                  this.setState({emailValidate:false});
              }
            }   
            if( type ='idcard'){
                if(number.test(text)){   
              //  console.warn("ok");
                this.setState({   idcardValidate: true}); 
             }else{
            //    console.warn("ng");
                this.setState({ idcardValidate: false});
              }   
            }
      
    }

    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.bodyContent}>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,!this.state.lastnameValidate ? styles.error:null]}
                            onBlur ={this.onBlur}                          
                            onChangeText={(lastName) => {this.setState({lastName}) ; this.validate(this.state.lastName,'lastname'); }}
                            placeholder ='Họ Khách Hàng...'
                            value={this.state.lastName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                           style={[styles.inputStyleFull,!this.state.firstnameValidate ? styles.error:null]}
                            onBlur ={this.onBlur}    
                            onChangeText={(firstName) => {this.setState({firstName});this.validate(this.state.firstName,'firstname');}}
                            placeholder ='Tên Khách Hàng...'
                            value={this.state.firstName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,!this.state.birthdayValidate ? styles.error:null]}
                            onBlur ={this.onBlur}    
                            onChangeText={(birthday) => {this.setState({birthday}) ;this.validate(this.state.firstName,'firstname');}}
                            placeholder ='Ngày Sinh (YYYY-MM-DD)...'
                            value={this.state.birthday}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(address) => this.setState({address})}
                            placeholder ='Địa Chỉ...'
                            value={this.state.address}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,!this.state.phoneValidate ? styles.error:null]}
                            onBlur={this.onBlur}
                            onChangeText={(phone) => {this.setState({phone});this.validate(this.state.phone,'phone');}}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={[styles.inputStyleFull,!this.state.emailValidate ? styles.error:null]}
                            onBlur={this.onBlur} 
                            onChangeText={(email) => {this.setState({email}) ; this.validate(this.state.email,'email');}}
                            placeholder ='Email...'
                            value={this.state.email}
                        />
                    </View>
                    <View style={styles.bodyViewRadioButton}>
                        <View style={styles.radioHorizionMain}>
                            <View style={styles.radioHorizion}>
                                <View style={styles.radiobuttonMain}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ checked: !this.state.checked,gender:1 })
                                    }}>
                                        <View style={styles.radiobuttonSub}>
                                            <View style={{
                                                backgroundColor: this.state.checked ? 'black' : 'white',
                                                width: 14,
                                                height: 14,
                                                borderRadius: 7
                                            }}>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text>Nam</Text>
                                </View>
                            </View>

                            <View style={styles.radioHorizion}>
                                <View style={styles.radiobuttonMain}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ checked: !this.state.checked,gender:0 })
                                    }}>
                                        <View style={styles.radiobuttonSub}>
                                            <View style={{
                                                backgroundColor: this.state.checked ? 'white' : 'black',
                                                width: 14,
                                                height: 14,
                                                borderRadius: 7
                                            }}>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text> Nữ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                           style={[styles.inputStyleFull,!this.state.idcardValidate ? styles.error:null]}
                            onBlur={this.onBlur}
                            onChangeText={(idCard) => {this.setState({idCard}) ;this.validate(this.state.idCard,'idcard');}}
                            placeholder ='CMND...'
                            value={this.state.idCard}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                           style={[styles.inputStyleFull,!this.state.nationalityValidate ? styles.error:null]}
                            onBlur={this.onBlur} 
                            onChangeText={(nationality) =>{ this.setState({nationality}); this.validate(this.state.nationality,'nationality');}}
                            placeholder ='Quốc Tịch...'
                            value={this.state.nationality}
                        />
                    </View>
                </View>
                <View style={styles.footerContent}>
                    <View style={styles.flexControl}>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.InsertCustomer.bind(this)}>
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={INSERT_IMAGE}
                                />  
                                <Text onPress={this.CheckTextInput}>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.DeleteCustomer.bind(this)} >
                            <View>
                                <Image
                                    style={styles.iconControl}
                                    source={DELETE_IMAGE}
                                />   
                                <Text>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} onPress={this.UpdateCustomer.bind(this)}>
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

    // shouldComponentUpdate() {
    //     return false
    //   }
     
    // componentDidUpdate(){
    //     return true;
    // }

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
    bodyViewRadioButton:{
        width:'85%',
    },
    radioHorizion:{
        width:'27%',
        flexDirection:"row",
    },
    radioHorizionMain:{
        flexDirection:"row",
        marginBottom:10,
        width:'35%',
        justifyContent:"space-between",
    },
    radiobuttonMain:{
        width: 20,
        height: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    radiobuttonSub:{
        width: 17,
        height: 17,
        backgroundColor: 'white',
        borderRadius: 8.5,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 1
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