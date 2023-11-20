import React, { useContext } from 'react'
import Notecontext from '../context/notecontext'

function Notesitem(props) {

    const context = useContext(Notecontext)

    const { deletenote } = context;

    const { notes, updatenote } = props
    return (
        <div className="card flex-row mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deletenote(notes._id) }} />
                    <i className="fa-regular fa-pen-to-square " onClick={() => { updatenote(notes) }} />
                </div>
                <h5 className="card-title">{notes.title}</h5>
                <p className="card-text">{notes.Description}</p>
            </div>
        </div>
    )
}

export default Notesitem
