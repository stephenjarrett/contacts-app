const express = require('express');
const app = express();
const contacts = require('./contacts');
const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Home page - shows user a welcome message
app.get('/', (req, res) => {
    // res.send('Hello, njoy');
    res.render('home', {
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
    // let theID = req.params.id;
    let theFirstName = req.params.id;
    //Check if 'contact is valid
    //is it undefined or a real object?
    let contact = contacts.users.find((user) => {
        return user.firstName === theFirstName;
    }
);
    res.render('id', {
        // contactArray: contact.elements
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email
    });

    // res.send(contact);
})


app.listen(8888, () => {
    console.log('Your express app is running at http://localhost:8888');
})