import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'


class ViewAnswer extends React.Component {
 
  handleAnswer =(IsCorrect)=>{

    let questionIndex = this.state.questionIndex + 1

     if(questionIndex === this.props.route.params.key.questions.length){
        questionIndex = questionIndex-1
     }
  this.setState(() => ({ IsCorrect: IsCorrect, questionIndex: questionIndex}))

  }

  render(){
    const deck = this.props.route.params.key
      return (
            <View>
                <Text style ={styles.paragraph}>Answer...........</Text>    
            </View>
      );
  }

}

function mapStateToProps (state) {

  return {
     state,
  }
}
export default connect(mapStateToProps)(ViewAnswer)

const styles = StyleSheet.create({

  paragraph: {
    margin: 50,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

