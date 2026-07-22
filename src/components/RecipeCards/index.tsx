import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/lib/data";
import { Edit, Trash2 } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RecipeCard({
  recipe,
  onEdit,
  onDelete,
}: RecipeCardProps) {
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete();
  };
  return (
    <Link href={`/receitas/${recipe.id}`}>
      <div className="border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="relative h-64 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col p-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">
              {recipe.title}
            </h3>
            <p>{recipe.description}</p>
          </div>

          <div>
            <div className="flex justify-between items-center w-full">
              <span className="bg-gray-100 text-gray-500 rounded text-sm px-2 py-1 ">
                {recipe.category}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => handleEdit(e)}
                  className="p-2 border border-gray-200 rounded hover:bg-gray-200 transform-colors cursor-pointer"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e)}
                  className="p-2 border border-gray-200 rounded hover:bg-gray-200 transform-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
