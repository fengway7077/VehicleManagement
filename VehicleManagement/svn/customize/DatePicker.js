//This is an example code to get DatePicker// 
import React, { Component } from 'react';
//import react in our code. 
import {View, StyleSheet} from 'react-native';
//import all the components we are going to use.
import DatePicker from 'react-native-datepicker';
//import DatePicker from the package we installed
 
export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {date:this.props.valueRentDate,
      date:this.props.valuePayDate}
  }
 
  render(){
    return (
      <View style={styles.container}>
 
        <DatePicker
          style={{width: '100%'}}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2000"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              borderColor:'#428AF8',
              paddingLeft:30,
              alignItems:'flex-start'
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create ({
 container: {
    width:'100%',
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
 }
})