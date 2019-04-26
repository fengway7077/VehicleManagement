import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'react-moment';
import 'moment-timezone';
// import {  Badge, Icon, withBadge } from 'react-native-elements'
// import IconBadge from 'react-native-icon-badge';

export default class CalendarPicker1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedStartDate: null,
          selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
      }
   
      onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }

  render() {

    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2019, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

       return (

        <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
        //  enableSwipe={true}
          onDateChange={this.onDateChange}
          previousTitle='Trước'
          nextTitle='Sau'
          weekdays={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
          months={['Thg 1 ', 'Thg 2 ', 'Thg 3 ', 'Thg 4 ', 'Thg 5 ', 'Thg 6 ', 'Thg 7 ', 'Thg 8 ', 'Thg 9 ', 'Thg 10 ', 'Thg 11 ', 'Thg 12 ']}
          textDayFontFamily = 'monospace'
          iconColor = "red"
          todayBorderColor = "black"
         // pos ="top"
        />
          <View>
          {/* <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text> */}
        </View>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 100,
    },
  });