import { useRouter } from "next/router";


const ClientProjectPage = () => {

    const router = useRouter();
    console.log(router.query);

    function loadProjectHandler() {
      // load data...
      // router.push('client/max/projectA')
      router.push({
        pathname: './client/[id]/clientProjectId',
        query:{id:'max',clientProjectId:'a'}
      })
    }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}> Load Project A</button>
    </div>
  )
}

export default ClientProjectPage