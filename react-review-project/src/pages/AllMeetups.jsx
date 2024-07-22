import { useState,useEffect } from "react"

import MeetupList from "../components/meetups/MeetupList"



const AllMeetups = () => {

    const [isLoading,setIsLoading] = useState(true);
    const [loadedMeetups,setLoadedMeetups] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://react-project-5e3c2-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json').then(response => {
            return response.json();
            }).then(data => {
                // 将从Firebase中拿到的数据对象转成一个数组
                const meetups = []
                for( const key in data) {
                    const meetup = {
                        id:key,
                        ...data[key]
                    }
                    meetups.push(meetup);
                }
                setIsLoading(false);
                setLoadedMeetups(meetups);
            })
    },[setIsLoading,setLoadedMeetups]);
    

    if (isLoading) {
        return (
            <section>
                <b>Loading...</b>
            </section>
        )
    }

    return <section>
        <MeetupList meetups={loadedMeetups}/>
    </section>
}

export default AllMeetups