import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {clearLocalNotification,setLocalNotification} from '../Utilts/helpers'

class Quiz extends React.Component {

  state={
    IsCorrect:false,
    ViewAnswer:false,
    questionIndex:0,
    correctCount:0
  }
 componentDidMount(){ 
     clearLocalNotification()
      .then(setLocalNotification)
    }
    
handleViewAnswer = (isViewAnswer) =>{
  
  this.setState(() => ({ ViewAnswer: isViewAnswer}))
}
  handleAnswer =(IsCorrect)=>{

    let questionIndex = this.state.questionIndex + 1
    let correctCount = this.state.correctCount;
    if(IsCorrect) correctCount = correctCount + 1
    const length = this.props.route.params.key.questions.length
    if(questionIndex === length){
       this.setState(() => ({ IsCorrect: IsCorrect, questionIndex:0, ViewAnswer: false, correctCount:0}))
        this.props.navigation.navigate(
                 'Result',{ correctCount: correctCount , questionsCount:length, key:this.props.route.params.key})
       return
     }
     this.setState(() => ({ IsCorrect: IsCorrect, questionIndex: questionIndex, correctCount: correctCount,ViewAnswer: false}))
  }
  render(){
    const deck = this.props.route.params.key
    if(deck.questions.length===0){
      return (
              <View>
                  <Text style ={styles.paragraph}>
                      sorry you cannot take a quiz because there is no cards in the deck
                  </Text>  
              </View>
            )
    } 
   if(this.state.ViewAnswer===true){
      return (
              <View>
                  <Text style ={styles.paragraph}>{deck.questions[this.state.questionIndex].answer}</Text>  
                  <TouchableOpacity onPress={()=>this.handleViewAnswer(false)}>             
                      <Text style={[styles.paragraph,{fontSize:16},{color:'red'}]}>Question</Text>
                  </TouchableOpacity>
                  <View>
                      <TouchableOpacity  style={styles.btn} onPress={()=>this.handleAnswer(true)}>    
                          <Text style={styles.paragraph}>Correct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn} onPress={()=>this.handleAnswer(false)}>              
                          <Text style={styles.paragraph}>Incorrect</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            )
    } 
    else{

     return (
            <View>
                <Text style ={styles.paragraph}>{this.state.questionIndex +1}/{deck.questions.length}</Text>    
               
                <Text style ={styles.paragraph}>{deck.questions[this.state.questionIndex].question}</Text>    

                <TouchableOpacity onPress={()=>this.handleViewAnswer(true)}>              
                    <Text style={[styles.paragraph,{fontSize:16},{color:'red'}]}>Answer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=>this.handleAnswer(true)}>              
                    <Text style={styles.paragraph}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=>this.handleAnswer(false)}>              
                    <Text style={styles.paragraph}>Incorrect</Text>
                </TouchableOpacity>
            </View>
      );
    }
  }

}

function mapStateToProps (state) {

  return {
     state,
  }
}
export default connect(mapStateToProps)(Quiz)
      
const styles = StyleSheet.create({

  paragraph: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn:{
      backgroundColor:'#E53224',
      padding:0,
      margin:10,
      paddingLeft:0,
      paddingRight:0,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      height:40
  }
});