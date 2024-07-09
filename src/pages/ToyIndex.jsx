
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, saveToy } from '../../store/actions/toy.action'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import { toyService } from '../../services/toy.service.js'

export function ToyIndex(){
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(carId) {
        removeToyOptimistic(carId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove Toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyCar()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add Toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update Toy')
            })
    }




    console.log(toys)
    return <section>
        <Link to={`/toy/edit`} className="btn" >Add </Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy}/>
    </section>

}