import RecipeCard from "@/components/RecipeCards"
import { recipes } from "@/lib/data"

export default function ReceitasPage(){
    return (
        <main className="grow py-8 bg-white text-black">
            <div className="container mx-auto">
                <h1 className="texst-3xl font-bold">Todas as receitas</h1>
                <div className="mt-8 grid grid-cols-3 gap-8">
                    {recipes.map((recipe) => 
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    )}
                </div>
            </div>
        </main>
    )
}