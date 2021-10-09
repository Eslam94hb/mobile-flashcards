import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { addDeck, addCard } from '../actions'
import { Deck } from '../components/deck'
import { submitDeck, removeDeck } from '../Utilts/api'


class AddCard extends React.Component {
  state={
      question:'',
      answer:'',
  }

  submit = () => {
    
    const {question,answer} = this.state


    this.props.dispatch(addCard(this.state,this.props.route.params.key.title))



     this.props.navigation.navigate('Deck',  { key: this.props.route.params.key.title })


    submitDeck({ deck:this.state, key: this.props.route.params.key.title })

    this.setState(() => ({ question: '', answer:''}))
    // Clear local notification
  }
  render(){

      return (
            <View style={styles.container}>

              <TextInput 
              placeholder="Question"
              value={this.state.question}
              onChangeText = {(question)=>this.setState(()=>({question}))}
              style={styles.input}/>

             <TextInput 
             placeholder="Answer"
              value={this.state.answer}
              onChangeText = {(answer)=>this.setState(()=>({answer}))}
              style={styles.input}/>

              <TouchableOpacity style={styles.btn}
                  onPress={this.submit}>
                  <Text style={styles.paragraph}>SUBMIT</Text>
              </TouchableOpacity>

            </View>
      );
  }
}

function mapStateToProps (state,props) {
  return {
    state
  }
}

export default connect(mapStateToProps)(AddCard)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input:{
    width:300,
    height:44,
    padding:8,
    margin:20,
    borderWidth:1,
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
      height:40,
  }
});
