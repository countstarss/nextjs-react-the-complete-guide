import { createContext, useState } from "react";

const FavouriteContext = createContext({
    favourites: [],
    totalFavourites:0,
    addFavourite: (favouriteMeetup) => {},
    removeFavourite: (meetupId) => {},
    itemIsFavourite: (meetupId) => {}
});

export function FavouriteContextProvider(props) {
    const [userFavourites,setUserFavourites] = useState([]);

    function addFavouriteHandler(favouriteMeetup) {
        setUserFavourites(prevUserFavourite => {
            return prevUserFavourite.concat(favouriteMeetup);
        });
    }

    function removeFavouriteHandler(meetupId) {
        setUserFavourites(prevUserFavourite => {
            return prevUserFavourite.filter(meetup => meetup.id !== meetupId);
        });
    }

    // 只要userFavourites中能找到相同id的，就说明它已经在Favourite里
    function itemIsFavouriteHandler(meetupId) {
        return userFavourites.some(meetup => meetup.id === meetupId)
    }


    const context = {
        favourites: userFavourites,
        totalFavourites: userFavourites.length,
        addFavourite: addFavouriteHandler,
        removeFavourite: removeFavouriteHandler,
        itemIsFavourite: itemIsFavouriteHandler
    }

    return <FavouriteContext.Provider value={context}>
        {props.children}
    </FavouriteContext.Provider>
}

export default FavouriteContext;
