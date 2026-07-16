import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { recipes } from "@/lib/data"

interface RecipePageProps {
    params: Promise<{
        id: string;
    }>
}
export default async function ReceitaPage({ params }: RecipePageProps){
    const resolvedParams = await params;
    const recipe = recipes.find((recipe) => recipe.id === resolvedParams.id)

    if(!recipe) {
        return notFound()
    }

    return(
        <main className="grow py-8">
            <div className="container mx-auto">
                <Link className="flex text-orange-400 hover:text-orange-700" href="/receitas">
                <ChevronLeft />
                Voltar para receitas
                </Link>

                <section className="text-black">
                    <div className="relative h-96 w-full">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                        >

                        </Image>
                    </div>

                     <div className="container mx-auto">
                            <h1>{recipe.title}</h1>
                            <p>{recipe.description}</p>
                            <div className="flex">

                            </div>

                            <div>
                                
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (<li key={index}>{ingredient}</li>
                                ))}
                                </ul>

                                <div>

                                </div>
                            </div>
                        </div>
                </section>
            </div>
        </main>
    )
}