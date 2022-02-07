import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";

const Nav = () => {
  const location = useLocation().pathname;
  const { deckId, cardId } = useParams();
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    if (deckId) {
      let abort = new AbortController();
      readDeck(deckId, abort.signal).then((response) =>
        setDeckName(response.name)
      );
      return () => abort.abort;
    }
  }, [location, deckId]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item inactive" name="home">
          <Link to="/">Home</Link>
        </li>
        {deckId ? (
          <li className="breadcrumb-item active">
            <Link to={`/decks/${deckId}`}>{deckName} </Link>
          </li>
        ) : (
          <li className="breadcrumb-item active">
            <Link to={location}>Create Deck</Link>
          </li>
        )}
        {location.includes("edit") && !location.includes("cards") ? (
          <li className="breadcrumb-item active">
            <Link to={`/decks/${deckId}/edit`}>Edit Deck</Link>
          </li>
        ) : (
          ""
        )}

        {location.includes("study") ? (
          <li className="breadcrumb-item active">
            <Link to={`/decks/${deckId}/study`}>Study</Link>
          </li>
        ) : (
          ""
        )}

        {location.includes("cards") ? (
          cardId ? (
            <li className="breadcrumb-item active">
              <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>
                Edit Card {cardId}
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item active">
              <Link to={`/decks/${deckId}/cards/new`}>Add Card</Link>
            </li>
          )
        ) : (
          ""
        )}
      </ol>
    </nav>
  );
};

export default Nav;
