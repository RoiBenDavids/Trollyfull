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
        // if (!review.rating) {
        //     this.props.showMsg('You must rate this trip first')
        //     return
        // }
        this.props.addReview(this.state.reviewToAdd)
        this.setState({
            reviewToAdd: {
                content: '',
                name: '',
                rating: null,
            }
        })
    }

    render() {
        const classToAdd = this.props.isReviewOpen ? 'open' : '';
        console.log(this.props.isReviewOpen);
        return (
            <div className={`review-modal flex ${classToAdd}`}>
                <form className="flex column " onSubmit={this.onAddReview}>
                    <div className="flex">
                        <input className="styled-input" placeholder="Enter your name" type="text" name="name" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} />
                        <select name="rating" defaultValue="-1" required onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }} >
                            <option disabled value="-1">Rate the trip</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <textarea id="content" required name="content" placeholder="Enter your review here" ref={this.elInput} onChange={(ev) => { this.onInputChange(ev.target.value, ev.target.name) }}>
                        {/* <ErrorMsg /> */}
                    </textarea>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}
