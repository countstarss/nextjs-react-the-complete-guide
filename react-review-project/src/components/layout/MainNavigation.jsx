import { Link } from "react-router-dom"
import classes from './MainNavigation.module.css'

import { useContext } from "react"
import FavouriteContext from "../../store/favourite-context"

const MainNavigation = () => {

    const favoriteCtx = useContext(FavouriteContext);


  return <header className={classes.header}>
    <div className={classes.logo}>
        React Meetup        
    </div>
    <div >
        <ul>
            <li>
                <Link to='/'>all-meetups</Link>
            </li>
            <li>
                <Link to='/new-meetup'>new-meetup</Link>
            </li>
            <li>
                <Link to='/favourites'>
                favourites
                <span className={classes.badge}>{favoriteCtx.totalFavourites}</span>
                </Link>
            </li>
        </ul>
    </div>
  </header>
}

export default MainNavigation