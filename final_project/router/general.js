const express = require('express');
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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let book = JSON.stringify(books)
    return res.status(200).json({message: "List of the books", data :{book}});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let book = books[isbn]
    if (isbn) {
        return res.status(200).json({message: "Book found",data:{book}});
    } else {
        return res.status(404).json({message:"Book not found!"})
    }
    
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author
    let book = books[author]
    if (isbn) {
        return res.status(200).json({message: "Book found",data:{book}});
    } else {
        return res.status(404).json({message:"Book not found!"})
    }
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let tittle = req.params.title
    let book = books[tittle]
    if (isbn) {
        return res.status(200).json({message: "Book found",data:{book}});
    } else {
        return res.status(404).json({message:"Book not found!"})
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
