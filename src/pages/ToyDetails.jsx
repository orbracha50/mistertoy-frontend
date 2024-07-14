import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"




export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    console.log(toyId)
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        }

        catch (err) {
            console.log('Had issues in toy details', err)
            Navigate('/toy')
        }
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            {/* <Link to={`/car/edit/${toy._id}`}>Edit</Link> */}
            <Link className="btn" to={`/toy`}>Back</Link>
        </section>
    )
}