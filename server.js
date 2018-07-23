const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log file');
        }
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     next();
// })

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('capitalizeIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to My Web page',
        pageTitle: 'Home Page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port:${PORT}`);
})