const express = require('express');
const postsRoute = express.Router();
const Post = require('../models/PostModel')

// Gets all posts
postsRoute.get('/', async (req, res)=>{
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        err.json({ message: err });
        
    }
});

// Get specific post
postsRoute.get('/:postId', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        err.json({ message: err });
    }
})

// Submit/Insert the post
postsRoute.post('/', async(req, res)=>{
    console.log(req.body)
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        err.json({ message: err });
    }
});

// Remove specific post
postsRoute.delete('/:postId', async (req, res)=>{
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId});
        res.json(removedPost);
        console.log(`${removedPost} is deleted!`)
    } catch (err) {
        err.json({ message: err });
    }
})

// Update specific post
postsRoute.patch('/:postId', async (req, res)=>{
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId},
            { $set: { title: req.body.title}});
        res.json(updatedPost);
        console.log(`${updatedPost} is updated!`)
    } catch (err) {
        err.json({ message: err });
    }
})

module.exports = postsRoute;