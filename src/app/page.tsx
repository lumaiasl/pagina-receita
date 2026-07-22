"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Recipe, recipes as initialRecipes } from "@/lib/data";
import RecipeCard from "@/components/RecipeCards";
import RecipeFormModal from "@/components/RecipeFormModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

export default function Home() {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined,
  );
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const handleOpenCreateModal = () => {
    setSelectedRecipe(undefined);
    setModalMode("create");
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalMode("edit");
    setIsRecipeModalOpen(true);
  };

  const handleCloseModal = () => setIsRecipeModalOpen(false);

  const handleSaveRecipe = (recipeData: Recipe | Omit<Recipe, "id">) => {
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

  const handleDeleteRecipe = () => {
    if (selectedRecipe) {
      setRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== selectedRecipe.id),
      );

      setIsDeleteConfirmationModalOpen(false);
      setSelectedRecipe(undefined);
    }
  };
  const featureRecipes = recipes.slice(0, 3);

  return (
    <main className="grow">
      {/* Título */}
      <section className="flex flex-col bg-orange-50 gap-6 py-8 items-center">
        <div className="flex flex-col items-center gap-4 container mx-auto text-black">
          <h1 className="text-5xl text-center">Receitas Deliciosas</h1>
          <p className="text-xl text-center px-2">
            Descubra receitas simples e saborosas para todas as ocasiões
          </p>
          <Link
            href="/receitas"
            className="bg-orange-500 text-white font-bold rounded-xl px-2 py-2 hover:bg-orange-800 transition-colors"
          >
            Ver todas as receitas
          </Link>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 text-black bg-white">
        <div className="container mx-auto flex flex-col items-center gap-6">
          <h2 className="text-lg font-bold">Receitas em Destaque</h2>
          <div>
            <div className="flex flex-col gap-2 px-6 w-full lg:flex-row lg:gap-8">
              {featureRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={() => handleOpenEditModal(recipe)}
                  onDelete={() => {
                    setSelectedRecipe(recipe);
                    setIsDeleteConfirmationModalOpen(true);
                  }}
                />
              ))}
            </div>
            <Link
              className="flex justify-center md:justify-start px-6 text-orange-400 hover:text-orange-700 transition-colors mt-6"
              href="/receitas"
            >
              Ver todas as receitas
              <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

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
