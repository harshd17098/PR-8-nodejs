const express = require('express');
const port = 2869;
const path = require('path');
const app = express();
const db = require("./config/dbConnection");
const session = require('express-session');
const passport = require("passport");
const localSt = require("./config/passportLocalStratergy");
const flash = require("connect-flash");
const flashConnect = require("./config/flashConnect");


app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(session({
    name: 'learning',
    secret: "hrd",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 60,
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setLocalUser)
app.use(flashConnect.setFalsh);
app.use(express.urlencoded())


app.use("/", require("./routes/booksRoutes/allBookRoutes"));

app.use("/Admin", require("./routes/authAdminRoutes"))


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});