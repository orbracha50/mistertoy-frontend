
import { useEffect, useState } from "react"
import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js"

import { saveToy } from "../../store/actions/toy.action.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()
    console.log(toyId)
    useEffect(() => {
        console.l
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        console.log('hi')
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        console.log(target)
        let { value, name} = target
        setToyToEdit((prevToy) => ({ ...prevToy, [name]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }
    if(toyToEdit=== undefined)return
    return <section className="toy-edit">
        <h2>{(toyToEdit._id) ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter Full name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="text"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />
            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}