import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"


const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            console.log('target.selectedOptions:', target.selectedOptions)
            value = Array.from(target.selectedOptions, option => option.value || [])
            console.log('value:', value)
        }
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { labels } = filterByToEdit
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


                <div>
                    <label htmlFor="labels">Choose category:</label>
                    <select
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                </div>
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