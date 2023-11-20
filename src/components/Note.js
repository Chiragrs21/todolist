import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import Notecontext from '../context/notecontext'
import Notesitem from '../components/Notesitem'


function Note() {
    const context = useContext(Notecontext)
    const { state, addnote, getallnote, editnote } = context;

    const [note, setnote] = useState({ title: " ", description: "", Tag: " " })

    const [enote, esetnote] = useState({ id: "", etitle: "", edescription: "", eTag: "" })

    const onclick1 = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.Tag)
    }
    const closeref = useRef(null)
    const onclick = () => {
        editnote(enote.etitle, enote.edescription, enote.eTag, enote.id)
        closeref.current.click()
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const eonchange = (e) => {
        esetnote({ ...enote, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getallnote();
    }, [])

    const ref = useRef(null)
    const updatenote = (note) => {
        ref.current.click()
        esetnote({ id: note._id, etitle: note.title, edescription: note.Description, eTag: note.Tag })
    }



    return (
        <>
            <h4 className='title mt-2'>Create your List</h4>
            <form>
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input className="form-control" id="description" name='description' onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input className="form-control" id="Tag" name='Tag' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary mb-4" onClick={onclick1}>Submit</button>
            </form >
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input className="form-control" id="etitle" value={enote.etitle} name="etitle" aria-describedby="emailHelp" onChange={eonchange} />
                                <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <input className="form-control" id="edescription" value={enote.edescription} name='edescription' onChange={eonchange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                <input className="form-control" id="eTag" value={enote.eTag} name='eTag' onChange={eonchange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onclick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                state.map((notes) => {
                    return <Notesitem notes={notes} key={notes._id} updatenote={updatenote} />
                })
            }

        </>

    )
}

export default Note
