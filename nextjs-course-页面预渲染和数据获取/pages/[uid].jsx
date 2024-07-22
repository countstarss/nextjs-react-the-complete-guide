function UserIdPage(props) {
    return (
        <h1>{props.id}</h1>
    )
}

export default UserIdPage;

/*
TODO: getServerSideProps 没有预渲染，所以不需要定义路径
MARK: - getServerSideProps
*/
export async function getServerSideProps(context) {
    const { params } = context;

    const userId = params.uid;

    return {
        props:{
            id: 'userId-' + userId
        }
    }
}