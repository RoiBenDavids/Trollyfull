import React from 'react'
import { Formik } from 'formik';


export class Signup extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        imgUrl: 'https://res.cloudinary.com/roidinary/image/upload/v1600790523/Untitled-1_xumtnf.jpg'
    }
    handleChange=(ev)=>{
        const {value,name}=ev.target;
        this.setState({...this.state,[name]:value})
    }
    onSubmit=(ev)=>{
        ev.preventDefault()
        this.props.handleForm(this.state,'signup',this.props.tripToRed)

    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="flex column align-center">
                <input
                    type='text'
                    name='username'
                    value={this.state.username}
                    placeholder='Username'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <input
                    type='email'
                    name='email'
                    value={this.state.email}
                    placeholder='email'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    placeholder='password'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <button className="styled-button">Sign Up</button>
            </form>
        )
    }
}
