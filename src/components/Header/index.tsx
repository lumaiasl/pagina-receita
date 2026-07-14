import { headers } from "next/headers";
import Link from "next/link";

export default function Header(){
    return (
        <header className="">
            <h1>Receitas Deliciosas</h1>

            <nav>
                <Link href="/">Início</Link>
                <Link href="/receitas">Receitas</Link>
            </nav>
        </header>
    )
}