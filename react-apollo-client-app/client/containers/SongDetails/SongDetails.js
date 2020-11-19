import { graphql } from "react-apollo";
import { Link } from "react-router";
import React from "react";

import fetchSongDetailsQuery from "../../queries/fetchSongDetails";
import CreateLyric from "../CreateLyric/CreateLyric";
import LyricsList from "../LyricsList/LyricsList";

class SongDetails extends React.Component {
    render() {
        const { data, params } = this.props;
        if (data.loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h3>Song Details</h3>
                <h5>{data.song.title}</h5>
                {data.song.lyrics.length ? (
                    <LyricsList lyrics={data.song.lyrics} />
                ) : null}
                <CreateLyric songId={params.id} />
                <Link to="/">Go Back</Link>
            </div>
        );
    }
}

export default graphql(fetchSongDetailsQuery, {
    options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetails);
