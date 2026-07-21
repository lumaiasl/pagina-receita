"use client";

import RecipeCard from "@/components/RecipeCards";
import RecipeFormModal from "@/components/RecipeFormModal";
import { recipes as initialRecipes, Recipe } from "@/lib/data";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ReceitasPage() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  const handleCreateRecipe = (recipeData: Omit<Recipe, "id">) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: (recipes.length + 1).toString(),
    };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  return (
    <main className="grow py-8 bg-white text-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full">
          <h1 className="texst-3xl font-bold">Todas as receitas</h1>

          <button
            onClick={() => setIsRecipeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-black text-white border-white hover:bg-white hover:text-black hover:border-black transition-colors"
          >
            <Plus size={16} />
            Nova receita
          </button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      <RecipeFormModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onSave={handleCreateRecipe}
      />
    </main>
  );
}
