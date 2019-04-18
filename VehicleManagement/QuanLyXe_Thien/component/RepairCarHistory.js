import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
export default class RentalHistory extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            vehicleID: '' ,
            vehicleName: '',
            customerID:'',
            customerName:'',
            phone:'',
            status: '',
            price: '',
        };
    }

    // componentDidMount(){
    //     fetch('http://192.168.11.128:3333/', {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "customerName": "a"
    //         }),
    //     }).then((response) => response.json())
    //     .then((responseJson) => {
    //       return responseJson;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }

    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                {/* <View style={styles.headerContent}>
                    <Text style={styles.textStyle}>Manage Car Repair History</Text>
                </View> */}
                <View style={styles.bodyContent}>
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
                            style={styles.inputStyleGuess}
                            onChangeText={(phone) => this.setState({phone})}
                            placeholder ='Số Điện Thoại...'
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(status) => this.setState({status})}
                            placeholder ='Tình Trạng...'
                            value={this.state.status}
                        />
                    </View>
                    <View style={styles.bodyView}>
                        <TextInput
                            style={styles.inputStyleFull}
                            onChangeText={(price) => this.setState({price})}
                            placeholder ='Số Tiền Sửa...'
                            value={this.state.price}
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