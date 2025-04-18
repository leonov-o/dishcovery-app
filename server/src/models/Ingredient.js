import mongoose from "mongoose";

const measurementUnits = ['г', 'кг', 'мл', 'л', 'шт', 'ст.л', 'ч.л', 'за смаком'];

const Ingredient = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  defaultUnit: {
    type: String,
    enum: measurementUnits,
    default: 'г'
  },
  possibleUnits: [{
    type: String,
    enum: measurementUnits
  }]
});

export default mongoose.model("Ingredient", Ingredient);

//TODO изменить все в контроллере рецептов, сделать поиск по ингредиенту, реализовать пагинацию
