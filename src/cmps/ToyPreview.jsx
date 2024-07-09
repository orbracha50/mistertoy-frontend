import { Link } from "react-router-dom";

export function ToyPreview({toy}){

    return <article >
        <h1>{toy.name}</h1>
        <h2>{toy.price}$</h2>

        <Link to={`/toy/${toy._id}`}>Details</Link>
    </article>
}