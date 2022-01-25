// HEader
import { Link, Route, Routes, Outlet, useParams } from 'react-router-dom';
const Header = () => {

    return (
        <div>
            <header>
                <nav className="wrapper">
                    <ul>
                        <li >
                            <Link className="classNav" to= '/food'>Takeout </Link>
                        </li>
                        <li>
                            <Link  className="title" to="/"> Binge Fest</Link>
                            </li>
                        <li>
                            <Link className="classNav" to='/tvshows'> TV shows</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="formContainerHeader">
                <form>
                    <button className='btHeader' >Search</button>
                </form>
            </div>
        </div>
    )
}

export default Header