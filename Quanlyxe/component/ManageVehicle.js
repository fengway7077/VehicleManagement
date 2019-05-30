import React, { Component } from 'react';
import {FlatList,View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,TouchableHighlight,ActivityIndicator,Label ,Button} from 'react-native';
import { LinkVehicleInfo} from '../constLink/linkService.js';
import { VEHICLE_IMAGE } from './imageExport.js'
import { Tooltip } from 'react-native-elements';
export default class ManageVehicle extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            dataSource: null,
        };
    }
    getDataInfo(){
      //  console.warn("test");
        return fetch(LinkVehicleInfo)
        .then((response) => response.json())
        .then((responseJson) => {
       //  console.log(responseJson)
        this.setState({
            isLoading: false,
            dataSource: responseJson,
        } ,function(){ //console.warn(responseJson);
        });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    componentDidMount() {
      this.getDataInfo();    
    }

    render() {
        // if(this.state.isLoading){
        //     return(
        //       <View style={{flex: 1, padding: 20}}>
        //         <ActivityIndicator/>
        //       </View>
        //     )
        //   }
        const { dataSource } = this.state;
        return (
       <ScrollView style={styles.mainContainer}>
             <View style={styles.bodyContent}>   
               <View >
                <Text h1 style={styles.viewtitle}>
                  THÔNG TIN THỐNG KÊ 
                </Text>                                
              </View>

              <FlatList
               data={this.state.dataSource}         
              renderItem={({item}) =>  
               <View >    
                  <Text style={styles.texttitle} >
                  THÔNG TIN XE HIỆN TẠI
                 </Text> 
                     <View>
                        <Text>
                        </Text>                                
                    </View> 
                    <View>
                    <Tooltip popover={<Text>Xe có sẵn để cho thuê</Text>} style ={backgroundColor = "green"}>
                      <Text style={styles.textbody}>                
                        Số xe trống :   {item.countempty} Chiếc
                      </Text>   
                  </Tooltip>                             
                    </View>
                    <View>
                      <Text style={styles.textbody}>
                        Số xe sửa:   {item.countrepair}  Chiếc
                      </Text>                                                  
                    </View>
                    <View>
                        <Text style={styles.textbody}>
                        Số xe cho thuê:   {item.countretal} Chiếc
                        </Text>                                
                    </View>       
                     <View>
                        <Text>
                        </Text>                                
                    </View>
              <Text style={styles.texttitle}>
                  THÔNG TIN GÍA DỰ ĐỊNH
              </Text> 
              <View>
                    <Text>                 
                    </Text>                                
                 </View>     
              <View>
                  <Text style={styles.textbody}>                
                   Số giá xe trống dự tính:   {item.sumemptypurchase} VND
                  </Text>                                
                </View>
                <View>
                  <Text  style={styles.textbody}>
                    Số giá xe sửa dự tính:   {item.sumrepairpurchase} VND
                  </Text>                                
                </View>
                <View>
                    <Text  style={styles.textbody}>
                    Số giá xe cho thuê dự tính:   {item.sumretalpurchase} VND
                    </Text>                                
                </View>       
                 <View>
                    <Text>                 
                    </Text>                                
                 </View>       
                 <Text style={styles.texttitle}>
                  THÔNG TIN GÍA HIỆN HÀNH
                </Text>  
                <View>
                    <Text>                 
                    </Text>                                
                 </View>    
                 <View>
                  <Text  style={styles.textbody}>                
                   Số giá xe trống :   {item.sumemptyrental} VND
                  </Text>                                
                </View>
                <View>
                  <Text  style={styles.textbody}>
                    Số giá xe sửa:   {item.sumrepairrental} VND
                  </Text>                                
                </View>
                <View>
                    <Text  style={styles.textbody}>
                    Số giá xe cho thuê:   {item.sumretalrental} VND
                    </Text>                                
                </View>   
              
               </View>             
             } 
             />
            
             </View>  
             <View style={styles.footerContent}>
              <View style={styles.flexControl1}>
             <TouchableOpacity style={styles.touchableContent1}  onPress={() => this.props.navigation.navigate('ListVehicle')}   >
                <Text  style = {styles.textbutton}>
                Find Vehicle 
                </Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.touchableContent1}   onPress={() => this.props.navigation.navigate('ListCustomer')}   >
                <Text style = {styles.textbutton}>
                  Find Customer
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.touchableContent1}>
                <Text style = {styles.textbutton}>
                  Search jhb
                </Text>
            </TouchableOpacity> */}
          </View>
          </View>

       </ScrollView>
        );
      }
}


const styles = StyleSheet.create({
    mainContainer: {
        marginTop:20,
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
        marginTop:20,
        height:60,
        alignItems:'center',
        justifyContent:'center',
    },
    bodyView:{
        width:'85%',
        alignItems: 'center',
        justifyContent:'center',
    },
    flexBodyView:{
        marginTop:20,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    flexBodyViewLeft:{
        width:'48%'
    },
    flexControl:{
        width:'85%',
        flexDirection:'row',
        justifyContent:'space-between',
        position: 'absolute',
    },
    labelInput: {
        color: 'green',
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
    imageBodyView:{
        width:'50%',
        alignItems:'center'
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
    inputStyle: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius:1
    },
    pickerContent:{
        paddingLeft:7,
        paddingBottom:30,
        height: 40,
        width:'100%',
        borderWidth:1,
        justifyContent: 'center',
        borderRadius:1,
        borderColor: 'green',
    },
    imageStyle: {
        height:160,
        width:160,
    },
    noImageStyle: {
        height:160,
        width:160,
    },
    imageStyleRight :{
       width:160,
    },
    touchableContentImage:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
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
    textformart: {
       // borderRadius:2,
       // borderWidth:3,
        backgroundColor:'#483D8B',
        borderColor:'red' , 
        color:"green",
    },
    texttitle:{
        textAlign: 'center',
        backgroundColor:'#4682B4',
        color:"green", 
        fontWeight: 'bold',
        fontSize:20,
        textShadowColor: "black",
        textShadowRadius: 10 ,
        textDecorationColor: "yellow",  
    },
    textbody:{
        fontWeight: 'bold',
        color:"#708090", 
        fontSize:15,
    },
    viewtitle:{
        fontWeight: 'bold',
        fontSize:25,
        color:"green",
        paddingBottom: 15, 
    },
    textbutton: {
      //  borderWidth: 1,
      //  padding: 25,
        borderColor: 'black',
      //     backgroundColor: '#708090',
      //  alignItems: 'center',
        height: 25,
        width:'100%',
       // justifyContent: 'center', 
      
      position: 'absolute',
    },
    flexControl1:{
        width:'100%',
        flexDirection:'row',
      //  justifyContent:'space-between',
        position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchableContent1:{
        width:'33%',
        height:45,
        backgroundColor: 'green', 
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
        paddingRight: 20 ,
        borderWidth: 2,
    },
  });