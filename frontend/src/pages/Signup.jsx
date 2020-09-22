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
        this.props.handleForm(this.state,'signup')

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type='text'
                    name='username'
                    value={this.state.username}
                    placeholder='Enter Username'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <input
                    type='email'
                    name='email'
                    value={this.state.email}
                    placeholder='Enter email'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    placeholder='Enter password'
                    onChange={this.handleChange}
                    className='styled-input'
                />
                <button>Sign Up</button>
            </form>
        )
    }
}
