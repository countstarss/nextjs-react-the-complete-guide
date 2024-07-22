import { Fragment } from "react";
import path from 'path';
import fs from 'fs/promises';
import { notFound } from "next/navigation";

const ProductDetailPage = (props) => {
    const { loadedProduct } = props;

  return (
    <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
  )
}
//
//TODO: 找到路由中的propductID所对应的product，并且返回到前端页面
//

async function getData() {
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)
    return data;
}
// MARK: getStaticProps
export async function getStaticProps(context) {
    const { params } = context;

    const productId = params.productID;

    const data = await getData();

    // 通过路由的内容找product
    const product = data.products.find(product => product.id === productId);

    if(!product) {
        return { notFound:true };
    }

    return {
        props:{
            loadedProduct: product
        }
    }
}
// MARK: - getStaticPaths
export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product) => product.id)
    const paths = ids.map((id) => ({ 
        params:{ productID: id } 
    }));
    console.log(paths);
    return {
        paths,
        // 每次都渲染所有的页面，可能会浪费很多时间和资源
        // 打开fallback之后，即使是没有在上面列出的路由，也可以被即时加载
        fallback: false
    };
}

export default ProductDetailPage;