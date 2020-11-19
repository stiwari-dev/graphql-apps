import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

class LyricsList extends React.Component {
    likeLyricHandler(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: "Mutation",
                likeLyric: {
                    __typename: "LyricType",
                    id,
                    likes: likes + 1,
                },
            },
        });
    }

    render() {
        return (
            <ul className="collection">
                {this.props.lyrics.map(({ id, content, likes }) => (
                    <li className="collection-item" key={id}>
                        {content} &nbsp;
                        <span>
                            (Likes: <strong>{likes}</strong>)
                        </span>
                        <i
                            className="material-icons right"
                            onClick={() => this.likeLyricHandler(id, likes)}
                        >
                            thumb_up
                        </i>
                    </li>
                ))}
            </ul>
        );
    }
}

const likeLyricMutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(likeLyricMutation)(LyricsList);
