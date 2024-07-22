import { useEffect,useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {

    const [sales,setSales] = useState(props.sales);

    console.log(sales);
    /*
    TODO: useSWR
    MARK: - useSWR
    */
    const fetcher = url => fetch(url).then(res => res.json());
    const { data, error } = useSWR('https://react-project-5e3c2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',fetcher);

    useEffect(() => {
        if(data) {
            const transformedData = [];
            for(const key in data) {
                transformedData.push({
                    id: key, 
                    username:data[key].username, 
                    volume: data[key].volume
                });
            }
            setSales(transformedData);
            
        }
    },[data]);

    if(error) {
        return <p>Failed to load</p>
    }
    if(!data && !sales) {
        return <p>Loading...</p>
    }

    /*
    TODO: Traditional
    MARK: - Traditional
    */
    // const [sales,setSales] = useState([]);
    // const [isLoading,setIsLoading] = useState(false);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://react-project-5e3c2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         const transformedData = [];
    //         for(const key in data) {
    //             transformedData.push({id: key, username:data[key].username, volume: data[key].volume});
    //         }
    //         setSales(transformedData);
    //         setIsLoading(false);
    //     })
    // },[]);

    // if(isLoading) {
    //     return <p>Loading...</p>
    // }

    // if(!sales) {
    //     return <p>Loading...</p>
    // }


    return (
        <ul>
            {sales.map((sale) => <li key={sale.id}>{sale.username} - {sale.volume}</li>)}
        </ul>
    )
}
/*
TODO:  通过getStaticProps获取初始状态
MARK: - getStaticProps
*/
export async function getStaticProps() {
    const response = await fetch('https://react-project-5e3c2-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
    const data = await response.json()
    const transformedData = [];

    for(const key in data) {
        transformedData.push({
            id: key, 
            username:data[key].username, 
            volume: data[key].volume
        });
    }
    console.log(transformedData);

    return { 
        props: { sales : transformedData },
        revalidate:60 
    };
}



export default LastSalesPage;