import FormPage from "../Helper/FormPage";
import {useParams, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Nav from "../Layout/Nav";
import { getDeckState} from '../Helper/Functions'
import { updateDeck } from "../utils/api";

const EditDeck = () => {
  const {deckId} = useParams();
  const [deck, setDeck] = useState({})
  const history = useHistory();

  useEffect(()=> {
 getDeckState(deckId, setDeck);
  },[deckId])


  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/decks/${deckId}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let abort = new AbortController();
    updateDeck(deck,abort.signal)
    .then(()=> history.push(`/decks/${deckId}`))
    return () => abort.abort();
  }

  const EditDeckForm = {title:'Edit Deck', text1:'Name', text1type:'input', text2:'Description', cancel:handleCancel, submit:handleSubmit}


  return (
    <div>
      <Nav />
       {'name' in deck? <FormPage form={EditDeckForm} input={[deck, setDeck]}/>:''}
    </div>
  );
}

export default EditDeck;