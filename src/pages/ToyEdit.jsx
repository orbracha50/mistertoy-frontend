const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
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
    return <section className="toy-edit">
        <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="fullName">Full Name : </label>
            <input type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Full name..."
                value={toyToEdit.fullName}
                onChange={handleChange}
            />
            <label htmlFor="address">Address : </label>
            <input type="text"
                name="address"
                id="address"
                placeholder="Enter Address"
                value={toyToEdit.address}
                onChange={handleChange}
            />
            <label htmlFor="tel">Phone Number : </label>
            <input type="text"
                name="tel"
                id="tel"
                placeholder="Enter Phone Number"
                value={toyToEdit.tel}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}