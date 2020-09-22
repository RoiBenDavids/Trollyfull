import React from 'react'


export class LongTxt extends React.Component {

    state = {
        text: this.props.text,
        isLongTxtShown: false
    }

    onReadMore = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    render() {
        const  text  = this.state.text
        var isLongTxtShown = this.state.isLongTxtShown
        return (
            <p>
                {(text.length < 100 || (isLongTxtShown && text.length > 100)) ? text : text.substring(0, 100) + ' . . .'}
                {text.length > 100 && <button className=" styled-button expend-description" onClick={this.onReadMore}>{this.state.isLongTxtShown ? 'Less' : 'More'}</button>}
            </p >
        )
    }
}
