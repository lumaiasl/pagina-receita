import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grow">
      <div className="container mx-auto">
        <section>
          <h1>Receitas Deliciosas</h1>
          <p>Descubra receitas simples e saborosas para todas as ocasiões</p>

          <Link href="/receitas">
          Ver todas as receitas
          </Link>
        </section>
      </div>
    </main>
  );
}
