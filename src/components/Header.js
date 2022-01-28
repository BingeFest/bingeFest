// Header
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
                        <li>
                            <Link className='classNav' to="/randomcombo">Random Combo</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;