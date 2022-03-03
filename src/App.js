import './App.css';
import foodsJSON from './foods.json';
import React, { useState } from 'react';
import FoodBox from './Components/Foodbox/Foodbox';
import AddFoodForm from './Components/AddFoodForm/AddFoodForm';
import Searchbar from './Components/Searchbar/Searchbar';
import { Row, Divider, Button } from 'antd';

function App() {
  const [foods, setFoods] = useState(foodsJSON);

  const [displayFoods, setDisplayFoods] = useState(foodsJSON);

  const [showForm, setForm] = useState(true)

  const addNewFood = (newFood) => {
    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
  };

  const searchFilter = (searchQuery) => {
    let filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    console.log(filteredFoods);
    setDisplayFoods(filteredFoods);
  };

  const deleteFood = (foodName) => {
    console.log('clicking');
    const deletedFoods = foods.filter((food) => {
      return food.name !== foodName;
    });
    setDisplayFoods(deletedFoods);
    setFoods(deletedFoods);
  };

  const toggleShow = () => {
    setForm(!showForm);
  };

  return (
    <div className="App">
      <AddFoodForm addFood={addNewFood} />
      <Searchbar search={searchFilter} />
      <Button onClick={toggleShow}>
        {showForm ? 'Hide' : 'Add New Food'}{' '}
      </Button>
      <h1>Food List</h1>
      {displayFoods.map((food, index) => {
        return (
          <FoodBox
            clickToDelete={deleteFood}
            key={index}
            food={{
              name: food.name,
              calories: food.calories,
              image: food.image,
              servings: food.servings,
            }}
          />
        );
      })}
    </div>
  );
}

export default App;
