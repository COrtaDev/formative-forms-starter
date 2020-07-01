const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser')

const app = express();
// const parseForm = bodyParser.urlencoded({ extended: false })
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(csrf({ cookie: true }))
const csrfProtection = csrf({ cookie: true });
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.render('index', { users });
});

app.get("/create", (req, res) => {
  res.render('create', { title: 'test' });
});

app.get("/create", csrfProtection, (req, res, next) => {
  res.render('create', { title: 'test', csrfToken: req.csrfToken() });
});

app.get("/create-interesting", (req, res) => {
  res.render('index', { users });
});

app.post("/create", (req, res, validationMiddleWare, next) => {
  // res.render('create', { title: 'test'});
  let { firstName, lastName, email, password } = req.body
  let error = req.error;

  if (error.length > 0) {
    res.render('create', { err: err })
    return;
  }

  users.push({ id: users.length + 1, firstName, lastName, email })
  res.redirect('/')

});

let validationMiddleWare = (req, res, next) => {
  let { firstName, } = req.body;
  let err = [];

  if (!firstName) {
    err.push('please put in a name')
  }
  req.error = err;
  next()
}


const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
