import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import {SEARCH_IMAGE} from './imageExport.js'
export default class VehicleStatus extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            imageVehicle: '' ,
            vehicleName: '',
            price:'',
            status:'',
            search: '',
        };
    }
    updateSearch = search => {
        this.setState({ search });
    };
    render(){
        const { search } = this.state;
        return(
            <ScrollView style={styles.mainContainer}>
                {/* <View style={styles.headerContent}>
                    <Text style={styles.textStyle}>Manage Car Repair History</Text>
                </View> */}
                <View style={styles.contentSearch}>
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
                        <Text style={styles.spaceRight}></Text>
                    </View>
                </View>
               
                <View style={styles.bodyContent}>
                    <FlatList
                        style={styles.flatStyle}
                        data={[
                            {status:'qwe',price:'128000',vehicleName:'sad',key: 'Jackson22'},
                            {status:'ewq',price:'127000',vehicleName:'123',key: 'Devin3'},
                            {status:'cc',price:'120600',vehicleName:'gfd',key: 'James6'},    
                            {status:'cc',price:'120500',vehicleName:'ád',key: 'Joel0'},
                            {status:'AAA',price:'122000',vehicleName:'ád',key: 'John9'},
                            {status:'cCCCc',price:'120000',vehicleName:'sf',key: 'Jillian8'},
                            {status:'WWW',price:'120000',vehicleName:'Bni',key: 'Jimmy7'},
                            {status:'QQQ',price:'127000',vehicleName:'Phong cui',key: 'Julie6'},
                            {status:'qwe',price:'128000',vehicleName:'sad',key: 'Jackson5'},
                            {status:'ewq',price:'127000',vehicleName:'123',key: 'Devin4'},
                            {status:'cc',price:'120600',vehicleName:'gfd',key: 'James3'},    
                            {status:'cc',price:'120500',vehicleName:'ád',key: 'Joel2'},
                            {status:'AAA',price:'122000',vehicleName:'ád',key: 'John1'},
                            {status:'cCCCc',price:'120000',vehicleName:'sf',key: '9Jillian'},
                            {status:'WWW',price:'120000',vehicleName:'Bni',key: '8Jimmy'},
                            {status:'QQQ',price:'127000',vehicleName:'Phong cui',key: 'Julie'},
                            {status:'qwe',price:'128000',vehicleName:'sad',key: '7Jackson'},
                            {status:'ewq',price:'127000',vehicleName:'123',key: '6Devin'},
                            {status:'cc',price:'120600',vehicleName:'gfd',key: '5James'},    
                            {status:'cc',price:'120500',vehicleName:'ád',key: '4Joel'},
                            {status:'AAA',price:'122000',vehicleName:'ád',key: '3John'},
                            {status:'cCCCc',price:'120000',vehicleName:'sf',key: '2Jillian'},
                            {status:'WWW',price:'120000',vehicleName:'Bni',key: '1Jimmy'},
                            {status:'QQQ',price:'127000',vehicleName:'Phong cui',key: '1213'},
                        ]}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                            onPress={() => this.props.navigation.navigate('RepairCarHistory')}>
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            />
                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên Xe : {item.vehicleName}</Text>
                                            <Text style={styles.generalStyle}>Giá : {item.price}</Text>
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.status}</Text>
                                        </View>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
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