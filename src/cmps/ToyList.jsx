import { ToyPreview } from "./ToyPreview.jsx";
const { Link } = ReactRouterDOM
export function ToyList({ toys,onRemoveToy,onEditToy }) {

    return <section className="toys-container">

        {toys && toys.map(toy =>
            <li className="toy-box" key={toy._id}>
                <ToyPreview key={toy._id} toy={toy} />

                <div>
                    <button onClick={() => onRemoveToy(toy._id)}>x</button>
                    <Link className="btn" to={`toy/edit/${toy._id}`}> Edit</Link>

                </div>
            </li>
        )}
    </section>
}