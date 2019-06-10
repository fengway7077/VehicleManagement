import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity ,RefreshControl ,Alert,ActivityIndicator,ListView,AsyncStorage} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { SEARCH_IMAGE } from './imageExport.js'
import VehicleRegistration from './VehicleRegistration.js'
import { LinkListVehicle,LinkSearchListVehicle ,vehicleService} from '../constLink/linkService.js'
import { List, ListItem, SearchBar } from "react-native-elements";
import Swipeout from "react-native-swipeout"
// import { type } from 'os';
class ListVehicle extends Component{
    constructor(props) {
        super(props);
       // this._loadDataUser();
        this.state = { 
            tempImage: '',
            isLoading: true,
            search: '',
            refreshing: false,
            activeRowKey:null,          
          ////  pageIndex: 0,
            dataSource: [],
            offsetData: 0,
            fetching_from_server: false,
            isListEnd :false,
            error: null,
        };
      //  offsetData: 0; //Index of the offset to load from web API
     ///    this.updateSearch();
    }
   //get user info
   _loadDataUser = async() =>{
        try {
         const isLoggedIn = await AsyncStorage.getItem('user') || 'none';
         this.props.navigation.navigate( isLoggedIn !== null ? 'ListVehicle' : 'Login');  
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
   }


    getDataVehicle(){
        return fetch(LinkListVehicle)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
           // refreshing: false,
        }, function(){

        });

        })
        .catch((error) =>{
        console.error(error);
        });
    }

    componentDidMount(){
        this._loadDataUser();
        if (this.state.search == ""){        
           this.getDataVehicle();
        }else{
           this.updateSearch();
        }
    }   
    
    updateSearch = search => {
          const{offsetData} =this.state;//
          this.setState({ loading: true });//
        this.setState({ search }, () => {
            fetch(LinkSearchListVehicle, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "vehicletype": this.state.search,
                     pageIndex: this.state.offsetData,
                }),
            }).then((response) => response.json())
            .then((responseJson) => {              
                this.setState({
                    dataSource: responseJson, 
                 //  dataSource: responseJson.rows,
                //   dataSource: this.state.offsetData === 0 ? responseJson.rows :[...this.state.dataSource, ...responseJson.rows ], 
                   isLoading: false,
                   refreshing: false,
                });
            })
            .catch((error) => {
              console.error(error);
              this.setState({ error, loading: false });
            });
        });
    };


    // updateSearch = search => {
    //     console.log("test");
      
    //  if (!this.state.fetching_from_server && !this.state.isListEnd) {
    //     this.setState({ fetching_from_server: true });
    //     this.setState({ search }, () => {
    //         fetch(LinkSearchListVehicle, {
    //             method: "POST",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "vehicletype": this.state.search,
    //                  pageIndex: this.state.offsetData,
    //             }),
    //         }).then((response) => response.json())
    //         .then((responseJson) => {
    //              if(responseJson.rows.length > 1){
    //                  this.offsetData = this.offsetData + 5; ////Successful response from the API Call
    //             this.setState({
    //                 fetching_from_server: false,
    //                 dataSource:  [...this.state.dataSource, ...responseJson.rows],
    //              //   refreshing: false,
    //             });
    //           }else{
    //             this.setState({
    //                 fetching_from_server: false,
    //                 isListEnd: true,
    //               });
    //           }
        
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     });
    //  } //end if
    // };
    
    // _onRefresh=()=>{
    //    // console.warn("test12");
    //     this.setState({refreshing: true ,

    //        // offsetData : this.state.offsetData + 5,
    //     });
       
    //    console.warn( "test88" + this.state.search);
	// 	// this.updateSearch().then(() =>{
	// 	// 	this.setState({refreshing: false})
    //     // });
    //    setTimeout(() => this.setState({ refreshing: false,
    //      // offsetData : this.state.offsetData + 5 ,
    //     }), 5000);
    //   this.updateSearch();
    
	// }

    handleRefresh = () => {
        var offsetData_  = this.state.offsetData != 0 ? 0 : this.state.offsetData -5;
        this.setState(
          {
            offsetData: offsetData_,
            refreshing: true,
          },
        //   () => {
        //     this.updateSearch();
        //   }
        );
      };
    handleLoadMore = () => {  
        this.setState(    {
            offsetData: this.state.offsetData + 5
          },
          () => {
            this.updateSearch();
          }
        );
      };

    // renderHeader = () => {
    //     return <SearchBar placeholder="Type Here..." lightTheme round />;
    //   };
    renderSeparator = () => {
        return (
          <View
            style={styles.renderSeparator}
          />
        );
      };
      renderFooter = () => {
        if (!this.state.fetching_from_server) return null;  
        return (
          <View style={ styles.renderFooter }  >
            <ActivityIndicator animating size="large"  style={{ margin: 15 }} />
          </View>
        );
      };

    render(){
        const { search } = this.state;
        const { navigate } = this.props.navigation;
        // const swipeSetting = {
        //     autoClose :true,
        //     onClose:(secId,rowId,direction)=>{
        //         if(this.state.activeRowKey != null){
        //             this.setState({activeRowKey:null})
        //         }

        //     },
        //     onOpen:(secId,rowId,direction)=>{
        //          this.setState({activeRowKey:this.props.item.vehiclecode});  //key
        //     },
        //     right:[ 
        //         {
        //             onPress:()=>{
        //                 Alert.alert(
        //                     'Alert',
        //                     'Are you sure you want to delete?',
        //                     [
        //                       {text:'No' ,onPress:()=>console.log('Cancel Pressed'),style:'cancel'},  
        //                       {text:'Yes',onPress:()=>{
        //                           flatListData.splice(this.props.index,1);//remove object from an Array
        //                       }},
        //                     ],
        //                     {cancelable:true}
        //                 );

        //             },
        //             text:'Delete', type:'delete'
        //         }       
        //     ],
        //     rowId:this.props.index,
        //     sectionId:1
        // };

        // if (this.state.isLoading) {
        //     return (
        //       <View style={{flex: 1, paddingTop: 20}}>
        //         <ActivityIndicator />
        //       </View>
        //     );
        //   }
     console.disableYellowBox = true; //fix warn yellow
        return(
            <ScrollView style={styles.mainContainer}  >
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
                </View>   
                <View style={styles.bodyContent}>
                {/* {this.state.loading ? (
                 <ActivityIndicator size="large" />
                  ) : ( */}
                    <FlatList
                        style={styles.flatStyle}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                                onPress={
                                 //  () => navigate('ManageVehicle',
                                    () => navigate('VehicleRegistration',
                                        { 
                                            params: { 
                                                item,
                                                reFetchVehicle: (() => {
                                                    this.getDataVehicle()
                                                }).bind(this)
                                            } 
                                        }
                                    )
                                }>
                                {/* <Swipeout {...swipeSetting}>     */}
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            {/* <Image style={styles.imageStyle}
                                                source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                            /> */}
                                               <Image
                                                // onLayout={ 
                                                //     () => {
                                                //         console.log(item)
                                                //         console.log(vehicleService + item.vehicleimage.toString())
                                                //     }
                                                // } 
                                                style={styles.imageStyle}
                                                //  source={{ uri:  '../Photo/Customer/baby.jpg' }}
                                                 // source={{ uri:  'http://192.168.11.129:3333/image/vehicle/honda-wave-110.jpg' }}
                                                  source={{ uri:  (item.vehicleimage === null? vehicleService + "/noimage.png": vehicleService + item.vehicleimage.toString())}}                                                                      
                                                //  style={{width: 140, height: 100}} 
                                            />

                                        </View>
                                        <View style={styles.listViewChildRight}>
                                            <Text style={styles.generalStyle}>Tên Xe : {item.vehiclename}</Text>
                                            <Text style={styles.generalStyle}>Giá : {item.rentalprice}</Text>
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.status=== 0 ?"Trống":item.status=== 1 ?"Cho Thuê":'Bảo Trì'}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* </Swipeout> */}
                            </TouchableOpacity>
                        }
                        keyExtractor={({vehiclecode}, index) => vehiclecode.toString()}
                        // refreshControl={
                        //     <RefreshControl
                        //     onRefresh={this.handleRefresh}
                        //     refreshing = {this.state.refreshing}
                        //     onEndReached={this.handleLoadMore}
                        //     tintColor="#ff0000"
                        //      title="Loading..."
                        //      titleColor="#00ff00"
                        //      colors={["red", "green", "blue"]}
                        //      progressBackgroundColor="#ffff00" 
                        //    //  onEndThreshold={0}  
                        //     //  pagingEnabled={true} 
                        //     />
                        // }
                        
                        //  ItemSeparatorComponent={this.renderSeparator}
                        // // // ListHeaderComponent={this.renderHeader}
                        //  ListFooterComponent={this.renderFooter}
                        //  onRefresh={this.handleRefresh}
                        //  refreshing={this.state.refreshing}
                        //  onEndReached={this.handleLoadMore}
                        //  onEndReachedThreshold={50}
                    />
                    {/* )}  */}
                </View>
            </ScrollView>
        );
    }
}

const RootContent = createStackNavigator(
    {
        ListVehicle: {
            screen: ListVehicle,
            navigationOptions: {
                title: 'ListVehicle',
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: 'center',
                },
                headerTintColor: 'white',
            },
        },
        VehicleRegistration: {
            screen: VehicleRegistration,
            navigationOptions: {
                title: 'VehicleRegistration',
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: "center",
                },
                headerTintColor: 'white',
            }
        },
    },
    {
        initialRouteName: 'ListVehicle',
    }
);
  
const AppContainer = createAppContainer(RootContent);
  
export default class App extends React.Component {
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
    },
    contentChildSearch:{
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        borderWidth:1,
        marginBottom:8,
        borderRadius:11,
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
        marginBottom:8
    },
    pickerContentChild:{
        justifyContent:'center',
        height:40,
        width:'50%',
        borderRadius:1,
        borderColor:'black',
        borderWidth:1,
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
    renderSeparator:{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    },
    renderFooter:{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    },
})