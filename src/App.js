import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Input, Button, Grid } from "@material-ui/core";
import Recipe from "./components/Recipe";

const App = () => {
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const sampleRequest = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(sampleRequest);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const updateQuery = e => {
    e.preventDefault()
    setQuery(search)
  }

  return (
    <div>
      <form onSubmit={updateQuery}>
        <Container style={{ textAlign: "center", margin: "20px 0px" }}>
          <Input
            style={{ padding: 4 }}
            placeholder="Search Recipes"
            id="search"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <Button
            type="submit"
            name="search"
            color="secondary"
            variant="outlined"
          >
            Search
          </Button>
        </Container>
      </form>

      <Container>
          <Grid 
            container
            direction="row"
            alignItems="center"
            spacing={3}
            >
            {recipes.map(recipe => (
              <Grid item xs={3} key={recipe.recipe.label}>
                  <Recipe key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    sourceRecipe={recipe.recipe.source}
                    ingredients={recipe.recipe.ingredients}
                    shareAs={recipe.recipe.shareAs}
                  />
              </Grid>
            ))}
          </Grid>
      </Container>
    </div>
  );
};

export default App;
