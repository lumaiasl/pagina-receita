import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="grow">
        <section className="flex flex-col bg-orange-50 gap-6 py-12 items-center">
          <div className="flex flex-col items-center gap-4 container mx-auto text-black">
            <h1 className="text-5xl">Receitas Deliciosas</h1>
            <p className="text=xl">Descubra receitas simples e saborosas para todas as ocasiões</p>
            <Link href="/receitas" className="bg-orange-500 text-white font-bold rounded-xl px-2 py-2 hover:bg-orange-800 transition-colors">
            Ver todas as receitas
            </Link>
          </div>
        </section>
        <section className="py-12">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Receitas em Destaque</h2>
            <div>

              <Link className="flex text-orange-400 hover:text-orange-700 transition-colors" href="">
              Ver todas as receitas<ChevronRight />
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}
