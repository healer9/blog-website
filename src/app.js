const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const _ = require('lodash')
const path = require('path')

const PORT = 3000
const app = express()

const publicPath = path.join(__dirname, '../public')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(publicPath))

const homeContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
const Articles = []

app.get('/', (req, res) => {
    res.render('home', { articles: Articles, homeArticle: homeContent })
})

app.get('/articles/:testing', (req, res) => {
    console.log(req.params.testing)
    const foundArticle = Articles.find(article => _.lowerCase(article.title) === _.lowerCase(req.params.testing))

    if (foundArticle) {
        res.render('article', { foundArticle: foundArticle })
    }
})

app.get('/about', (req, res) => {
    res.render('about', { route: 'About', article: homeContent })
})

app.get('/compose', (req, res) => {
    res.render('compose')
})

app.post('/compose', (req, res) => {
    const newArticle = {
        title: req.body.title,
        content: req.body.content
    }
    Articles.push(newArticle)
    console.log(Articles)
    res.redirect('/')
})


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})