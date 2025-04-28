import { OpenAI } from 'openai';

class AiAssistantService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.model = 'gpt-4o-mini';
    }

    async generateRecipeDetails({ title, category, ingredients }) {
        if (!title || !category || !ingredients) {
            return {};
        }

        const prompt = `
            Ти асистент у мобільному застосунку з рецептами.
            На основі наданої інформації про рецепт згенеруй:
            - короткий і зрозумілий опис рецепта (2-3 речення),
            - покрокові інструкції з приготування страви,
            - приблизний час приготування у хвилинах (ціле число),
            - базову поживну цінність страви: калорії, білки, жири, вуглеводи (у грамах).

            Відповідь повинна бути у форматі JSON наступного вигляду:
            {
            "instructions": "Текст покрокових інструкцій",
            "description": "Короткий опис рецепта",
            "cookTime": Число у хвилинах,
            "nutritionalValue": {
                "calories": "Калорії у грамах",
                "proteins": "Білки у грамах",
                "fats": "Жири у грамах",
                "carbohydrates": "Вуглеводи у грамах"
            }
            }

            Вхідні дані:
            - Назва рецепта: ${title}
            - Категорія рецепта: ${category}
            - Список інгредієнтів (кожен інгредієнт: назва, кількість, одиниця вимірювання): ${ingredients}

            Пиши українською мовою. У тексті використовуй символи переносу рядків.
        `;

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: "system", content: "Ти професійний кулінарний асистент. Відповідай тільки українською мовою та надавай виключно JSON без додаткового форматування." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.4,
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content.trim();
            console.log("Raw API response:", content);

            let jsonStr = content;

            if (content.includes("```json")) {
                jsonStr = content.replace(/```json\s*|\s*```/g, "");
            } else if (content.includes("```")) {
                jsonStr = content.replace(/```\s*|\s*```/g, "");
            }

            jsonStr = jsonStr.replace(/`/g, "");

            return JSON.parse(jsonStr);
        } catch (e) {
            console.error('Помилка при отриманні відповіді:', e);
            return {};
        }
    }

    async generateRecipeRecommendation({ title, category, ingredients, instructions, description }) {
        if (!title || !category || !ingredients || !instructions || !description) {
            return '';
        }

        const prompt = `
            Ти кулінарний експерт у мобільному застосунку з рецептами.
            На основі наданої інформації про рецепт напиши короткий текст "Рекомендація" (до 100 слів), у якому:
            - підкресли сильні сторони рецепта (наприклад, корисність, простота приготування, оригінальність),
            - вкажи можливі недоліки чи складнощі (наприклад, рідкісні інгредієнти, тривалий час приготування),
            - надай корисні поради для досягнення кращого результату (наприклад, заміни інгредієнтів, варіанти подачі).

            Формат відповіді: звичайний відформатований текст без зайвого.

            Вхідні дані:
            - Назва рецепта: ${title}
            - Категорія рецепта: ${category}
            - Список інгредієнтів: ${ingredients}
            - Інструкції: ${instructions}
            - Опис: ${description}

            Пиши українською мовою.
        `;

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: "system", content: "Ти кулінарний експерт. Відповідай тільки українською мовою." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
            });
            console.log("Raw API response:", response.choices[0].message.content.trim());
            return response.choices[0].message.content.trim();
        } catch (e) {
            console.error('Помилка при отриманні відповіді:', e);
            return '';
        }
    }
}

export const aiAssistantService = new AiAssistantService();