const express = require('express');
const app = express();
const {sequelize, Recipe} = require('./models/Recipe');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', async(req, res) => {
    res.render('home',{title: 'Recipe Website'})
});

app.get('/new-recipe',(req,res)=>{
    res.render('newrecipe',{title:'New Recipe'});
})

app.post('/new-recipe',async (req,res)=>{
    const{name,ingredients,instructions} = res.body;
    try{
        const newRecipe = await Recipe.create({
            name,
            ingredients,
            instructions
        })
        res.redirect('/')
    }catch (error) {
        console.error('Error creating new recipe:', error);
        res.render('new_recipe', { title: 'New Recipe', error: 'Error creating new recipe' });
    }
})

app.get('/',async(req,res)=>{
    try{
        const recipes = await Recipe.findAll();
        res.render('home',{title:'Recipe Website',recipes});
    }catch(error){
        console.error('Error retrieving recipes: ',error);
        res.render('home',{title:'Recipe Website',error: 'Error retrieving recipes'})
    }
})



app.listen(PORT, () => {
    console.log('Server is listening at ' + PORT);
});
