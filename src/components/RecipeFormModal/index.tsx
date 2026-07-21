import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import {
  RecipeFormData,
  recipeSchema,
} from "@/lib/FormValidadionScheme/recipeSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { Recipe } from "@/lib/data";
import { Bold } from "lucide-react";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, "id"> | Recipe) => void;
  mode: "create" | "edit";
  recipe?: Recipe;
}

const DEFAULT_VALUES: RecipeFormData = {
  title: "",
  category: "",
  description: "",
  image: "",
  prepTime: "",
  cookTime: "",
  servings: 1,
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
};

export default function RecipeFormModal({
  isOpen,
  onClose,
  onSave,
  mode,
  recipe,
}: RecipeFormModalProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecipeFormData>({
    resolver: yupResolver(recipeSchema),
    mode: "onSubmit",
    defaultValues: DEFAULT_VALUES,
  });

  const {
    fields: ingredientsFields,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionsFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && recipe) {
        reset({
          ...recipe,
          ingredients: recipe.ingredients.map((ing) => ({ value: ing })),
          instructions: recipe.instructions.map((ing) => ({ value: ing })),
        });
      } else {
        reset(DEFAULT_VALUES);
      }
    }
  }, [mode, isOpen, recipe, reset]);

  const onSubmit = (data: RecipeFormData) => {
    const recipeData = {
      ...data,
      ingredients: data.ingredients.map((ingredient) => ingredient.value),
      instructions: data.instructions.map((instruction) => instruction.value),
    };

    console.log(recipeData);
    onSave(
      mode === "edit" && recipe ? { ...recipeData, id: recipe.id } : recipeData,
    );
    reset();
    onClose();
  };

  const inputStyle = "p-2 border border-zinc-200 rounded-md";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-w-2xl max-h-[90dvh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            {mode === "create" ? "Nova receita" : "Editar receita"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-2">
            {/* Título */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Título</label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title ? (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              ) : null}
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Categoria</label>
              <input
                className={inputStyle}
                type="text"
                id="category"
                {...register("category")}
              />
              {errors.category ? (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              ) : null}
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea
              className={inputStyle}
              id="description"
              {...register("description")}
            ></textarea>
            {errors.description ? (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            ) : null}
          </div>

          {/* URL da imagem */}
          <div className="flex flex-col gap-1">
            <label htmlFor="imageUrl">URL da imagem</label>
            <input
              type="text"
              className={inputStyle}
              id="imageUrl"
              placeholder="/placeholder.svg"
              {...register("image")}
            ></input>
            {errors.image ? (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-1">
            {/* Tempo de preparo */}
            <div className="flex flex-col gap-1">
              <label htmlFor="prepTime">Tempo de preparo</label>
              <input
                className={inputStyle}
                type="text"
                id="prepTime"
                placeholder="30 minutos"
                {...register("prepTime")}
              />
              {errors.prepTime ? (
                <span className="text-red-500 text-sm">
                  {errors.prepTime.message}
                </span>
              ) : null}
            </div>

            {/* tempo de cozimento */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTime">Tempo de cozimento</label>
              <input
                className={inputStyle}
                type="text"
                id="cookTime"
                placeholder="15 minutos"
                {...register("cookTime")}
              />
              {errors.cookTime ? (
                <span className="text-red-500 text-sm">
                  {errors.cookTime.message}
                </span>
              ) : null}
            </div>

            {/* Porções */}
            <div className="flex flex-col gap-1">
              <label htmlFor="servings">Porções</label>
              <input
                className={inputStyle}
                type="text"
                id="servings"
                defaultValue={1}
                {...register("servings")}
              />
              {errors.servings ? (
                <span className="text-red-500 text-sm">
                  {errors.servings.message}
                </span>
              ) : null}
            </div>
          </div>

          {/* Ingredientes */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredients">Ingredientes</label>
            <div className="flex flex-col gap-1">
              {ingredientsFields.map((field, index) => (
                <div key={field.id} className="flex w-full gap-2">
                  <div className="flex flex-col gap-1 grow">
                    <input
                      id="ingredients"
                      type="text"
                      className={inputStyle}
                      {...register(`ingredients.${index}.value`)}
                      placeholder="Digite um ingrediente"
                    />
                    {errors.ingredients?.[index]?.value && (
                      <span className="text-sm text-red-500">
                        {errors.ingredients?.[index].value.message}
                      </span>
                    )}
                  </div>
                  {ingredientsFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2"
                      onClick={() => removeIngredients(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 w-fit"
                onClick={() => appendIngredients({ value: "" })}
              >
                Adicionar ingrediente
              </button>
            </div>
          </div>

          {/* Instruções */}
          <div className="flex flex-col gap-1">
            <label htmlFor="instructions">Instruções</label>
            <div className="flex flex-col gap-1">
              {instructionsFields.map((field, index) => (
                <div key={field.id} className="flex w-full gap-2">
                  <div className="flex flex-col gap-1 grow">
                    <textarea
                      id="instructions"
                      className={inputStyle}
                      {...register(`instructions.${index}.value`)}
                      placeholder="Digite uma instrução"
                    />
                    {errors.instructions?.[index]?.value && (
                      <span className="text-sm text-red-500">
                        {errors.instructions?.[index].value.message}
                      </span>
                    )}
                  </div>
                  {instructionsFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 h-fit"
                      onClick={() => removeInstructions(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-zinc-300 rounded-md font-semibold hover:bg-gray-200 transition-colors px-4 py-2 w-fit"
                onClick={() => appendInstructions({ value: "" })}
              >
                Adicionar instrução
              </button>
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="bg-white border border-zinc-300 font-semibold rounded-md hover:bg-gray-200 transition-colors px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black text-white rounded-md hover:bg-gray-900 font-semibold transition-colors px-4 py-2"
            >
              {mode === "create" ? "Criar receita" : "Editar receita"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
