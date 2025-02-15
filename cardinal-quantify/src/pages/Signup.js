import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignupValidation'
import axios from 'axios'

function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState ({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err));

        }
    } 
  return (
    <div>
    <div>
        <form action="" onSubmit = {handleSubmit}> 
        <div>
                <label htmlFor="name"> Name </label>
                <input type = "text" placeholder ="Enter name" name = "name" onChange={handleInput}/>
                {errors.name &&  <span> {errors.name}</span>}
            </div>
            <div>
                <label htmlFor="email"> Email </label>
                <input type = "email" placeholder ="Enter email" name = "email" onChange={handleInput} />
                {errors.email &&  <span> {errors.email}</span>}
            </div>
            <div>
                <label htmlFor="password"> Password </label>
                <input type = "password" placeholder ="Password" name = "password" onChange={handleInput}/>
                {errors.password &&  <span> {errors.password}</span>}
            </div>
            <button type = "submit">Sign up</button>
            <p>Meow</p>
            <Link to="/"><button>Login</button> </Link>

        </form>
    </div>
</div>
  )
}

export default Signup