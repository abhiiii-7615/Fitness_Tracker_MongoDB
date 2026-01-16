require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const app = express();
const db = require('./models');

app.use(cors({
    origin: 'http://localhost:3000', // only allowing my frontend to make backend calls
    methods: ['GET', 'POST'],        
    credentials: true                
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', authRoutes);


app.get("/", (req, res) => {
  res.send("Health & Fitness Tracker Backend");
});

const waterLogRoutes = require('./routes/waterLog.routes');
app.use('/api/water', waterLogRoutes);

const calorieLogRoutes = require('./routes/calorieLog.routes');
app.use('/api/calorie', calorieLogRoutes);

const sleepLogRoutes = require('./routes/sleepLog.routes');
app.use('/api/sleep', sleepLogRoutes);


const PORT = process.env.PORT || 5000;
db.sequelize.sync()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
.catch(err => console.log("DB connection error:", err));