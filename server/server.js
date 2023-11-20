const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbconfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;


const User = require('./routes/usersRoute');
const Issue = require('./routes/booksRoute');
const Book = require('./routes/issuesRoute');
const Report = require('./routes/reportsRoute')

app.use('/api/users', User);
app.use('/api/books', Issue);
app.use('/api/issues', Book);
app.use('/api/reports', Report);

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(path.join(__dirname, "/client/build")));

    // index.html for all page routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}



app.listen(port, () => console.log('Server is running on port ' + port))