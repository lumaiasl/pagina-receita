import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export default function ReceitaPage(){
    return(
        <main className="grow py-8">
            <div className="container mx-auto">
                <Link className="flex items-center text-orange-400 hover:text-orange-700" href="/receitas">
                <ChevronLeft />
                Voltar para receitas
                </Link>

                <section>
                    <div className="relative h-96 w-full">
                        <Image
                            src=""
                            alt="Título da receitaa"
                        >

                        </Image>

                        <div>
                            <h1>Título da receita</h1>
                            <p>Descrição</p>
                            <div className="flex">
                                /* TODO: componentes de info */
                            </div>

                            /* Colunas */
                            <div>

                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}