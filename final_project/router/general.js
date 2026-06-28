const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let {username , password} = req.body 
    if (isValid(username)){
        return res.status(409).json({message:"User Already exists"})
    }else if (!username || !password) {
        return res.status(400).json({message:"username or password missing"})
    }else{
        users.push(user)
        return res.status(200).json({message:"Successfully Regist,data :{book}ered"})
    }});


    // Get all books
    public_users.get("/", async (req, res) => {
        try {
            const response = await axios.get("http://localhost:5000/");
            return res.status(200).json(response.data);
        } catch (err) {
            return res.status(500).json({
                message: "Error retrieving books",
                error: err.message
            });
        }
    });
    
    // Get book details based on ISBN
    public_users.get("/isbn/:isbn", async (req, res) => {
        try {
            const { isbn } = req.params;
    
            const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    
            return res.status(200).json(response.data);
        } catch (err) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }
    });
    
    // Get books based on author
    public_users.get("/author/:author", async (req, res) => {
        try {
            const { author } = req.params;
    
            const response = await axios.get(`http://localhost:5000/author/${author}`);
    
            return res.status(200).json(response.data);
        } catch (err) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }
    });
    
    // Get books based on title
    public_users.get("/title/:title", async (req, res) => {
        try {
            const { title } = req.params;
    
            const response = await axios.get(`http://localhost:5000/title/${title}`);
    
            return res.status(200).json(response.data);
        } catch (err) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }
    });
    
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let book = books[isbn]
    let review = book.review
    if (isbn) {
        return res.status(200).json({message: "Book found",data:{review}});
    } else {
        return res.status(404).json({message:"Book not found!"})
    }
    });

module.exports.general = public_users;
