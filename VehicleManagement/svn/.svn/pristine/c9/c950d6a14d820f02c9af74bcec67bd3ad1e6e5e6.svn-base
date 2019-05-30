import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
import { LinkInsertCustomer , LinkUpdateCustomer } from '../constLink/linkService.js';

export default class ManageCustomer extends Component{
    constructor(props) {
        super(props);
        params = this.props.navigation.getParam('params', null);
        if(params === null){
            this.state ={ 
                customerCode : '',
                lastName     : '',
                firstName    : '',
                age          : '',
                address      : '',
                phone        : '',
                email        : '',
                gender       : '',
                idCard       : '',
                nationality  : '',
                checked      : false
            };
        }
        else
        {
            item = params.item
            this.state = { 
                customerCode : item.customercode,
                lastName     : item.lastname,
                firstName    : item.firstname,
                age          : item.age.toString(),
                address      : item.address,
                phone        : item.phone,
                email        : item.email,
                gender       : item.gender,
                idCard       : item.idcard,    
                nationality  : item.nationality,
                checked      : item.gender === 1 ? true:false
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
                "age"          : this.state.age,
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
                "age"         : this.state.age,
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
                alert("Thêm Thành Công",params.reFetchListVehicle(),this.props.navigation.navigate('ListVehicle'));
            }
            return;
        })
        .catch((error) => {
            console.error(error);
        });
    };

    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.bodyContent}>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(lastName) => this.setState({lastName})}
                            placeholder ='Họ Khách Hàng...'
                            value={this.state.lastName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(firstName) => this.setState({firstName})}
                            placeholder ='Tên Khách Hàng...'
                            value={this.state.firstName}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(age) => this.setState({age})}
                            placeholder ='Ngày Sinh...'
                            value={this.state.age}
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
                            style={styles.inputStyleFull}
                            onChangeText={(phone) => this.setState({phone})}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(email) => this.setState({email})}
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
                            style={styles.inputStyleFull}
                            onChangeText={(idCard) => this.setState({idCard})}
                            placeholder ='CMND...'
                            value={this.state.idCard}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(nationality) => this.setState({nationality})}
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
                                <Text>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableContent} >
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
})