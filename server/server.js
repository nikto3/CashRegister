const express = require("express");
const app = express();
const { connectToDB } = require("./database/connect");
const loginRouter = require('./routes/login.route');
const cashRegisterRoute = require('./routes/cash.register.route');
const authRouter = require('./routes/requestAuth');
const passport = require('passport');
const cors = require('cors');
const cookie = require('cookie-parser');
require('./passport/passport');

connectToDB()
  .then(() => console.log("Konekcija uspjela"))
  .catch((err) => console.log("Konekcija nije uspjela", err));




app.use(cors({ credentials: true }));
app.use(cookie());
app.use(express.urlencoded({extended: true} ));
app.use(express.json());

app.use(passport.initialize());


app.use('/', loginRouter);
app.use('/auth',authRouter);
app.use('/cash-register', cashRegisterRoute);


app.listen(process.env.PORT, () =>
  console.log(`App listens on port ${process.env.PORT}`)
);
