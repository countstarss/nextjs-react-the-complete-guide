import classes from './MeetupItem.module.css'
import Card from '../UserInterface/Card'

import { useContext } from 'react'

import FavouriteContext from '../../store/favourite-context'

// const MeetupItem = ({id,image, title, address, description}) => {
const MeetupItem = (props) => {

    const FavoriteCtx = useContext(FavouriteContext)
    console.log(props.id);
    const itemIsFavourite = FavoriteCtx.itemIsFavourite(props.id)

    function toggleFavoriteStatusHandler() {
        console.log('Click toggle');
        console.log(`item status : ${itemIsFavourite}`);
        if(itemIsFavourite) {
            FavoriteCtx.removeFavourite(props.id);
        }else {
            FavoriteCtx.addFavourite({
                id:props.id,
                image:props.image,
                title:props.title,
                address:props.address,
                description:props.description
            });
        }
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt="" />
                </div>
                <div className={classes.content}>
                    <h2>{props.title}</h2>
                    <h3>ADDRESS : {props.address}</h3>
                    <h3>{props.description}</h3>
                </div>
                <div className={classes.actions}>
                    <button onClick={toggleFavoriteStatusHandler}>{itemIsFavourite ? "UnFavorite" : "To Favorite"}</button>
                </div>
            </Card>
        </li>
    )
}

export default MeetupItem