import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
import gql from "graphql-tag";
import React from "react";

import fetchSongsQuery from "../../queries/fetchSongs";

class CreateSong extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
        };
        this.createSongHandler = this.createSongHandler.bind(this);
    }

    createSongHandler(event) {
        event.preventDefault();
        this.props
            .mutate({
                variables: {
                    title: this.state.title,
                },
                refetchQueries: [{ query: fetchSongsQuery }],
            })
            .then(() => hashHistory.push("/"));
    }

    render() {
        return (
            <div>
                <h3>Create a new song</h3>
                <form onSubmit={this.createSongHandler}>
                    <label htmlFor="song-title">Song Title</label>
                    <input
                        id="song-title"
                        name="song-title"
                        onChange={(event) =>
                            this.setState({ title: event.target.value })
                        }
                        value={this.state.title}
                    />
                    <button
                        className="btn waves-effect green waves-light"
                        type="submit"
                        name="submit"
                    >
                        Create
                        <i className="material-icons right">send</i>
                    </button>
                </form>
                <Link to="/">Go Back</Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(CreateSong);
