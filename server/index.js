// !NOT remove this line. call initial configuration
const initialConf = require('./config/firebase-config');

const app = require('./middleware/middleware');
const PORT = process.env.PORT || 3001;
const profileRouter = require('./routes/profileRouter');
const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");

app.use('/', homeRouter);
app.use('/login', authRouter);
app.use('/signup', authRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});