import Nav from "../Layout/Nav";
import FormPage from "../Helper/FormPage";
import {useState} from 'react'
import { useParams, useHistory } from "react-router-dom";
import { createCard } from "../utils/api";

const AddCard = () => {
  const defaultState = {'front': 'Front side of card', 'back': 'Back side of card'}
  const [newCard, setNewCard] = useState(defaultState)
  const history = useHistory();
  const { deckId } = useParams()
 
  /**
   * Navigates back to deck page.
   */
  const handleCancel = (e) => {
    history.push(`/decks/${deckId}`)
  }

  /**
   * Adds New Card with updated Input, resets card State
   */
  const addCard = (e) => {
    e.preventDefault();
    let abort = new AbortController();
    createCard(deckId,newCard)
    .then(()=> setNewCard(defaultState))
    return () => abort.abort();
  }
  
  const AddCardForm = {title:'Add Card', text1: 'Front', text2: 'Back', cancel: handleCancel, submit: addCard, btn1:'Done', btn2:'Save' }

  return (
    <>
    <Nav/>
    <FormPage form={AddCardForm} input={[newCard, setNewCard]} />
    </>
  );
}

export default AddCard;