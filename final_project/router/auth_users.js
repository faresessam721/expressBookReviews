const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    let user = users[username]
    if (!user){
        return false
    }else {
        return true
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let user = users[username]
    if (user && user.password == password){
    return true
    }else {
        return false
    }
}

//only registered users can login
regd_users.post("/login",isValid,authenticatedUser,(req,res) => {
    let {username , password } = req.body
    if (isValid(username)&&authenticatedUser(username , password)){
        let accessToken = jwt.sign({
            data: password
        }, 'access' , {experesIn : '1h'});
        req.session.authorization = {
            accessToken , username
        }
        return res.status(200).json({message:"Loged in"})
    }else{
        return res.status(404).json({message: "User not authenticated"})    
    }
    });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;

    if (!books[isbn]) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({message: "Review added/updated successfully",reviews: books[isbn].reviews
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
