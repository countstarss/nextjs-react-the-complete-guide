import { useRouter,withRouter } from "next/router";


const PortfolioProject = () => {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);
    // console.log(router.query);
  return (
    <div><h1>[portfolioId]</h1></div>
  )
}

export default PortfolioProject;