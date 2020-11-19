import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import fetchSongDetails from "../../queries/fetchSongDetails";

class CreateLyric extends React.Component {
    constructor() {
        super();
        this.state = {
            content: "",
        };
    }

    addLyricHandler(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId,
            },
            refetchQueries: [
                {
                    query: fetchSongDetails,
                    variables: { id: this.props.songId },
                },
            ],
        });
        this.setState({ content: "" });
    }

    render() {
        return (
            <form onSubmit={this.addLyricHandler.bind(this)}>
                <label htmlFor="content">Add Lyric Content</label>
                <input
                    id="content"
                    name="content"
                    onChange={(event) =>
                        this.setState({ content: event.target.value })
                    }
                    value={this.state.content}
                />
                <button
                    className="btn waves-effect green waves-light"
                    type="submit"
                    name="submit"
                >
                    Add
                    <i className="material-icons right">send</i>
                </button>
            </form>
        );
    }
}

const addLyricMutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
            }
        }
    }
`;

export default graphql(addLyricMutation)(CreateLyric);
