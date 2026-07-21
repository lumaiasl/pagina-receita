"use client";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import RecipeCard from "@/components/RecipeCards";
import RecipeFormModal from "@/components/RecipeFormModal";
import { recipes as initialRecipes, Recipe } from "@/lib/data";
import { Plus } from "lucide-react";
import { RequestCurrentErrorStateMessage } from "next/dist/server/dev/hot-reloader-types";
import { useState } from "react";

export default function ReceitasPage() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined,
  );

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedRecipe(undefined);
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditModal = (recipe: Recipe) => {
    setModalMode("edit");
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsRecipeModalOpen(false);
  };

  const handleSaveRecipe = (recipeData: Omit<Recipe, "id"> | Recipe) => {
    if (modalMode === "create") {
      const newRecipe: Recipe = {
        ...recipeData,
        id: (recipes.length + 1).toString(),
      };
      setRecipes((prev) => [...prev, newRecipe]);
    } else {
      // modo "edit"
      const updatedRecipe = recipeData as Recipe;
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
        ),
      );
    }
    handleCloseModal();
  };

  const handleOpenDeleteConfirmationModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleDeleteRecipe = () => {
    if (selectedRecipe) {
      setRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== selectedRecipe.id),
      );

      setIsDeleteConfirmationModalOpen(false);
      setSelectedRecipe(undefined);
    }
  };

  return (
    <main className="grow py-8 bg-white text-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center w-full">
          <h1 className="texst-3xl font-bold">Todas as receitas</h1>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-black text-white border-white hover:bg-white hover:text-black hover:border-black cursor-pointer transition-colors"
          >
            <Plus size={16} />
            Nova receita
          </button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => handleOpenEditModal(recipe)}
              onDelete={() => handleOpenDeleteConfirmationModal(recipe)}
            />
          ))}
        </div>
      </div>

      <RecipeFormModal
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        mode={modalMode}
        recipe={selectedRecipe}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        onConfirm={handleDeleteRecipe}
        recipe={selectedRecipe}
      />
    </main>
  );
}
