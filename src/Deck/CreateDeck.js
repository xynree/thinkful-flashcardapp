import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Nav from "../Layout/Nav";
import FormPage from "../Helper/FormPage";

const CreateDeck = () => {
  const defaultState = {
    name: "Deck Name",
    description: "Brief description of the deck",
  };
  const [newDeck, setNewDeck] = useState(defaultState);
  const history = useHistory();

  /** 
   * On cancel, returns to home page
   */
  const handleCancel = (e) => {
    history.push("/");
  };

  /** 
   * Adds new Deck, Returns newly created Deck Id
   * 
   * Navigates to corresponding View Deck page
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let abort = new AbortController();
    createDeck(newDeck, abort.signal).then((response) =>
      history.push(`/decks/${response.id}`)
    );
    return () => abort.abort();
  };

  const CreateDeckForm = {
    title: "Create Deck",
    text1: "Name",
    text1type: "input",
    text2: "Description",
    cancel: handleCancel,
    submit: handleSubmit,
  };

  return (
    <>
      <Nav />
      <FormPage form={CreateDeckForm} input={[newDeck, setNewDeck]} />
    </>
  );
};

export default CreateDeck;
