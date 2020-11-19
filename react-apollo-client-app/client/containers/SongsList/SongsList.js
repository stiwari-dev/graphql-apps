import { graphql } from "react-apollo";
import { Link } from "react-router";
import gql from "graphql-tag";
import { hashHistory } from "react-router";
import React from "react";

import fetchSongsQuery from "../../queries/fetchSongs";

class SongsList extends React.Component {
    deleteSongHandler(id) {
        this.props
            .mutate({
                variables: { id },
            })
            .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => (
            <li key={id} className="collection-item">
                <Link to={`/songs/${id}`}>{title}</Link>
                <i
                    className="material-icons btn-small right"
                    onClick={() => this.deleteSongHandler(id)}
                >
                    delete
                </i>
            </li>
        ));
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <h3>List of Songs:</h3>
                {data.loading ? (
                    <h4>Loading...</h4>
                ) : (
                    <ul className="collection">{this.renderSongs()}</ul>
                )}
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large blue right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const deleteSongMutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongsList));
