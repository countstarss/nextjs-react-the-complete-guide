import Link from 'next/link';
import classes from '../styles/index.module.css'
import path from 'path';
import fs from 'fs/promises';
import { redirect } from 'next/dist/server/api-utils';

function HomePage({ products }) {
    return<>
        <div className={ classes.home }>
            <h1 className={ classes.title }>HELLO,NEXT</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>{product.title}</Link>
                    </li>))}
            </ul>
        </div>
    </>
}

/*
TODO: getStaticProps : 告诉Next.js，这是需要预渲染的内容
MARK: - getStaticProps
*/

// 在server-side运行
export async function getStaticProps(context) {
    console.log('Re-Generating...');
    // process.cwd() 是根目录，然后找到data下的 'dummy-backend.json'
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    if(!data) {
        return {
            redirect:{
                destination:'/no-data'
            }
        }
    }

    if(data.products.length === 0 ) {
        return { notFound:true };
    }

    return { props:{
        products:data.products
    },
    revalidate:10, //启用ISR  每 10 秒重新生成页面
    // notFound:true,
  };
}

export default HomePage;