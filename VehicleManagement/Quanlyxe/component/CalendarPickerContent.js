import React, { Component } from 'react';
import {StyleSheet, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker';
import Moment from 'react-moment';
import 'moment-timezone';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

export default class CalendarPickerContent extends Component {
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

    // const { selectedStartDate, selectedEndDate } = this.state;
    // const minDate = new Date(); 
    // const maxDate = new Date(2019, 6, 3);
    // const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    // const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    //    return (
    //     <View style={styles.container}>
    //     <CalendarPicker
    //       startFromMonday={true}
    //       allowRangeSelection={true}
    //       minDate={minDate}
    //       maxDate={maxDate}
    //       todayBackgroundColor="#f2e6ff"
    //       selectedDayColor="#7300e6"
    //       selectedDayTextColor="#FFFFFF"
    //       enableSwipe={true}
    //       onDateChange={this.onDateChange}
    //       previousTitle='Trước'
    //       nextTitle='Sau'
    //       weekdays={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
    //       months={['Thg 1 ', 'Thg 2 ', 'Thg 3 ', 'Thg 4 ', 'Thg 5 ', 'Thg 6 ', 'Thg 7 ', 'Thg 8 ', 'Thg 9 ', 'Thg 10 ', 'Thg 11 ', 'Thg 12 ']}
    //       textDayFontFamily = 'monospace'
    //       iconColor = "red"
    //       todayBorderColor = "black"
    //     />
    //   </View>

     const current =   new Date(Date.now()); 
     const minDate = new Date(); 
     const maxDate = new Date(2050, 6, 3);
    
      var  day  = 1 ;    // day of month (1-31)
      var month  = 1;  // month of year (1-12)
      var year  = 2017; // year
      var timestamp;   // UTC timestamp representing 00:00 AM of this date
      var dateString  ='2016-05-13' ;// date formatted as 'YYYY-MM-DD' string
        

     LocaleConfig.locales['vn'] = {
      monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4 ','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
      monthNamesShort: ['Thg 1 ', 'Thg 2 ', 'Thg 3 ', 'Thg 4 ', 'Thg 5 ', 'Thg 6 ', 'Thg 7 ', 'Thg 8 ', 'Thg 9 ', 'Thg 10 ', 'Thg 11 ', 'Thg 12 '],
      dayNames: ['Chủ Nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
      dayNamesShort: ['CN','T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    };
     LocaleConfig.defaultLocale = 'vn';
     //
     const vacation = {key:'vacation', color: 'red', selectedDotColor: 'pink'};
     const massage = {key:'massage', color: 'blue', selectedDotColor: 'yellow'};
     const workout = {key:'workout', color: 'green'};
     //
    return (
      <View style={styles.container}>
        <CalendarList
      // Initially visible month. Default = Date()
      current={current}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={minDate}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={maxDate}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {console.log('selected day', day)}}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {console.log('selected day', day)}}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy / MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {console.log('month changed', month)}}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      renderArrow={(direction) => (<Arrow />)}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={false}
      // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={false}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={false}
      // Show week numbers to the left. Default = false
      showWeekNumbers={false}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={substractMonth => substractMonth()}
      // Handler which gets executed when press arrow icon left. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}

      //CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
 
       //
        // // Enable horizontal scrolling, default = false
        // horizontal={true}
        // // Enable paging on horizontal, default = false
        // pagingEnabled={true}
        // // Set custom calendarWidth.
        // calendarWidth={420}     

        // //Agenda
        // // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // // considered that the date in question is not yet loaded
        // items={
        //   {'2019-05-22': [{text: 'item 1 - any js object'}],
        //   '2019-05-23': [{text: 'item 2 - any js object'}],
        //   '2019-05-24': [],
        //   '2019-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
        //   }}
        // // callback that gets called when items for a certain month should be loaded (month became visible)
        // loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        // // callback that fires when the calendar is opened or closed
        // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
        // // callback that gets called on day press
        // onDayPress={(day)=>{console.log('day pressed')}}
        // // callback that gets called when day changes while scrolling agenda list
        // onDayChange={(day)=>{console.log('day changed')}}
        // // initially selected day
        // selected={'2019-05-16'}
        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2019-05-10'}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2019-05-30'}
        // // Max amount of months allowed to scroll to the past. Default = 50
        // pastScrollRange={50}
        // // Max amount of months allowed to scroll to the future. Default = 50
        // futureScrollRange={50}
        // // specify how each item should be rendered in agenda
        // renderItem={(item, firstItemInDay) => {return (<View />);}}
        // // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        // renderDay={(day, item) => {return (<View />);}}
        // // specify how empty date content with no items should be rendered
        // renderEmptyDate={() => {return (<View />);}}
        // // specify how agenda knob should look like
        // renderKnob={() => {return (<View />);}}
        // // specify what should be rendered instead of ActivityIndicator
        // renderEmptyData = {() => {return (<View />);}}
        // // specify your item comparison function for increased performance
        // rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        // // Hide knob button. Default = false
        // hideKnob={true}
        // // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        // markedDates={{
        //   '2019-05-16': {selected: true, marked: true},
        //   '2019-05-17': {marked: true},
        //   '2019-05-18': {disabled: true}
        // }}
        // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        // onRefresh={() => console.log('refreshing...')}
        // // Set this true while waiting for new data from a refresh
        // refreshing={false}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        // refreshControl={null}
        // // agenda theme
        // theme={{
        //   //...calendarTheme,
        //   agendaDayTextColor: 'yellow',
        //   agendaDayNumColor: 'green',
        //   agendaTodayColor: 'red',
        //   agendaKnobColor: 'blue'
        // }}
        // // agenda container style
        // style={{}}

     //

//
 // Collection of dates that have to be marked. Default = {}
 markedDates={{
  '2019-05-13': {selected: true, marked: true, selectedColor: 'red'},
  '2019-05-14': {marked: true},
  '2019-05-15': {marked: true, dotColor: 'red', activeOpacity: 0},
  '2019-05-16': {disabled: true, disableTouchEvent: true},
  //
  '2019-05-24': {dots: [vacation, massage, workout], selected: true, selectedColor: 'orange'},
  '2019-05-25': {dots: [massage, workout], disabled: true},
}}
//markingType={'multi-dot'}
//


    // markedDates={
    //   {'2019-05-23': {textColor: 'red'},
    //   '2019-05-25': {startingDay: true, color: 'pink'},
    //   '2019-05-27': {selected: true, endingDay: true, color: 'blue', textColor: 'gray'},
    //   '2019-05-28': {disabled: true, startingDay: true, color: 'orange', endingDay: true}
    //   }}
    // // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
    // markingType={'period'}



  // Specify style for calendar container element. Default = {}
  style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 350
  }}
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    monthTextColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textMonthFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }}

    />
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