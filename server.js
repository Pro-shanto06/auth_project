const app = require('./index');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
