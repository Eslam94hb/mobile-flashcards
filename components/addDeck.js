import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { submitDeck, removeDeck } from '../Utilts/api'
// import {clearLocalNotification,setLocalNotification} from '../Utilts/helpers'

class AddDeck extends React.Component {
  
  state={
      input:''
  }

  submit = () => {
    
    const {input} = this.state

    const deck = {
          title: input,
          questions: []
    }

    this.props.dispatch(addDeck({[input]: deck}))

    this.setState(() => ({ input: ''}))

     this.props.navigation.navigate('Deck',{ key : input } )

    submitDeck({ deck, key:input })

   
  }
  render(){
      return (
            <View style={styles.container}>
              <Text style={styles.paragraph}>What is the title of your new deck?</Text>
              <TextInput 
              value={this.state.input}
              onChangeText = {(input)=>this.setState(()=>({input}))}
              style={styles.input}/>
            
              <TouchableOpacity style={styles.btn} onPress={this.submit}>
                  <Text style={styles.paragraph}>Create Deck</Text>
              </TouchableOpacity>

            </View>
      );
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(AddDeck)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input:{
    width:300,
    height:44,
    padding:8,
    margin:20,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn:{
      backgroundColor:'#E53224',
      padding:0,
      paddingLeft:0,
      paddingRight:0,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      height:40
  }
});
