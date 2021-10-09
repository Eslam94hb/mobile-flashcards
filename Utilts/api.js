import { AsyncStorage } from 'react-native'
import { CARDS_STORAGE_KEY } from './_cards'

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))
    })

} 
export  async function getDecks(){
  try {     
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      return result;
  }
  catch (error) {
    console.log(error)
  }
}

export async function getDeck(id){
  try {     
        const value = await AsyncStorage.getItem(id);
        return value
  }
  catch (error) {
      console.log(error)
  }
}


