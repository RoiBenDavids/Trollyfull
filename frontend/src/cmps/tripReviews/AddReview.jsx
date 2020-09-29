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

    onAddReview = (ev) => {
        ev.preventDefault();
        if (!this.state.reviewToAdd.rating) {
            this.props.showMsg({ msg: 'You must rate this trip first', type: 'input' })
            return
        }
        this.props.addReview(this.state.reviewToAdd)
        this.setState({
            reviewToAdd: {
                content: '',
                name: '',
                rating: null,
            }
        })
    }
    setRating = (val) => {
        this.setState({ reviewToAdd: { ...this.state.reviewToAdd, rating: val } })
    }

    render() {
        const classToAdd = this.props.isReviewOpen ? 'open' : '';
        const currRate = this.state.reviewToAdd.rating
        return (
            <div className={`review-modal flex ${classToAdd}`}>
                <form className="flex column " onSubmit={this.onAddReview}>
                    <ErrorMsg />

                    <div className="flex">
                        <input className="styled-input" placeholder="Enter your name" type="text" name="name" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} />
                        {/* <select name="rating" defaultValue="-1" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} >
                            <option disabled value="-1">Rate the trip</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select> */}

                        <div className="stars-rate flex">
                            <i className={`fas fa-star star-5 ${currRate === 5 ? 'active' : ''}`} onClick={() => { this.setRating(5) }}></i>
                            <i className={`fas fa-star star-4 ${currRate >= 4 ? 'active' : ''}`} onClick={() => { this.setRating(4) }}></i>
                            <i className={`fas fa-star star-3 ${currRate >= 3 ? 'active' : ''}`} onClick={() => { this.setRating(3) }}></i>
                            <i className={`fas fa-star star-2 ${currRate >= 2 ? 'active' : ''}`} onClick={() => { this.setRating(2) }}></i>
                            <i className={`fas fa-star star-1 ${currRate >= 1 ? 'active' : ''}`} onClick={() => { this.setRating(1) }}></i>
                        </div>
                    </div>
                    <ErrorMsg />
                    <textarea id="content" required name="content" placeholder="Enter your review here" ref={this.elInput} onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }}>
                    </textarea>
                    <button className="styled-button">Save</button>
                </form>
            </div>
        )
    }
}
