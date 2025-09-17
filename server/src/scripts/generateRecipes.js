import "dotenv/config";
import mongoose from 'mongoose';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Ingredient from '../models/Ingredient.js';

export const generateRecipes = async () => {
  try {
    // Получаем существующие категории и ингредиенты
    const categories = await Category.find({});
    const ingredients = await Ingredient.find({});
    const users = await User.find({});

    if (!categories.length || !ingredients.length || !users.length) {
      console.error('Необхідно спочатку створити категорії, інгредієнти та користувачів');
      return;
    }

    const recipes = [
      {
        title: 'Класичний борщ',
        description: 'Традиційний український борщ з пампушками та салом',
        instructions: '1. Зварити бульйон з м\'яса\n2. Натерти буряк на тертці\n3. Нашаткувати моркву та цибулю\n4. Додати буряк та овочі до бульйону\n5. Варити до готовності\n6. Подавати зі сметаною та пампушками',
        category: categories[0]._id,
        isPublic: true,
        cookTime: 120,
        difficulty: 'Середній',
        image: 'borsch.jpg',
        ingredients: [
          {
            ingredient: ingredients[0]._id,
            amount: '500',
            unit: 'г'
          },
          {
            ingredient: ingredients[1]._id,
            amount: '2',
            unit: 'шт'
          }
        ],
        authorId: users[0]._id
      },
      {
        title: 'Вареники з картоплею',
        description: 'Традиційні українські вареники з картопляною начинкою',
        instructions: '1. Приготувати тісто\n2. Зробити картопляне пюре\n3. Сліпити вареники\n4. Варити в підсоленій воді\n5. Подавати зі сметаною та цибулею',
        category: categories[0]._id,
        isPublic: true,
        cookTime: 60,
        difficulty: 'Середній',
        image: 'varenyky.jpg',
        ingredients: [
          {
            ingredient: ingredients[2]._id,
            amount: '300',
            unit: 'г'
          },
          {
            ingredient: ingredients[3]._id,
            amount: '200',
            unit: 'г'
          }
        ],
        authorId: users[1]._id
      },
      {
        title: 'Голубці',
        description: 'Традиційна українська страва з капустяних листків та м\'ясного фаршу',
        instructions: '1. Відварити капустяні листки\n2. Приготувати фарш з рису та м\'яса\n3. Загорнути фарш у листки\n4. Запекти в духовці\n5. Подавати зі сметаною',
        category: categories[0]._id,
        isPublic: true,
        cookTime: 90,
        difficulty: 'Складний',
        image: 'holubtsi.jpg',
        ingredients: [
          {
            ingredient: ingredients[4]._id,
            amount: '1',
            unit: 'кг'
          },
          {
            ingredient: ingredients[5]._id,
            amount: '300',
            unit: 'г'
          }
        ],
        authorId: users[0]._id
      },
      {
        title: 'Сирники',
        description: 'Смачні сирники з домашнього сиру',
        instructions: '1. Перетерти сир\n2. Додати яйця та цукор\n3. Сформувати сирники\n4. Обсмажити на сковороді\n5. Подавати зі сметаною та варенням',
        category: categories[1]._id,
        isPublic: true,
        cookTime: 30,
        difficulty: 'Легкий',
        image: 'syrnyky.jpg',
        ingredients: [
          {
            ingredient: ingredients[6]._id,
            amount: '500',
            unit: 'г'
          },
          {
            ingredient: ingredients[7]._id,
            amount: '2',
            unit: 'шт'
          }
        ],
        authorId: users[1]._id
      },
      {
        title: 'Куліш',
        description: 'Традиційна українська каша з пшоном та м\'ясом',
        instructions: '1. Відварити м\'ясо\n2. Зварити пшоно\n3. Обсмажити цибулю з салом\n4. Змішати всі інгредієнти\n5. Довести до готовності',
        category: categories[0]._id,
        isPublic: true,
        cookTime: 60,
        difficulty: 'Середній',
        image: 'kulish.jpg',
        ingredients: [
          {
            ingredient: ingredients[8]._id,
            amount: '200',
            unit: 'г'
          },
          {
            ingredient: ingredients[9]._id,
            amount: '300',
            unit: 'г'
          }
        ],
        authorId: users[0]._id
      },
      {
        title: 'Медовик',
        description: 'Традиційний український торт з медових коржів',
        instructions: '1. Приготувати тісто з медом\n2. Випекти коржі\n3. Зробити крем\n4. Змастити коржі кремом\n5. Дати настоятися',
        category: categories[2]._id,
        isPublic: true,
        cookTime: 120,
        difficulty: 'Складний',
        image: 'medovyk.jpg',
        ingredients: [
          {
            ingredient: ingredients[10]._id,
            amount: '200',
            unit: 'г'
          },
          {
            ingredient: ingredients[11]._id,
            amount: '400',
            unit: 'г'
          }
        ],
        authorId: users[1]._id
      },
      {
        title: 'Деруни',
        description: 'Картопляні оладки за українським рецептом',
        instructions: '1. Натерти картоплю\n2. Додати яйця та борошно\n3. Посолити та поперчити\n4. Обсмажити на сковороді\n5. Подавати зі сметаною',
        category: categories[1]._id,
        isPublic: true,
        cookTime: 30,
        difficulty: 'Легкий',
        image: 'deruny.jpg',
        ingredients: [
          {
            ingredient: ingredients[12]._id,
            amount: '1',
            unit: 'кг'
          },
          {
            ingredient: ingredients[13]._id,
            amount: '2',
            unit: 'шт'
          }
        ],
        authorId: users[0]._id
      },
      {
        title: 'Квасоля з грибами',
        description: 'Традиційна українська страва з квасолі та грибів',
        instructions: '1. Замочити квасолю\n2. Відварити квасолю\n3. Обсмажити гриби з цибулею\n4. Змішати всі інгредієнти\n5. Довести до готовності',
        category: categories[0]._id,
        isPublic: true,
        cookTime: 90,
        difficulty: 'Середній',
        image: 'fasolya.jpg',
        ingredients: [
          {
            ingredient: ingredients[14]._id,
            amount: '300',
            unit: 'г'
          },
          {
            ingredient: ingredients[15]._id,
            amount: '200',
            unit: 'г'
          }
        ],
        authorId: users[1]._id
      }
    ];

    // Очищаем существующие рецепты
    await Recipe.deleteMany({});

    // Создаем новые рецепты
    const createdRecipes = await Recipe.insertMany(recipes);
    console.log(`Створено ${createdRecipes.length} рецептів`);

  } catch (error) {
    console.error('Помилка при генерації рецептів:', error);
  }
};
