
import React, { Component } from 'react';
import { TextInput,View,Text,StyleSheet,Image,TouchableOpacity ,Button} from 'react-native';
export default class HiddenScreen extends React.Component {
  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 15 }}>
          Hay quay lai dang nhap
        </Text>
        <Button
          title="Back to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}