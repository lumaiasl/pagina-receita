import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { recipes } from "@/lib/data"
import InfoPill from "@/components/InfoPill"
import PrepSteps from "@/components/PrepSteps"

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
                <Link className="flex text-orange-400 hover:text-orange-700 mb-6" href="/receitas">
                <ChevronLeft />
                Voltar para receitas
                </Link>

                <section className="rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-96 w-full">
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                        >

                        </Image>
                    </div>

                     <div className="flex flex-col gap-6 p-6">

                            <div>
                                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                                <p>{recipe.description}</p>
                            </div>

                            <div className="flex gap-4">
                                <InfoPill title="Preparo" info={recipe.prepTime} />
                                <InfoPill title="Cozimento" info={recipe.cookTime} />
                                <InfoPill title="Porções" info={recipe.servings} />
                                <InfoPill title="Categoria" info={recipe.category} />

                            </div>

                            <div className="grid grid-cols-2">
                                
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
                                    <ul className="list-disc list-inside space-y-2">
                                        {recipe.ingredients.map((ingredient, index) => (<li className="marker:text-orange-500" key={index}>{ingredient}</li>
                                    ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-4">Modo de preparo</h2>
                                    <ul className="space-y-4">
                                        {recipe.instructions.map((instruction, index) => (
                                            <PrepSteps index={index} description={instruction} key={instruction}/>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                </section>
            </div>
        </main>
    )
}