const express = require('express');
const app = express();
const contacts = require('./contacts');
const expressHbs = require('express-handlebars');
const static = express.static;

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(static('public'));

//Home page - shows user a welcome message
app.get('/', (req, res) => {
    // res.send('Hello, njoy');
    res.render('home', {
        layout: "homepage",
        message: 'Welcome to the Contacts app!',
        headerText: 'Hello Handlebars!'
    });
})

//Contacts list page: shows user all contacts
app.get('/contacts', (req,res) => {
    // res.send(contacts.users);
    res.render('contacts-list', {
        contactsArray: contacts.users
    })
})

//Contacts detail page: show the user all info for one contact
app.get('/contacts/:id', (req, res) => {
    // res.send(`You are viewing details for ${req.params.id}.`)
    let theID = req.params.id;
    // let theFirstName = req.params.id;
    let contact = contacts.users.find((user) => {
        return user.id === theID;
    }
);
//Check if 'contact is valid
//is it undefined or a real object?
    if (contact) {
        res.render('id', {
            contact
        });
    } else {
        //redirect
        res.redirect('.')
        // res.send(`<h3>Contact ID ${theID} does not exist!</h3>`);
    }
     

    // res.send(contact);
})


app.listen(8888, () => {
    console.log('Your express app is running at http://localhost:8888');
})