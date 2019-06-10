import React, { Component } from 'react';
import { TextInput,View,Text,StyleSheet,Image,TouchableOpacity ,Button,AsyncStorage} from 'react-native';
export default class HiddenScreen extends React.Component {
    constructor(props) {
        super(props);
        this._clearUser();
    }
    _clearUser = async()=>{   
        try {
         //   await AsyncStorage.removeItem('user');
            await AsyncStorage.clear();
            this.props.navigation.navigate('Login'); 
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }
    }
    _loadDataUser = async() =>{
     try {
        const isLoggedIn = await AsyncStorage.getItem('user');
        this.props.navigation.navigate( isLoggedIn !== null ? 'Logout' : 'Login');  
    } catch (error) {
        console.log(error);
      }
    }

  render() {
    console.disableYellowBox = true; //fix warn yellow
    return (
    <View style={styles.mainContainer}>
      <View style={styles.bodyContent}>
        {/* <Text  style={styles.texttitle}>
           BACK TO LOGIN 
        </Text> */}
        {/* <Button 
          title="Logout"
        //  onPress={() => this.props.navigation.navigate('Login')}
           onPress={this._clearUser}
        /> */}
          <View style={styles.flexControl1}>
                <TouchableOpacity style={styles.touchableContent1}   onPress ={this._clearUser}>           
                    <Text  style = {styles.textbutton}>
                    LOGOUT 
                    </Text>             
                </TouchableOpacity >
          </View>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 50,
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
    flexControl1:{
        width:'100%',
        flexDirection:'row',
      //  justifyContent:'space-between',
        position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:  40, 
    },
    inputStyleFull: {
        height: 40,
        width:'100%',
        borderWidth:1,
        borderColor: '#428AF8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
        borderRadius: 2
    },
    textbutton: {
       //   justifyContent: 'center',
          borderWidth:2,
          borderColor: 'pink',
           height: 45,
           width: 80,   
           alignItems: 'center',  
           backgroundColor: 'green', 
           padding:12,
      },
      texttitle:{
      fontSize: 18,
       textAlign: 'center',
        marginBottom: 15 
      },
})