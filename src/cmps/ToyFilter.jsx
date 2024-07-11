import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
        <section className="toy-filter full">
            <form className="filter-container" >
                <TextField placeholder="By Full name"
                    value={filterByToEdit.name} name="name" onChange={handleChange} id="filled-basic" label="Full Name" variant="filled" />
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="stock">By Stock</InputLabel>
                    <Select
                        name="stock"
                        labelId="stock"
                        id="stock"
                        value={filterByToEdit.stock}
                        label="stock"
                        onChange={handleChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="inStock">In stock</MenuItem>
                        <MenuItem value="outOfStock">Out of stock</MenuItem>
                    </Select>
                </FormControl>


                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">By Label</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        name = "labels"
                        value={filterByToEdit.labels}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                    >
                        {toyLabels.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                /* style={getStyles(name, personName, theme)} */
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    width: 150,
                }} >
                    <InputLabel id="sortBy">Sort By</InputLabel>
                    <Select
                        name="sortBy"
                        labelId="sortBy"
                        id="sortBy"
                        value={filterByToEdit.sort}
                        label="sortBy"
                        onChange={handleChange}
                    >
                        <MenuItem value="name">name</MenuItem>
                        <MenuItem value="price">price</MenuItem>
                        <MenuItem value="created">created</MenuItem>
                    </Select>
                </FormControl>

            </form>

        </section>
    )
}