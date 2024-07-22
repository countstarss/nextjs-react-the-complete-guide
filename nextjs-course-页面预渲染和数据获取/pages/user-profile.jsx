import Link from "next/link";

const UserProfilePage = ({ username }) => {
  return (
    <>
        <h1>{username}</h1>
    </>
  )
}

export default UserProfilePage;

// MARK: - getServerSideProps
export async function getServerSideProps(context) {
    const { params,req,res } = context;
    console.log('Server Side Code');

    return {
        props: {
            username: "Luke King"
        }
    };
}