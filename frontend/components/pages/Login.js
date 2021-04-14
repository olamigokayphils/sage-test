import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import Header from "../layout/Header"
import { login } from "../../actions/authentication"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displaySpinner, setDisplaySpinner] = useState(false)


    const dispatch = useDispatch();

    const loginUserFormDetails = () => {
        setDisplaySpinner(true)
        dispatch(login(email, password))
    }

    const userAuthentication = useSelector((state) => state.authentication);

    useEffect(() => {
            if(!userAuthentication.isAuthenticated){
                setDisplaySpinner(false)
            }
    }, [userAuthentication])



    if(userAuthentication.isAuthenticated){
        return <Redirect to="/" />
    }


    return (
        <Fragment>
        <Header/>
        <div className="container mt-5 col-sm-6 offset-3">
            <div className="card card-body shadow">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    loginUserFormDetails();
                    } }>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input required className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input required className="mt-1 form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                        {displaySpinner && 
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}

                        {!displaySpinner && <button type="submit" className="btn btn-primary">Submit</button>}
                    </div>

                </form>
            </div>
        </div>
        </Fragment>
    )
}
