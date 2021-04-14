import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Header from "../layout/Header"
import QRCode from "react-qr-code";
import { loadUser } from '../../actions/authentication'
import { getInvestments, deleteInvestment, addInvestment } from '../../actions/investments'



export default function Home() {
    const [investments, setInvestments] = useState([])
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [displaySpinner, setDisplaySpinner] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(getInvestments())
    }, [])

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      };

      const userAuthentication = useSelector((state) => state.authentication.isAuthenticated);
    const investmentArray = useSelector((state) => state.investments.investments);
    const prevInvestmentArray = usePrevious(investmentArray)


    useEffect(()=> {
        if(prevInvestmentArray){
        if(prevInvestmentArray.length !== investmentArray.length){
        setDisplaySpinner(false)
            setInvestments(investmentArray[investmentArray.length -1])
        }
    }
    })

    const removeInvestment = (id) => {
        if(window.confirm("Are you sure ?")){
            dispatch(deleteInvestment(id))
        }
    }

    const addInvestmentFormDetails = () => {
        setDisplaySpinner(true);
        dispatch(addInvestment(title, amount));
        setTitle('');
        setAmount('');
    }


    return (
        <Fragment>
            <Header/>
            {/**Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Investment</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => {
                    e.preventDefault();
                    addInvestmentFormDetails();
                    } }>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input required className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input required className="mt-1 form-control" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <div className="d-flex justify-content-center">
                        {displaySpinner && 
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}

                        {!displaySpinner && <button type="submit" className="btn btn-primary">Add Test Investment</button>}
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            {/**End Modal */}
            <div className="container">
                <div className="d-flex flex-row justify-content-between">
                <p className="mt-3 fw-bold">Recent Investments Encoded as a QR</p>
                {userAuthentication && <button className="mt-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Investment <i className="fas fa-plus-circle"></i></button>}
                </div>

                <hr/>
                <div className="d-flex flex-row flex-wrap justify-content-around">
                    {investments.map((data, index) => {
                        return(
                        <div key={index} className="d-flex justify-content-center card card-body shadow mx-2 my-2" style={{ flexBasis: "300px", flexGrow: 0.3 }}>
                           <QRCode value={`title:${data.title} &&& amount:${data.amount}` } size={90} />
                            <div className="mt-2 text-center fw-bold text-mute">{data.title}</div>
                            <div className="text-center">Amount: NGN {data.amount}</div>

                            {userAuthentication && <div className="mt-2 d-flex flex-row justify-content-center gap-2">
                                <button disabled className="btn btn-primary"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger" type="button" onClick={()=> removeInvestment(data.id)}><i className="fas fa-trash-alt"></i></button>
                            </div>}
                        </div>
                        )
                    })} 
                </div>
            </div>
        </Fragment>
    )
}
