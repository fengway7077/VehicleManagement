import React, { Component } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TextInput,Picker,TouchableOpacity ,AsyncStorage,Animated,RefreshControl} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { PanGestureHandler,State ,ScrollView } from 'react-native-gesture-handler';
import { SEARCH_IMAGE } from './imageExport.js'
import ManageCustomer from './ManageCustomer.js'
import { LinkListCustomer, LinkSearchListCustomer ,customerService} from '../constLink/linkService.js'
class ListCustomer extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            search: '',          
            offsetData: 0,
            refreshing: false,
            myRowCount: 0,
        };
    }

    getDataCustomer(){
        return fetch(LinkListCustomer)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
        }, function(){

        });

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    componentDidMount(){
        // this.props.navigation.navigate('Login');
        this.getDataCustomer();
        //page list
        // this.list.setNativeProps({
        //     scrollEnabled: false,
        //   });

    }   
    
    UpdateSearch = search => {
        this.setState({ search },() => {
            fetch(LinkSearchListCustomer, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "lastname"  : this.state.search,
                    "firstname" : this.state.search,
                    "fullname"  : this.state.search ,
                     pageIndex: this.state.offsetData,
                }),
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                   // dataSource: responseJson,
                    dataSource: responseJson.rows,
                    myRowCount: responseJson.rows[0].mycount,//
                });
               // console.log("myRowCount" + this.state.myRowCount);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    };

  loadDataSearch(offset){
      console.log("offset" + offset);
    //   if(parseInt(offset) == null )
    //   {
    //     offset = offset + 5
    //   }
       this.setState({  isLoading: true });
        fetch(LinkSearchListCustomer, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "lastname"  : this.state.search,
                "firstname" : this.state.search,
                "fullname"  : this.state.search,
                  pageIndex: offset ,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
          //  console.log("tes" + responseJson) ;
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
     console.info( "myRowCount" +this.state.myRowCount)
        if (this.state.offsetData > this.state.myRowCount){     //25 > 22
            if( this.state.offsetData < this.state.myRowCount + 5  ){  //25 < 22 +5
                this.state.offsetData ;
                console.log( "   this.state.offsetData" +   this.state.offsetData) ;
            }else{
                this.state.offsetData = 0; 
            }
        }else{
            this.state.offsetData ;  
        }    
        this.setState(    {
            offsetData: this.state.offsetData + 5
          },
        );
        this.loadDataSearch( this.state.offsetData);
      };

      handleLoadMore = () => {  
        var offsetData_  = this.state.offsetData != 0 ? 0 : this.state.offsetData -5;
        console.info("test 2 " + this.state.offsetData);
        this.setState(   {
            offsetData: offsetData_ ,
            refreshing: true,
          },
          () => {
            this.UpdateSearch;
          }
        );
      };
  
  
    render(){
        const { search } = this.state;
        
        return(
    
              <ScrollView style={styles.mainContainer}
                refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }   
              //  contentOffset = {[-4, 4]} 
              //   horizontal
              //  pagingEnabled
               // showsHorizontalScrollIndicator={false}
              //  directionalLockEnabled
               // contentInset={{top: 1}}
               // onEndReached={this.handleLoadMore}
              //  scrollEnabled ={true}
              onScrollAnimationEnd ={this.handleLoadMore}
              >
                 <View style={styles.contentSearch}>
                    <View style={styles.contentChildSearch}>
                        <Image style={styles.iconInputSearch} source={SEARCH_IMAGE}/>
                       <TextInput
                             style={styles.searchStyle}
                             placeholder="Nhập Tên Khách Hàng Muốn Tìm Kiếm..."
                            onChangeText={this.UpdateSearch}
                            value={search}
                         />
                  </View>             
               </View>

                <View style={styles.bodyContent}> 
                {/* <PanGestureHandler>
                    activeOffsetX={[-4, 4]}
                    onHandlerStateChange={() => {
                    if (nativeEvent.state === State.ACTIVE) {
                        this.list.setNativeProps({
                        scrollEnabled: true,
                        });
                    }
                    }} 
                    >  
                    <Text>he</Text>  
                 </PanGestureHandler>   */}
                {/* <Animated.View> */}
                    <FlatList
                        style={styles.flatStyle}
                        data={this.state.dataSource}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableStyle}
                                onPress={
                                    () => this.props.navigation.navigate('ManageCustomer',
                                        { 
                                            params: { 
                                                item,
                                                reFetchCustomer: (() => {
                                                    this.getDataCustomer()
                                                }).bind(this)
                                            } 
                                        }
                                    )
                                }
                            >
                                <View style={styles.bodyListView}>
                                    <View style={styles.listViewChild}>
                                        <View style={styles.listViewChildLeft}>
                                            <Image style={styles.imageStyle}
                                                // onLayout={ 
                                                //     () => {
                                                //         console.log(item)
                                                //         console.log(customerService + (item.customerimage === null ? "": item.customerimage.toString()) )
                                                //     }
                                                // } 
                                               // source={{uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/12/11/naturo-monkey-selfie.jpg?w968h681'}}
                                              // source={{ uri:  'http://192.168.11.129:3333/image/customer/baby.jpg' }}
                                               source={{ uri:    (item.customerimage === null ? customerService + "/noimage.png": customerService + item.customerimage.toString())}}        
                                            />

                                             {/* <Image style={styles.imageStyle}
                                                source={require('../Photo/Customer/baby.jpg'  )}
                                            /> */}
                                        </View>
                                        <View style={styles.listViewChildRight} id={item.customercode}>
                                            <Text style={styles.generalStyle}>Người Thuê : {item.fullname}</Text>
                                            <Text style={styles.generalStyle}>Giá : {item.phone}</Text>
                                            <Text style={styles.generalStyle}>Trạng Thái : {item.address}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={({customercode}, index) => customercode.toString()}
                      
                    //      pagingEnabled
                    //      showsHorizontalScrollIndicator={false}
                    //      horizontal
                    //      ref={list => {
                    //         this.list = list;
                    //       }}
                    //        onMomentumScrollEnd={() => {  this.list.setNativeProps({ scrollEnabled: false })  } }    

                      />
               
                    {/* </Animated.View> */}
                 
                </View>
            </ScrollView>
         
        );
    }
}

const RootContent = createStackNavigator(
    {
        ListCustomer: {
            screen: ListCustomer,
            navigationOptions: {
                title: 'ListCustomer',
               // headerLeft: <TouchableOpacity
                //      onPress={() => navigation.navigate('ManageCustomer')} ><Text>Back</Text></TouchableOpacity>,
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: 'center',
                },
                headerTintColor: 'white',
            },
        },
        ManageCustomer: {
            screen: ManageCustomer,
            navigationOptions: {
                title: 'ManageCustomer',
                headerStyle: {
                  backgroundColor: '#FF9800',
                  textAlignVertical: "center",
                },
                headerTintColor: 'white',
            }
        },
    },
    {
        initialRouteName: 'ListCustomer',
    }
);
  
const AppContainer = createAppContainer(RootContent);
  
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._loadDataUser();
    }
     //get user info
   _loadDataUser = async() =>{
    try{
     const isLoggedIn = await AsyncStorage.getItem('user');
     this.props.navigation.navigate( isLoggedIn !== null ? 'ListCustomer' : 'Login');  
     console.log("test  "+ isLoggedIn);
    }catch{
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
    },
    contentChildSearch:{
        height:40,
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
        borderRadius:1,
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