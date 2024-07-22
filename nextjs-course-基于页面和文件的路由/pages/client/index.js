import Link from "next/link"


const ClientPage = () => {

    const clients = [
        {id:"max",name:"最大值"},
        {id:"menu",name:"菜单"}
    ]
  return (
    <div>
        <div>ClientPage</div>
        {/* 动态导航，渲染同样的页面，但是传入的id不同 */}
        <ul>
            {clients.map((client) => (
                <li  key={client.id}>
                    {/* 第一种方法 */}
                    {/* <Link href={`/client/${client.id}`}>{client.name}</Link> */}

                    {/* Next提供的方法 */}
                    <Link href={{
                        pathname:'/client/[id]',
                        query: { id: client.id }
                    }}>{client.name}</Link>
                    
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ClientPage