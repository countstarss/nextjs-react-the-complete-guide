import Link from "next/link";


function HomePage() {
    return<>
        <h1>HELLO,NEXT</h1>
        <ul>
            <li>
                <Link href="/portfolio">Portfolio</Link>
            </li>
        </ul>
        </>
}

export default HomePage;