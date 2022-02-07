import { useParams, Link, useHistory } from 'react-router-dom'
import { deleteCard } from "../utils/api";

const CardList = ({cards, updateDeck}) => {
  const { deckId } = useParams()
  const history = useHistory();
  const [deck, setDeck] = updateDeck

  /**
   * Deletes Card with matching cardId
   * 
   * Updates deck passed down by ViewDeck component with new card list to trigger refresh
   * @param id  {number}
   */
  const delCard = (id) => {
    if (window.confirm(`Are you sure you want to delete the card?`)){
      let abort = new AbortController();
      deleteCard(id, abort.signal)
      .then(() => setDeck({...deck, cards: [...cards].filter((card) => card.id !== id)}))
      .then(() => history.push(`/decks/${deckId}`))
    } 
  }

  return (
    <>
    {cards.map(({front, back, id }) => 
      <div className='card w-100 d-flex flex-row' key={id}>
        <div className='card-body w-75 '>{front}</div>
        <div className='card-body w-75'>
          {back}
          <div className='d-flex justify-content-end '>
            <div className='ml-auto'>
              <Link to={`/decks/${deckId}/cards/${id}/edit`}>
                <button className={`btn btn-secondary m-2`}> <span className={`oi oi-pencil`}/> Edit </button>
              </Link>
              <button className={`btn btn-danger m-2 ml-auto`}  onClick={()=> delCard(id)}> 
                <span className={`oi oi-trash`} />
              </button>
            </div>
        </div>
      </div>
      </div>
      )}
  </>
  )
}

export default CardList;