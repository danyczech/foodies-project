import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM meals').all(); //run() when inserting/changing data, get() when getting single row
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
