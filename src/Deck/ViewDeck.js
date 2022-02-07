import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import HelperButton from "../Helper/HelperButton";
import CardList from "../Card/CardList";
import Nav from "../Layout/Nav";
import { getDeckState } from "../Helper/Functions";

const ViewDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    getDeckState(deckId, setDeck);
  }, [deckId]);

  const { name, description, cards } = deck;

  const editButton = {
    icon: "pencil",
    text: "Edit",
    style: "secondary",
    link: `/decks/${deckId}/edit`,
  };
  const studyButton = {
    icon: "book",
    text: "Study",
    link: `/decks/${deckId}/study`,
  };
  const addCardsButton = {
    icon: "plus",
    text: "Add Cards",
    link: `/decks/${deckId}/cards/new`,
  };
  const delButton = { icon: "trash", style: "danger", extra: "ml-auto" };

  const delDeck = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the ${name} deck?`)) {
      console.log("deleted");
      let abort = new AbortController();
      deleteDeck(deckId, abort.signal).then(() => history.push("/"));
      return () => abort.abort();
    }
  };

  return (
    <div>
      <Nav deck={deck} />
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="d-flex ">
        <HelperButton button={editButton} />
        <HelperButton button={studyButton} />
        <HelperButton button={addCardsButton} />
        <HelperButton button={delButton} action={delDeck} />
      </div>
      <h1>Cards</h1>
      {cards && cards.length > 0 ? <CardList cards={cards} updateDeck={[deck, setDeck]} /> : <div className='card'><div className='card-body'>No Cards Created Yet.</div></div>}
    </div>
  );
};

export default ViewDeck;
