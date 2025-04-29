import { redirect } from 'next/navigation';

export default function RecipeRedirect() {
    redirect('/recipe/1');  // Automatically redirect "/recipe" to "/recipe/1"
}
