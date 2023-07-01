const express = require('express');
const Fruit = require('../models/fruit');

const router = express.Router();

router.use((req, res, next) => {
    if(req.session.loggedIn){
        next();
    } else {
        res.redirect('/user/login')
    }
})

// ROUTES
router.get('/', async (req, res) => {
    const allFruits = await Fruit.find({ username: req.session.username })
    res.render(
        'fruits/index.ejs',
        { fruits: allFruits, user: req.session.username }
    )
});

router.get('/new', (req, res) => {
    res.render('fruits/new.ejs')
})

router.post('/', async (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else {
        req.body.readyToEat = false;
    }

    req.body.username = req.session.username; 
    
    await Fruit.create(req.body);
    res.redirect('/fruit');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fruit = await Fruit.findById(id);
    res.render("fruits/show.ejs", {fruit})
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Fruit.findByIdAndDelete(id)
    res.redirect("/fruit")
})

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const fruit = await Fruit.findById(id)
    res.render('fruits/edit.ejs', {fruit}) 
})

router.put('/:id', async (req,res) => {
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    await Fruit.findByIdAndUpdate(id, req.body)
    res.redirect('/fruit')
})
module.exports = router;