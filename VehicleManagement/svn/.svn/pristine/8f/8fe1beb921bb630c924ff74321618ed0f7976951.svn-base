import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { DELETE_IMAGE,INSERT_IMAGE,UPDATE_IMAGE  } from "./imageExport.js";
import { ScrollView } from 'react-native-gesture-handler';
export default class ManageCustomer extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            lastName: '' ,
            firstName: '',
            address:'',
            phone:'',
            email:'',
            status: '',
            idCard:'',
            nationnality:'',
            checked: true
        };
    }
    render(){
        return(
            <ScrollView style={styles.mainContainer}>
                {/* <View style={styles.headerContent}>
                    <Text style={styles.textStyle}>Customer Information Management</Text>
                </View> */}
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
                                        this.setState({ checked: !this.state.checked })
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
                                        this.setState({ checked: !this.state.checked })
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
    bodyViewRadioButton:{
        width:'85%',
    },
    radioHorizion:{
        width:'25%',
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
        borderRadius: 10
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