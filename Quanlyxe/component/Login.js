import React, { Component } from 'react';
import {TextInput,View,Text,StyleSheet,Image,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import { LinkUser} from '../constLink/linkService.js';
export default class Login extends Component{
    constructor(props) {
        super(props);
        
        this.state = { 
            accountName: '',
            passWord: '',
            accountnameValidate: true,
            passwordValidate:true,
        };
    }
    validate(text,type){
     //   console.log("test");
        alph =/^[a-zA-Z]+$/;
        mediumRegex  = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        if (type = 'accountname') {
            if((alph.test(text) )&& ( text != null )){
               this.setState({accountnameValidate:true})
            // /console.log("ok");
            }else{
             // console.log("ng");
              this.setState({accountnameValidate:false});}
          }else if(type = 'password'){
            if((mediumRegex.test(text)) &&  ( text != null)){
                 this.setState({passwordValidate:true})
                 console.log("ok");
             }else{
                 console.log("ng");
                this.setState({passwordValidate:false}); }       
        }   
    }

  render() {
    //const { accountName, passWord } = this.state;
    console.disableYellowBox = true; //fix warn yellow
    return (
        <View style={styles.mainContainer}>
        <View style={styles.bodyContent}>
             <View style={styles.bodyView}>
                        <TextInput   
                            style={[styles.inputStyleFull,!this.state.accountnameValidate ? styles.error:"✔️"]}              
                            onBlur={this.onBlur} 
                            onChangeText={(accountName) => {this.setState({accountName}) ; this.validate(this.state.accountName,'accountname');}}
                            placeholder ='UserName...'
                            value={this.state.accountName}
                            keyboardType="ascii-capable"
                            placeholderTextColor = "#002f6c"
                            onSubmitEditing={()=> this.password.focus()}
                            autoCapitalize="none"
                        />
                    </View>
             <View style={styles.bodyView}>
                     <TextInput      
                            style={[styles.inputStyleFull,!this.state.passwordValidate ? styles.error:null]}     
                        //    style={styles.inputStyleFull}                
                            onBlur={this.onBlur} 
                            onChangeText={(passWord) => {this.setState({passWord}) ; this.validate(this.state.passWord,'password');}}
                            placeholder ='Password...'
                            value={this.state.passWord}
                            placeholderTextColor = "#002f6c"
                            secureTextEntry={true} // *
                            ref={(input) => this.password = input}
                        />
               </View>

      </View>
      <View>
          <View style={styles.footerContent}>
                    <View style={styles.flexControl1}>
                        <TouchableOpacity style={styles.touchableContent1}   onPress ={this.login}>
                           {/* { this.state.accountnameValidate && this.state.passwordValidate ? */}
                           <Text  style = {styles.textbutton}>
                            LOGIN 
                          </Text>
                             {/* : null    
                           }            */}
                        </TouchableOpacity >
                      
                    </View>
          </View>
          </View>
      </View>
    );
  }
  login=( )=>{
      fetch(LinkUser, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountname   : this.state.accountName,
            password   : this.state.passWord,               
        }),
    }).then((response) =>  response.json())
    .then((responseJson) => {
       //  if(responseJson.success === true  ){
          if(responseJson.rowCount === 1 ){
            var name = JSON.stringify(responseJson.rows[0].accountname) ;//get username
            var pass = JSON.stringify(responseJson.rows[0].password) ;//get username
            alert("Login success",this.props.navigation.navigate('ManageVehicle'));
            //set user info
            try{
             // const userInfo = {username: responseJson.accountname,password: responseJson.password} 
             //  const userInfo = {username: name,password: pass}
              // AsyncStorage.setItem('user',userInfo);
              AsyncStorage.setItem('user',"responseJson"); //string
              this.setState({ 'user': responseJson });
            //   AsyncStorage.setItem('user',name);
            //   this.setState({ 'user': name });
             //   console.log("test" + JSON.parse(AsyncStorage.getItem('user')));
                console.log( name + pass);
            } catch (error) {
                console.log("Error saving data :" + error);
           }     
        }
        else
        {
              alert("Login faied");
        }
      //  return;
    })
    .catch((error) => {
        console.error(error);
        alert(" Thông tin lỗi :" + error);
    }) //;
    //.done();
  }
//   componentDidMount(){
//     //   if (this.state.login ==true) {
//     //     this.props.navigation.navigate('ManageVehicle');
//     //   }else{
//     //     this.props.navigation.navigate('Login');
//     //   }
//     // this.props.navigation.navigate('HiddenScreen');
//    //   this._loadDataUser().done(); 
//    //    this._clearUser();
//     }
    
    _clearUser = async()=>{  
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');  
    }
    _loadDataUser = async () => { 
    var value = await AsyncStorage.getItem('user');
  //  console.warn(value);
    if(value!==null){
         this.props.navigation.navigate('ManageVehicle');
      }
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
           width: 70,   
          alignItems: 'center',  
          backgroundColor: 'green', 
          padding:12,
      },
})