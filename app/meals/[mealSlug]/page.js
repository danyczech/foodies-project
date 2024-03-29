import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMeal } from '@/lib/meals';
import styles from './page.module.css';

export async function generateMetadata({params}) {
    const meal = getMeal(params.mealSlug);

    if (!meal) { //if true, stops there and shows the closest error page
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary
    }
}

const MealDetailsPage = ({params}) => {  //params come with next
    const meal = getMeal(params.mealSlug); //mealSlug is the name of the folder in []

    if (!meal) { //if true, stops there and shows the closest error page
        notFound();
    }
    
    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return <>
    <header className={styles.header}>
        <div className={styles.image}>
            <Image src={meal.image} alt={meal.title} fill />
        </div> 
        <div className={styles.headerText}>
            <h1>{meal.title}</h1>
            <p className={styles.creator}>
                by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            </p>
            <p className={styles.summary}>
                {meal.summary}
            </p>
        </div>
    </header>
    <main>
        <p className={styles.instructions} dangerouslySetInnerHTML={{__html: meal.instructions}}></p>
    </main>
    </>
}

export default MealDetailsPage;
