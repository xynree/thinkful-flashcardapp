import Deck from './Deck'
import { useState, useEffect } from "react";
import { listDecks } from '../utils/api';

const DeckList = () => {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    let abort = new AbortController();
    listDecks(abort.signal)
    .then((data) => setDecks(data))
    .catch(err => console.log(err))
    return () => abort.abort();
  },[])

return (
  <>
  {decks.map((deck, index) => 
  <Deck deck={deck} key={index} adjustDecks={[decks, setDecks]}/>)}
  </>
)
}

export default DeckList;
