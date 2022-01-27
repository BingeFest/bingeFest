// HEader
import { Link } from 'react-router-dom';
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
            <div>
                <form className="formContainerHeader">
                    <button className='btHeader' >Search</button>
                </form>
            </div>
        </div>
    )
}

export default Header