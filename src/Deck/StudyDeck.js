import {useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import  HelperButton  from '../Helper/HelperButton'
import Nav from '../Layout/Nav';
import { getDeckState } from '../Helper/Functions'

const StudyDeck = () => {
  const { deckId } = useParams();
  const [cardIndex, setCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true)
  const [deck, setDeck ] = useState([])
  const history = useHistory();

  useEffect(() => {
    getDeckState(deckId, setDeck);
  },[deckId])


  const {name, cards} = deck;

  const flip = (e)=> {
  e.preventDefault();
  setIsFront(isFront => !isFront)
  }

  const next = (e) => {
    e.preventDefault();
    if (cardIndex+1 === cards.length){
      if(window.confirm('Restart? Click Cancel to Return to Home page.')){
        setCardIndex(0)
        setIsFront(true)
      } else (history.push('/'))
    }else{
      setCardIndex(cardIndex => cardIndex +1);
      setIsFront(true)

    } 
  }

  const flipButton = {icon:'flip', text:'Flip', style:'secondary'}
  const nextButton = {icon: 'arrow', text: 'Next'}
  const addCardsButton = {icon:'plus', text: 'Add Cards', link:`/decks/${deckId}/cards/new`, extra:'m-2'}

  return (
    <>
    {cards? 
    <div>
      <Nav deck={deck}/>
      <h1>{name}: Study</h1>
      <div className='card'>
      { cards.length > 2?
        <>
        <h4 className='card-header'>Card {cardIndex+1} of {cards.length}: {isFront ? 'Front': 'Back'}</h4>
        <div className='card-body'>
          {isFront? cards[cardIndex].front:cards[cardIndex].back}
        </div>
        <div className='d-flex m-2'>
          <HelperButton button={flipButton} action={flip}/>
          {isFront?'':<HelperButton button={nextButton} action={next}/>}
        </div>
        </>:
        <>
        <h1 className='card-header'>Not Enough Cards</h1>
        <div className='card-body'>
          You need at least 3 cards to study. There are {cards.length} cards in this deck.
        </div>
        <HelperButton button={addCardsButton}/>
        </>
        }
      </div>
    </div>:''}
    </>
  );
}

export default StudyDeck;