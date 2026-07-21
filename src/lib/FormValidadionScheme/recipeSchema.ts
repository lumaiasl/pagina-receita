import * as yup from 'yup'
import { recipes } from '../data'

export const recipeSchema = yup.object().shape({
    title: yup.string().required("O título é obrigatório"),
    category: yup.string().required("A categoria é obrigatória"),
    description: yup.string().required("A descrição é obrigatória"),
    imageUrl: yup.string().required("A URL da imagem é obrigatória"),
    prepTime: yup.string().required("O tempo de preparo é obrigatório"),
    cookTime: yup.string().required("O tempo de cozimento é obrigatório"),
    servings: yup
    .number()
    .typeError("As porções devem ser um número")
    .positive("O número deve ser positivo")
    .integer("O número deve ser um inteiro")
    .min(1, "Deve haver pelo menos 1 porção")
    .required("O número de porções é obrigatório")
})

export type RecipeFormData = yup.InferType<typeof recipeSchema>