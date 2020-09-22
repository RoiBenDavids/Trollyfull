import React from 'react'
import { Formik } from 'formik';


export function Signup({handleForm,handleClick}) { 
    return<div>
        <h1>Sign Up</h1>
        <Formik
            initialValues={{ email: '', password: '' , username:''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.form = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.form = 'Invalid email address';
                }else if(values.password.length<4){
                    errors.form = 'too short password'
                }else if(!values.username){
                    errors.form = 'please enter username'
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleForm(values,'signup')
                setSubmitting(false);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="username"
                            name="username"
                            placeholder="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && errors.username}
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="text"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
            </button>
            <p>already user?<span onClick={()=>handleClick('login')}>log in</span> </p>
                    </form>
                )}
        </Formik>
    </div>
;}

