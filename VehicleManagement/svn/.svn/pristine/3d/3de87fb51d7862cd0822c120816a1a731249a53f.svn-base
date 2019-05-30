
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

class AutoCompleteVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclesArray: [],
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
        vehiclesArray : json
      })
    });
  }

  findVehicle(query, isSearching = true) {
    if (query === '') {
      return [];
    }

    let { vehiclesArray } = this.state;
    const regex = new RegExp(`${query.toString().trim()}`, 'i');
    vehiclesArray = vehiclesArray.filter(vehicle => {
      return !isSearching ? vehicle["vehiclecode"] === query || vehicle["vehicletype"] === query : vehicle["vehiclecode"].toString().search(regex) >= 0 ||  vehicle["vehiclecode"].toString().search(regex) != ""
    }) 
    return vehiclesArray
  }

  render() {
    const { query, isSearching } = this.state;
    const vehiclesArray = this.findVehicle(query, isSearching);
    const comp = (a, b) => a.toString().toLowerCase().trim() === b.toString().toLowerCase().trim();
    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={vehiclesArray.length === 1 && comp(query.toString(), vehiclesArray[0].vehiclecode.toString()) || this.state.iStart === 1  ? [] : vehiclesArray}
          defaultValue={query.toString()}
          onChangeText={ 
            async (text) => {
                await this.setState({ query: text, isSearching: true })
                this.props.checkCode(this.state.query)
                this.setState({
                    iStart : 2
                })
            }
          }
          placeholder="Nhập Tên Xe"
          renderItem={({ vehiclecode, vehiclename }) => {
            return (
            <TouchableOpacity  
              containerStyle={styles.autocompleteContainer} 
              onPress={
                async () => {
                  await this.setState({ query: vehiclecode, isSearching: false, })
                  this.props.checkCode(this.state.query)
                  console.log(vehiclecode);
                }
              }
            >
              <Text style={styles.itemText}>
                {vehiclecode} : {vehiclename}
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
export default AutoCompleteVehicle;