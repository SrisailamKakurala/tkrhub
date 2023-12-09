const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000;
const postModel = require('./models/post');
const bodyParser = require('body-parser');
const app = express();
let postIds = [];

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('index')
})

const moment = require('moment');
app.post('/post', async (req, res) => {
    const postData = await new postModel({
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date().toLocaleString(),
    })

    let savedPost = await postData.save()
    console.log('data added successfully')

    // Check if the request is asynchronous (AJAX)
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // Send a JSON response for AJAX requests
        res.json({ message: 'Post added successfully', postId: savedPost._id });
    } else {
        // Redirect the user back to the same page for non-AJAX requests
        res.redirect('/');
    }
})



app.get('/api/posts', async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})
