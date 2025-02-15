import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import validation from './LoginValidation';
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState ({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
    }

  return (
    <div>
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input type = "email" placeholder ="Enter email" name = 'Email' onChange={handleInput} />
                    {errors.email &&  <span> {errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="password"> Password </label>
                    <input type = "password" placeholder ="Password" name = 'Password' onChange={handleInput} />
                    {errors.password &&  <span> {errors.password}</span>}
                </div>
                <button type = 'submit'>Log in</button>
                <p>Meow</p>
                <Link to="/signup"><button>Create account</button> </Link>

            </form>
        </div>
    </div>
  )
}

export default Login