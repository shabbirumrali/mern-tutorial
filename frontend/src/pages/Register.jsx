import {useState, useEffect} from 'react'
import { FaUser } from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <>
        <section className="heading">
            <h1><FaUser /> Register</h1>
            <p>Register Userself</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input 
                        type="text" 
                        name='name' 
                        value={name} 
                        placeholder="Enter Name"
                        id='name'
                        className='form-control'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type="email" 
                        name='email' 
                        value={email} 
                        placeholder="Enter Email"
                        id='email'
                        className='form-control'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type="password" 
                        name='password' 
                        value={password} 
                        placeholder="Enter Password"
                        id='password'
                        className='form-control'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type="password" 
                        name='password2' 
                        value={password2} 
                        placeholder="Confirm password"
                        id='password2'
                        className='form-control'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register