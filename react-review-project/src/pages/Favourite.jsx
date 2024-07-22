import { useContext } from "react"

// this is a object of createContext
import FavouriteContext from "../store/favourite-context"
import MeetupList from "../components/meetups/MeetupList";

const Favourites = () => {
  const favoriteCtx = useContext(FavouriteContext);

  let content;
  if(favoriteCtx.totalFavourites === 0) {
    content = <h3 className="description"><b>You got no favorites yet,Start adding some</b></h3>
  } else {
    content = <MeetupList meetups={favoriteCtx.favourites} className="favourites"/>
  }

  return <section>
    {content}
  </section>
}

export default Favourites