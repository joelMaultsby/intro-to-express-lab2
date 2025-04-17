const express = require('express');
const app = express();


const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// routes
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello, ${username}! Welcome!`);
});




//question 2
app.get('/roll/:number', (req, res) => {
    const num = parseInt(req.params.number);
    if (!num || num < 1) return res.send('Invalid number');

    const roll = Math.floor(Math.random() * num) + 1;
    res.send(`You rolled a ${roll}`);
});





//question 3
app.get('/collectibles/:index', (req, res) => {
    const item = collectibles[req.params.index];

    if (!item) {
        return res.send('This item is not yet in stock. Check back soon!');
    }

    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});


app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});


//question 4
app.get('/shoes', (req, res) => {
    let filtered = shoes;

    if (req.query['min-price']) {
        filtered = filtered.filter(shoe => shoe.price >= +req.query['min-price']);
    }

    if (req.query['max-price']) {
        filtered = filtered.filter(shoe => shoe.price <= +req.query['max-price']);
    }

    if (req.query.type) {
        filtered = filtered.filter(shoe => shoe.type === req.query.type);
    }

    res.json(filtered);
});

//  server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});