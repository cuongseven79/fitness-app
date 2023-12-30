const firebaseAdmin = require('./config/firebase-config');

const app = require('./middleware/middleware');
const PORT = process.env.PORT || 3001;
const profileRouter = require('./routes/profileRouter');
const authRouter = require("./routes/authRouter");

app.use('/profile', profileRouter);
app.use('/signup', authRouter);
app.use('/login', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});