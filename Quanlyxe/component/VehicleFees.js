import React, { Component } from 'react';
import {View,Text,StyleSheet,Image,FlatList,TextInput,Button, TouchableOpacity, AsyncStorage,RefreshControl} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import RentalHistory from './RentalHistory';
import {SEARCH_IMAGE} from './imageExport'
import {LinkVehicleFees,LinkSearchVehicleFees,customerService,LinkVehicleFeesPage,LinkSearchVehicleFeesPage} from '../constLink/linkService'

class VehicleFees extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isloading:true,
            search:'',
            offsetData: 0,
            myRowCount: 0,
            dataRowCount : 0,
            pageItem: 7,
            refreshing: false,
        };
      //  this._loadDataUser();
    }

    // getDataVehicleFees(){
    //     return fetch(LinkVehicleFees)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson)
    //     this.setState({
    //         isLoading: false,
    //         dataSource: responseJson,
    //     }, function(){

    //     });

    //     })
    //     .catch((error) =>{
    //     console.error(error);
    //     });
    // }
   
    getDataVehicleFeesPage(offset){
        //   console.log("offset" + offset);
            this.setState({  isLoading: true });
             fetch(LinkVehicleFeesPage, {
                 method: "POST",
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                       pageIndex: offset ,
                       pageItem: this.state.pageItem,
                 }),
             }).then((response) => response.json())
             .then((responseJson) => {
               //  console.log("tes" + responseJson) ;
               if( responseJson.rowCount !== 0 ){
                   this.setState({
                       isLoading: false,
                       dataSource: responseJson.rows,
                       dataRowCount:  responseJson.rows[0].datacount,//
                   });
                }else{
                   this.setState({
                     dataRowCount:  null,//
                 });
               }       
             })
             .catch((error) => {
               console.error(error);
             });
       }


    componentDidMount(){
        // this.getDataVehicleFees();
        this.getDataVehicleFeesPage(this.state.offsetData);
    }   
    
    seacrchVehicleFees(){
        fetch(LinkSearchVehicleFeesPage, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstname": this.state.search,
                "lastname" : this.state.search,
                "fullname" : this.state.search ,
                 pageIndex: this.state.offsetData,
                 pageItem: this.state.pageItem,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson)
            // this.setState({
            //     isLoading: false,
            //     dataSource: responseJson,
            // });
            if( responseJson.rowCount !== 0 ){
                this.setState({
                   dataSource: responseJson.rows,
                   isLoading: false,
                   myRowCount: responseJson.rows[0].mycount ,
                });
            }else{
                this.setState({
                    myRowCount: null ,//
                });
            }          
        })
        .catch((error) => {
        console.error(error);
        });
    }

    updateSearch = search => {
        this.setState({ search },this.seacrchVehicleFees.bind(this));
    };


    loadDataSearch(offset){
       // console.log("offset" + offset);
         this.setState({  isLoading: true });
          fetch(LinkSearchVehicleFeesPage, {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "firstname": this.state.search,
                "lastname" : this.state.search,
                "fullname" : this.state.search,
                 pageIndex: offset,
                 pageItem: this.state.pageItem,
              }),
          }).then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                  isLoading: false,
                  dataSource: responseJson.rows,
              });
          })
          .catch((error) => {
            console.error(error);
          });
    }
    _onRefresh = () => {  
       // console.info( "dataRowCount" +this.state.dataRowCount)

         var pageRow =   this.state.myRowCount;
         var dataRC = this.state.dataRowCount;
         this.setState({refreshing: true});
         //get   
         if(this.state.search == ""){
             if (this.state.offsetData > dataRC){         
                 this.state.offsetData = 0; 
            }else{    
                 this.state.offsetData ;
            //     console.info( "v"  + this.state.offsetData);
            }   
         }else{
             if (this.state.offsetData > pageRow){     //14 > 8        
                 this.state.offsetData = 0; 
           }else{    
               this.state.offsetData; 
         } 
         }
 
         this.setState(    {
            offsetData: this.state.offsetData + this.state.pageItem,
           },
         );        
         if(this.state.search != ""){
             this.loadDataSearch( this.state.offsetData);
             this.setState({refreshing: false});
         }else{
             this.getDataVehicleFeesPage(this.state.offsetData);
             this.setState({refreshing: false});
         }
        
       };


    render(){
        const { search } = this.state;
        console.disableYellowBox = true; //fix warn yellow
        return(
            <ScrollView style={styles.mainContainer} 
             refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> } 
            >
                <View style={styles.contentSearch}>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                        <TextInput
                            style={styles.searchStyle}
                            placeholder="Nhập Tên Khách Hàng Muốn Tìm Kiếm..."
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
                </View>

                <View style={styles.bodyContent}>
                    <FlatList
                        style={styles.flatStyle}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                            onPress={() => this.props.navigation.navigate('RentalHistory',{ 
                                params: { 
                                    item,
                                    reFetchVehicleFees: (() => {
                                        this.getDataVehicleFeesPage()
                                    }).bind(this)
                                } 
                            })}>
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            <Image style={styles.imageStyle}
                                              //  source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                              source={{ uri:  (item.customerimage === null  ? customerService + "/noimage.png": customerService + item.customerimage.toString())}}        
                                           />
                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên KH : {item.fullname}</Text>
                                            <Text style={styles.generalStyle}>SDT : {item.phone}</Text>
                                            <Text style={styles.generalStyle}>Ngày Thu Tiền : {item.payday.replace(/T/, ' ').replace(/\..+/, '')}</Text>
                                        </View>
                                        </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={({vehiclecode}, index) => vehiclecode.toString() }
                    />
                </View>
            </ScrollView>
        );
    }
}

const RootContent = createStackNavigator(
{
    VehicleFees: {
        screen: VehicleFees,
        navigationOptions:{
            title: 'List Of VehicleFees',
            headerStyle: {
                width:'100%',
                textAlign: 'center',
                color: 'white',
                backgroundColor:'green',
                textAlignVertical: "center",
                fontSize:11,
                height:50,
            },
            headerTintColor: 'white',
        },
    },
    RentalHistory: {
        screen: RentalHistory,
        navigationOptions: {
            title: 'Manage Car Rental History',
            headerStyle: {
                width:'100%',
                textAlign: 'center',
                color: 'white',
                backgroundColor:'green',
                textAlignVertical: "center",
                fontSize:11,
                height:50,
            },
            headerTintColor: 'white',
        },
    },
},
{
    initialRouteName: 'VehicleFees',
}
);
  
const AppContainer = createAppContainer(RootContent);
  
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._loadDataUser();
    }
       //get user  info
       _loadDataUser = async() =>{
        try{
        const isLoggedIn = await AsyncStorage.getItem('user');
        this.props.navigation.navigate( isLoggedIn !== null ? 'VehicleFees' : 'Login');  
      } catch (error) {
        console.log(error);
      }
    }
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
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
        height:50
    },
    contentChildSearch:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderWidth:1,
        marginBottom:8,
        borderRadius:1,
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
    imageStyle: {
        height:100,
        width:'100%',
    },
})