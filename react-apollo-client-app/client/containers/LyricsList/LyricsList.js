import React from "react";

class LyricsList extends React.Component {
    render() {
        return (
            <ul className="collection">
                {this.props.lyrics.map(({ id, content }) => (
                    <li className="collection-item" key={id}>
                        {content}
                        <i className="material-icons right">thumb_up</i>
                    </li>
                ))}
            </ul>
        );
    }
}

export default LyricsList;
