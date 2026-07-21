import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogDescription } from "../ui/dialog";
import { RecipeFormData, recipeSchema } from "@/lib/FormValidadionScheme/recipeSchema";
import { useForm } from "react-hook-form";

interface RecipeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RecipeFormModal({ isOpen, onClose }: RecipeFormModalProps) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<RecipeFormData>({
        resolver: yupResolver(recipeSchema),
        mode: "onSubmit"
    })

    const onSubmit = (data: RecipeFormData) => {
        console.log(data)
        reset()
        onClose()
    }
    
    const inputStyle = "p-2 border border-zinc-200 rounded-md grow"
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Nova receita</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-2 gap-2">

                        {/* Título */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title">Título</label>
                            <input className={inputStyle} type="text" id="title" {...register("title")} />
                            {errors.title ? <span className="text-red-500 text-sm">{errors.title.message}</span> : null}
                        </div>

                        {/* Categoria */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="category">Categoria</label>
                            <input className={inputStyle} type="text" id="category" {...register("category")} />
                            {errors.category ? <span className="text-red-500 text-sm">{errors.category.message}</span> : null}
                        </div>
                    </div>
 
                    {/* Descrição */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description">Descrição</label>
                        <textarea className={inputStyle} id="description" {...register("description")}></textarea>
                            {errors.description ? <span className="text-red-500 text-sm">{errors.description.message}</span> : null}

                    </div>

                    {/* URL da imagem */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="imageUrl">URL da imagem</label>
                        <input type="text" className={inputStyle} id="imageUrl" placeholder="/placeholder.svg" {...register("imageUrl")}></input>
                            {errors.imageUrl ? <span className="text-red-500 text-sm">{errors.imageUrl.message}</span> : null}
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                        {/* Tempo de preparo */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="prepTime">Tempo de preparo</label>
                            <input className={inputStyle} type="text" id="prepTime" placeholder="30 minutos" {...register("prepTime")} />
                            {errors.prepTime ? <span className="text-red-500 text-sm">{errors.prepTime.message}</span> : null}
                        </div>

                        {/* tempo de cozimento */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="cookTime">Tempo de cozimento</label>
                            <input className={inputStyle} type="text" id="cookTime" placeholder="15 minutos" {...register("cookTime")} />
                            {errors.cookTime ? <span className="text-red-500 text-sm">{errors.cookTime.message}</span> : null}
                        </div>

                        {/* Porções */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="servings">Porções</label>
                            <input className={inputStyle} type="text" id="servings" defaultValue={1} {...register("servings")} />
                            {errors.servings ? <span className="text-red-500 text-sm">{errors.servings.message}</span> : null}
                        </div>
                    </div>

                    {/* Ingredientes */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="ingredients">Ingredientes</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-full gap-2">
                                <input id="ingredients" type="text" className={inputStyle}/>
                                <button type="button" className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2">Remover</button>
                            </div>

                            <button type="button" className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 w-fit">Adicionar ingrediente</button>
                        </div>
                    </div>

                    {/* Instruções */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="instructions">Instruções</label>
                        <div>
                            <div className="flex w-full gap-2 items-center">
                                <textarea id="instructions" className={inputStyle}/>
                                <button type="button" className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 h-fit">Remover</button>
                            </div>

                            <button type="button" className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 w-fit">Adicionar instrução</button> 
                        </div>
                    </div>

                    <div className="flex gap-2 self-end">
                        <button type="button" onClick={onClose} className="bg-white border border-zinc-300 font-semibold rounded-md hover:bg-gray-200 transition-colors px-4 py-2">Cancelar</button>
                        <button type="submit" className="bg-black text-white rounded-md hover:bg-gray-900 font-semibold transition-colors px-4 py-2">Criar Receita</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
};
