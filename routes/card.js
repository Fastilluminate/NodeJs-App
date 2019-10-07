const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (req,res) => {
    const course = await Course.getById(req.body.id)   //! получаем данные курса 
    await Card.add(course) //! передаём курс в корзину
    res.redirect('/card') //! переводим пользователя на страницу "корзина"
})

router.delete('/remove/:id', async (req, res)=> {
    const card = await Card.remove(req.params.id)  
    res.status(200).json(card) 

})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина', 
        isCard: true,
        
        courses: card.courses,
        price: card.price 
    })
})


module.exports = router