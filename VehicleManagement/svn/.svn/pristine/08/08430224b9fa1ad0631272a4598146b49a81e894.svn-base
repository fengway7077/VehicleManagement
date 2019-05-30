
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { LinkListCustomer , LinkCheckDataVehicle } from '../constLink/linkService.js';

class AutoCompleteCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customersArray: [],
      query: this.props.value,
      isSearching: true,
      iStart : 1
    };
  }
  componentDidMount() {
    this.getDataSuggest();
  }

  getDataSuggest(){
    fetch(this.props.link)
    .then(res => res.json())
    .then(json => {
      this.setState({
        customersArray : json
      })
    });
  }

  findCustomer(query, isSearching = true) {
    if (query === '') {
      return [];
    }

    let { customersArray } = this.state;
    const regex = new RegExp(`${query.toString().trim()}`, 'i');
    customersArray = customersArray.filter(customer => {
      return (!isSearching) ? customer["customercode"] === query || customer["firstname"] === query : customer["customercode"].toString().search(regex) >= 0 || customer["firstname"] != ""
    }) 
    return customersArray
  }

  render() {
    const { query, isSearching } = this.state;
    const customersArray = this.findCustomer(query, isSearching);
    const comp = (a, b) => a.toString().toLowerCase().trim() === b.toString().toLowerCase().trim();
    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          onBlur =  { async ()=>{
              if(this.state.iStart !== 1){
                await this.setState({
                  iStart : 1
                })
              }
            } 
          }
          data = {customersArray.length === 1 && comp(query.toString(), customersArray[0].customercode.toString()) || this.state.iStart === 1 ? [] : customersArray}
          defaultValue={query.toString()}
          onChangeText={ 
            async (text) => {
              await this.setState({ query: text, isSearching: true }, () => {
                this.props.checkCode(this.state.query)
                this.setState({
                  iStart : 2
                })
              })
  
            }
          }
          placeholder="Nhập Tên Khách Hàng..."
          renderItem={({ customercode, lastname }) => {
            return (
            <TouchableOpacity  
              containerStyle={styles.autocompleteContainer} 
              onPress={
                async () => {
                  await this.setState({ query: customercode, isSearching: false, })
                  this.props.checkCode(this.state.query)
                }
              }
            >
              <Text style={styles.itemText}>
                {customercode} : {lastname}
              </Text>
            </TouchableOpacity>
          )}
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    marginTop: 10,
    marginBottom:10,
    borderRadius:10,
  },
  autocompleteContainer: {
    width:'100%',
    borderRadius:10,
    borderWidth: 0,
  },
  itemText: {
    fontSize: 15,
    marginBottom: 2,
  },
});
export default AutoCompleteCustomer;