import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
console.log(value)
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Full Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By Full name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="stock">stock:</label>
                <select value={filterByToEdit.stock} name="stock" onChange={handleChange} id="stock">
                    <option value="All">All</option>
                    <option value="inStock">In stock</option>
                    <option value="outOfStock">Out of stock</option>
                </select>

                <label htmlFor="labels">Choose category:</label>
                <select name="labels" id="labels" /* value={filterByToEdit.labels} */ onChange={handleChange} multiple>
                    <option value="onWheels">On wheels</option>
                    <option value="boxGame">Box game</option>
                    <option value="art">Art</option>
                    <option value="baby">Baby</option>
                    <option value="doll">Doll</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="batteryPowered">Battery Powered</option>
                </select>
                <label htmlFor="sortBy">Sort By:</label>
                <select value={filterByToEdit.sort} name="sortBy" onChange={handleChange} id="sortBy">
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">price</option>
                    <option value="created">created</option>
                </select>
            </form>

        </section>
    )
}