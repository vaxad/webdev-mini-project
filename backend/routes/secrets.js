const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Secret = require('../models/Secret');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');

//ROUTE 1: fetch all secrets using: GET '/secrets/'
router.get('/', fetchuser, async (req, res) => {
    try {
        const secrets = await Secret.find()
        const anonymousSecrets = secrets.map(doc => {
            const { user, ...rest } = doc.toObject(); 
            return rest;
          });
        return res.status(200).json(anonymousSecrets);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

//ROUTE 2: add new secret using: POST '/secrets/'
router.post('/', fetchuser, [
    body('title', 'Enter a valid Title').exists(),
    body('content', 'Enter valid Content').exists()
], async (req, res) => {
    try {

        const { title, content } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const savedSecret = await Secret.create({
            title, content,
            user: req.user.id,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        return res.status(200).json(savedSecret);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 3: update a secret using: PUT '/secrets/:id'
router.put('/:id', fetchuser, async (req, res) => {
    try {
        const { title, content } = req.body;
        //store what user wants to update
        const newSecret = {};
        if (title) { newSecret.title = title }
        if (content) { newSecret.content = content };
        newSecret.updatedAt = Date.now();

        //VERIFY USER
        let secret = await Secret.findById(req.params.id);
        if (!secret) { return res.status(404).send("Not found") }
        if (secret.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //update secret
        secret = await Secret.findByIdAndUpdate(req.params.id, { $set: newSecret }, { new: true })
        return res.status(200).json(secret);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 4: delete a secret using: DELETE '/secrets/:id'
router.delete('/:id', fetchuser, async (req, res) => {
    try {

        //VERIFY USER
        let secret = await Secret.findById(req.params.id);
        if (!secret) { return res.status(404).send("Not found") }
        if (secret.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //delete secret
        secret = await Secret.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "This secret was deleted", secret });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 5: fetch secret by id using: GET '/secrets/fetch/:id'
router.get('/fetch/:id', fetchuser, async (req, res) => {
    try {
        const secret = await Secret.findById(req.params.id)
        if (!secret) { return res.status(404).send("Not found") }
        return res.status(200).json(secret);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

//ROUTE 6: fetch secrets by id using: GET '/secrets/fetchmy'
router.get('/fetchmy', fetchuser, async (req, res) => {
    try {
        const secret = await Secret.find({ user: req.user.id })
        if (!secret) { return res.status(404).send("Not found") }
        return res.status(200).json(secret);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

//ROUTE 7: like/unlike a secret using: PUT '/secrets/like/:id'
router.patch('/like/:id', fetchuser, async (req, res) => {
    try {

        //VERIFY USER
        let secret = await Secret.findById(req.params.id);
        if (!secret) { return res.status(404).send("Not found") }
        let newlikes = secret.likes;
        if(newlikes.includes(req.user.id)){
            // console.log("includes", newlikes[1], req.user.id)
            newlikes=newlikes.filter((like)=>like.toString()!==req.user.id)
        }else{
            // console.log(" not includes")
            newlikes.push(req.user.id)
        }
        //update secret
        secret = await Secret.findByIdAndUpdate(req.params.id, { likes: newlikes })
        return res.status(200).json(secret);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
})

//ROUTE 8: comment on secret using: POST '/secrets/comment/:id'
router.post('/comment/:id', fetchuser, async (req, res) => {
    try {
        const {content} = req.body
        //VERIFY USER
        let secret = await Secret.findById(req.params.id);
        if (!secret) { return res.status(404).send("Not found") }
        const comment = await Comment.create({
            content:content,
            user:req.user.id,
            about:req.params.id,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        //send comment
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
})

//ROUTE 9: fetch comments on a secret using: GET '/secrets/comment/:id'
router.get('/comment/:id', fetchuser, async (req, res) => {
    try {
        const {content} = req.body
        //VERIFY USER
        let secret = await Secret.findById(req.params.id);
        if (!secret) { return res.status(404).send("Not found") }
        const comments = await Comment.find({about:req.params.id})
        //send comment
        return res.status(200).json(comments);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
    }
})
module.exports = router;