const express = require("express");
const app = express();
const { connectToDB } = require("./database/connect");
const loginRouter = require('./routes/login.route');
const cashRegisterRoute = require('./routes/cash.register.route');
const authRouter = require('./routes/requestAuth');
const drinksRouter = require('./routes/drinks.route');
const foodRouter = require('./routes/food.route');
const waitersRouter = require('./routes/waiters.route');
const productsRouter = require('./routes/products.route');
const billRouter = require('./routes/bill.route');
const reportRouter = require('./routes/report.route');
const backupsRouter = require('./routes/backups.route');
const cors = require('cors');
const cookie = require('cookie-parser');
const path = require('path')



connectToDB()
  .then(() => console.log("Konekcija uspjela"))
  .catch((err) => console.log("Konekcija nije uspjela", err));




app.use(cors({ credentials: true }));
app.use(cookie());
app.use(express.urlencoded({ extended: true, limit: '10mb'} ));

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.initialize());


app.use('/', loginRouter);
app.use('/auth',authRouter);
app.use('/cash-register', cashRegisterRoute);
app.use('/drinks', drinksRouter);
app.use('/food', foodRouter);
app.use('/waiters', waitersRouter);
app.use('/products', productsRouter);
app.use('/bill', billRouter);
app.use('/report', reportRouter);
app.use('/backups', backupsRouter);


app.listen(process.env.PORT, () =>
  console.log(`App listens on port ${process.env.PORT}`)
);
