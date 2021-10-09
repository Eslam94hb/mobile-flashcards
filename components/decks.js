import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList , Animated} from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { getDecks } from '../Utilts/api'
import { receiveDecks } from '../actions'


class Decks extends React.Component { 

  componentDidMount(){ 
      const decks = getDecks()
      this.props.dispatch(receiveDecks(decks))
    }

  renderItem=({item})=>{
   if(!item) return
    const string = item.questions.length === 1?'card':'cards'
    return(
       <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Deck',{ key: item.title } )}>
          <Text style = {styles.paragraph}>{item.title}</Text>
          <Text style = {[styles.paragraph,{fontWeight: '100'},{ color: 'grey'}]}>{item.questions.length+' ' +string}</Text>
       </TouchableOpacity>
    )
  }
  
  render(){
    const {decks} = this.props
      return (
            <View>          
              {decks && 
              <FlatList 
                data={decks} 
                renderItem={this.renderItem} 
                keyExtractor={(item, index) => index.toString()}/>}
            </View>
      );
  }
}
function mapStateToProps (state) {
  const decks = Object.values(state)

  return {
    decks
  }
}
export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
  paragraph: {
    margin: 0,
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
