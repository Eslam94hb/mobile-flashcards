import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class Deck extends React.Component {
  componentDidMount(){ 
    this.setTitle(this.props.route.params.key); 
    }
    
    setTitle = (key) => { 
        if (!key) return; 
       this.props.navigation.setOptions({ title: `${key}` });
        };

  render(){
     const {deck} = this.props
      return (
            <View style ={styles.container}>
                <Text style ={[styles.paragraph,{fontSize:48}]}>{deck.title}</Text>

                <Text 
                  style = {[styles.paragraph, 
                  {fontWeight: '100'}, 
                  { color: 'grey'},
                  {fontSize:48}]}>{deck.questions.length}
                </Text>

                <TouchableOpacity style ={styles.btn}
                onPress={() => this.props.navigation.navigate(
                 'AddCard',{ key: deck })}>              
                  <Text style={styles.paragraph}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity style ={styles.btn}
                onPress={() => this.props.navigation.navigate(
                 'Quiz',{ key: deck })}>              
                  <Text style={styles.paragraph}>Start Quiz</Text>
                </TouchableOpacity>

            </View>
      );
  }
}

function mapStateToProps (state,key) {
  const deck = key ? state[key.route.params.key]: null 
  return {
     deck,
  }
}
export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    btn:{
      backgroundColor:'#E53224',
      padding:10,
      paddingLeft:0,
      paddingRight:0,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      margin:10,
      height:40
  }
});