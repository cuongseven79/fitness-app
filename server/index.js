const app = require('./middleware/middleware');
const initializeApp = require('./config/firebase-config');
const admin = initializeApp();
const PORT = process.env.PORT || 3001;
const profileRouter = require('./routes/profile');
 
app.use('/profile', profileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});