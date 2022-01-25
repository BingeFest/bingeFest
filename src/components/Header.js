// HEader
import { Link, Route, Routes, Outlet, useParams } from 'react-router-dom';
const Header = () => {

    return (
        <div>
            <header>
                <nav className="wrapper">
                    <ul>
                        <li >
                            <Link className="nav" to="Fest/Takeout">Takeout </Link>
                        </li>
                        <li className="nav"> Binge Fest</li>
                        <li className="title" >
                            <Link className="nav" to="Fest/TVsows"> TV shows</Link>
                        </li>
                    </ul>
                </nav>
            </header>

        </div>
    )
}

export default Header