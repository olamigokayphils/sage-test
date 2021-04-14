import React from 'react'
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../actions/authentication"


export default function Header() {
    const dispatch = useDispatch()
    const userAuthentication = useSelector((state) => state.authentication);
    const logoutAdmin = () => {
        dispatch(logout())
    }

    return (
        <nav className="navbar navbar-light bg-light">
        <div className="container container-fluid">
            <a className="navbar-brand">Sage Test</a>
            <form className="d-flex">
            {userAuthentication.isAuthenticated ? 
            <button className="btn btn-outline-success" type="button" onClick={() => logoutAdmin()}>Admin Logout</button> : 
            <Link className="btn btn-outline-success" to="/login">Admin LogIn</Link>}
            </form>
        </div>
        </nav>)
}
