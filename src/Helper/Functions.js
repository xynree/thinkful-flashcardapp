import { readDeck } from "../utils/api";

/** 
 * @param deckId {number}
 *  used to fetch deck from api
 * @param setDeck {React.Dispatch<React.SetStateAction<{}>>}
 *  updates state of read Deck
 * @returns {Function}
 * abort controller to abort ongoing requests.
 */
export const getDeckState = (deckId, setDeck) => {
  let abort = new AbortController();
  readDeck(deckId, abort.signal)
  .then((response) => setDeck(response))
  .catch((err) => console.log(err))
  return () => abort.abort();
}

