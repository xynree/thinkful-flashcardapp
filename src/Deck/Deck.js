import HelperButton from "../Helper/HelperButton";
import { deleteDeck } from "../utils/api";

const Deck = ({ deck, adjustDecks }) => {
  const { name, description, cards, id } = deck;
  const viewButton = {
    icon: "eye",
    link: `decks/${id}`,
    text: "View",
    style: "secondary",
  };
  const studyButton = {
    icon: "book",
    link: `decks/${id}/study`,
    text: "Study",
  };
  const delButton = { icon: "trash", style: "danger", extra: "ml-auto" };
  const [decks, setDecks] = adjustDecks;

  const delDeck = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the ${name} deck?`)) {
      let abort = new AbortController();
      deleteDeck(id, abort.signal).then(() =>
        setDecks([...decks].filter((deck) => deck.id !== id))
      );
    }
  };

  return (
    <div className="card m-2">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="card-title">{name}</h2>
        <div className="card-text text-right">{cards.length} cards</div>
      </div>
      <div className="card-body">
        <div className="card-text m-2">{description}</div>
        <div className="d-flex flex-gap-2">
          <HelperButton button={viewButton} />
          <HelperButton button={studyButton} />
          <HelperButton button={delButton} action={delDeck} />
        </div>
      </div>
    </div>
  );
};

export default Deck;
