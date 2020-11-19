import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./components/App/App";
import SongsList from "./containers/SongsList/SongsList";
import CreateSong from "./containers/CreateSong/CreateSong";
import SongDetails from "./containers/SongDetails/SongDetails";

const client = new ApolloClient({
    // dataIdFromObject: (o) => o.id,
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongsList} />
                    <Route path="/songs/new" component={CreateSong} />
                    <Route path="/songs/:id" component={SongDetails} />
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
