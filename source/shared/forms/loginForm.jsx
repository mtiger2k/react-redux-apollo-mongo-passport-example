import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import loginValidation from './loginValidation'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} className="form-control" placeholder={label} type={type}/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
        </div>
    </div>
)

@reduxForm({
    form: 'login',
    validate: loginValidation
})
export default class LoginForm extends Component {

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field name="username" className="form-control" component={renderField} type="text" label="Login name"/>
                <Field name="password" className="form-control" component={renderField} type="password" label="Password"/>
                <div>
                    <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
                    <button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        );
    }
}