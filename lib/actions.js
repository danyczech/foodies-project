'use server';

import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) { //+ action property in form element

  const meal = {
    title: formData.get('title'), //connected via name property in input element
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
    ) {
      // throw new Error('Invalid input');
      return {
        message: 'Invalid input'
      };
  } 

  await saveMeal(meal);
  revalidatePath('/meals'); 
  /* default is 'page' & revalidates only given path, no nested paths
  revalidatePath('/meals', 'layout'); revalidates all nested pages in /meals
  revalidatePath('/', 'layout'); revalidates the whole project
  */
  redirect('/meals');

}