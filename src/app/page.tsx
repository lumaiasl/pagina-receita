import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { recipes } from "@/lib/data";
import RecipeCard from "@/components/RecipeCards";

export default function Home() {
  const featureRecipes = recipes.slice(0, 3)
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
        <section className="py-12 text-black bg-white">
          <div className="container mx-auto flex flex-col items-center">
            <h2 className="text-lg font-bold">Receitas em Destaque</h2>
            <div>
              <div className="flex w-ful gap-8">
                {featureRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
              <Link className="flex text-orange-400 hover:text-orange-700 transition-colors" href="">
              Ver todas as receitas<ChevronRight />
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}
