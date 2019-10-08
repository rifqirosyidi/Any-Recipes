import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Input, Button, Grid, Typography } from "@material-ui/core";
import Recipe from "./components/Recipe";
import ReactLogo from './images/react.ico';
import RecipeIcon from './images/newico.jpg'

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
      <div style={{ textAlign: "center" }}>
        <img style={{ padding: 10, borderRadius: "20px" }} width="120px" src={RecipeIcon} alt="imageLogo" />
      </div>
      <form onSubmit={updateQuery}>
        <Container style={{ textAlign: "center", margin: "20px auto" }}>
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
              <Grid item xs={12} sm={6} md={3} key={recipe.recipe.label}>
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
      <Container style={{ textAlign: "center" }} >
        <Typography style={{ padding: 20 }} variant="overline" display="block" gutterBottom>
          Made By Rief and <img style={{ borderRadius: "50%", height: "15px"}} src={ReactLogo} alt="react"></img><br></br>
          <small><a style={{ color: "grey", textDecoration: "none"}} href="http://www.freepik.com">Logo Designed By gstudioimagen / Freepik</a></small>
        </Typography>
      </Container>
    </div>
  );
};

export default App;
