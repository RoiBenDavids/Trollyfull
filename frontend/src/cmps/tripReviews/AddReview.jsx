import React from 'react'
import { ErrorMsg } from '../MainCmps/ErrorMsg'



export class AddReview extends React.Component {

    state = {
        reviewToAdd: {
            content: '',
            name: '',
            rating: null,
        }
    }
    elInput = React.createRef()

    componentDidMount() {
        this.elInput.current.focus()
    }


    onInputChange = (value, inputType) => {
        this.setState({
            reviewToAdd: { ...this.state.reviewToAdd, [inputType]: value }
        })
    }

    onAddReview = (ev, review) => {
        ev.preventDefault();
        let addReview = this.props.props
        if (!review.rating) {
            this.props.showMsg('You must rate this trip first')
            return
        }
        addReview(review)
        this.props.closeModal()
    }

    render() {
        return (
            <div className={'review-modal flex'}>
                <form className="flex column " onSubmit={(ev) => { this.onAddReview(ev, this.state.reviewToAdd) }}>
                    <div className=" headline">
                        <h2>Review</h2>
                    </div>
                    <input className="styled-input" placeholder="Enter your name" type="text" name="name" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} />
                    <textarea id="content" required name="content" placeholder="Enter your review here" ref={this.elInput} onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }}>
                    </textarea>
                    <ErrorMsg />
                    <select name="rating" defaultValue="-1" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} >
                        <option disabled value="-1">Rate the trip</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onSubmit={(ev) => { this.onAddReview(ev, this.state.reviewToAdd) }}>Save</button>
                </form>
            </div>
        )
    }
}
