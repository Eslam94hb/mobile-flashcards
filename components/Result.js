import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'


class Result extends React.Component {


  render(){
    const {correctCount,questionsCount, key} = this.props.route.params
    console.log(key)
      return ( 
            <View>
                <Text style ={styles.paragraph}>Your Result is</Text>    
                <Text style ={styles.paragraph}>{correctCount}/{questionsCount}</Text>  
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Quiz',{ key: key })}>          
                    <Text style={[styles.paragraph,{fontSize:16},{color:'red'}]}>Restart Quiz</Text>
                </TouchableOpacity>  
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck',{ key: key.title })}>     
                    <Text style={[styles.paragraph,{fontSize:16},{color:'red'}]}>Back To Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Decks')}>              
                    <Text style={[styles.paragraph,{fontSize:16},{color:'red'}]}>Back To Decks</Text>
                </TouchableOpacity>
     
            </View>
      );
  }

}

function mapStateToProps (state) {

  return {
     state,
  }
}
export default connect(mapStateToProps)(Result)
      
const styles = StyleSheet.create({

  paragraph: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});