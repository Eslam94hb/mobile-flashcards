import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD :{
        const deck = state[action.deckId]
        deck.questions.push(action.card);  
        state[action.deckId] = deck
      return {
        ...state,  
      }
    }
    default :
      return state
  }
}

export default entries