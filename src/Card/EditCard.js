import { useParams, useHistory } from "react-router-dom";  
import FormPage from '../Helper/FormPage'
import Nav from "../Layout/Nav";
import { useState, useEffect} from 'react'
import { updateCard, readCard } from "../utils/api";

const EditCard = () => {
  const defaultState = {'front': 'Front side of card',
  'back': 'Back side of card'}
  const [card, setCard] = useState(defaultState)
  const history = useHistory();
  const { cardId, deckId } = useParams()

  useEffect(()=> {
    let abort = new AbortController();
    readCard(cardId, abort.signal)
    .then((response) => setCard(response))
    .catch(err => console.log(err))
    return ()=> abort.abort();
  }, [cardId])
  
  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/decks/${deckId}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let abort = new AbortController();
    updateCard(card)
    .then(()=> history.push(`/decks/${deckId}`))
    return () => abort.abort();
  }
  
  const EditCardForm = {title:'Edit Card', text1: 'Front', text2: 'Back', cancel: handleCancel, submit: handleSubmit }

  return (
    <>
    <Nav/>
    <FormPage form={EditCardForm} input={[card, setCard]} />
    </>
  );
}

export default EditCard;