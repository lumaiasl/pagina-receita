import { headers } from "next/headers";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white text-black drop-shadow-xl py-4">
      <div className="flex justify-between items-center container mx-auto px-2">
        <Link
          className="text-xl font-bold hover:scale-105 transition-all"
          href="/"
        >
          Receitas Deliciosas
        </Link>

        <nav className="flex gap-4">
          <Link className="hover:text-orange-500 transition-colors" href="/">
            Início
          </Link>
          <Link
            className="hover:text-orange-500 transition-colors"
            href="/receitas"
          >
            Receitas
          </Link>
        </nav>
      </div>
    </header>
  );
}
