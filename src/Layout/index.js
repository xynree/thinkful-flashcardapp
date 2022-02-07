import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from '../Deck/DeckList'
import HelperButton from "../Helper/HelperButton";
import { Switch, Route } from "react-router-dom";
import CreateDeck from "../Deck/CreateDeck";
import EditDeck from '../Deck/EditDeck'
import StudyDeck from '../Deck/StudyDeck'
import AddCard  from '../Card/AddCard'
import EditCard from "../Card/EditCard";
import ViewDeck from "../Deck/ViewDeck";

const CreateDeckButton = {icon:'plus', text:'Create Deck', link:'/decks/new', style:'secondary'}

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
        <Route exact={true} path='/'>
          <HelperButton button={CreateDeckButton}/>
          <DeckList />
        </Route>
        <Route path='/decks/new'>
          <CreateDeck />
        </Route>
        <Route  exact={true} path='/decks/:deckId'>
          <ViewDeck/>
        </Route>
        <Route path='/decks/:deckId/study'>
          <StudyDeck />
        </Route>
        <Route path='/decks/:deckId/edit'>
          <EditDeck/>
        </Route>
        <Route path='/decks/:deckId/cards/new'>
          <AddCard />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit'>
          <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>    
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
