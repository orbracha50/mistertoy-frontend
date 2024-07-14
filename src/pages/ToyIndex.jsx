
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../../store/actions/toy.action.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    useEffect(() => {
        loadToys(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(carId) {
        
        try {
            const car = await removeToyOptimistic(carId)
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove Toy')
        }
    }

    console.log(filterBy)
    return <section className='main-layout'>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <Link to={`/toy/edit`} className="btn add" >Add </Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
    </section>

}