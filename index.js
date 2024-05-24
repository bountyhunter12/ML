// Server code
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8801;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hello_there12',
  database: 'curd'
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

app.get('/api/get', (req, res) => {
    const q1 = "SELECT * FROM `movie_reviews`;";
    db.query(q1, (err, result) => {
        if (err) {
            console.error('Error retrieving data from database: ' + err.stack);
            res.status(500).json({ error: "An error occurred while retrieving data" });
            return;
        }
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movie_review;

    const q = "INSERT INTO `movie_reviews` (movieName, movie_review) VALUES (?, ?);";
    db.query(q, [movieName, movieReview], (err, result) => {
        if (err) {
            console.error('Error inserting data into database: ' + err.stack);
            res.status(500).json({ error: "An error occurred while inserting data" });
            return;
        }
        console.log('Data inserted successfully: ' + JSON.stringify(result));
        res.status(200).json({ message: "Data inserted successfully" });
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const q2 = "DELETE FROM `movie_reviews` WHERE movieName = ?;";
    db.query(q2, name ,(err, result) => {
        if (err) {
            console.error('Error deleting data from database: ' + err.stack);
            res.status(500).json({ error: "An error occurred while deleting data" });
            return;
        }
        console.log('Data deleted successfully: ' + JSON.stringify(result));
        res.status(200).json({ message: "Data deleted successfully" });
    });
});

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movie_review;
    const q3 = "UPDATE `movie_reviews` SET movie_review = ? WHERE movieName = ?;";
    db.query(q3, [review, name] ,(err, result) => {
        if (err) {
            console.error('Error updating data in database: ' + err.stack);
            res.status(500).json({ error: "An error occurred while updating data" });
            return;
        }
        console.log('Data updated successfully: ' + JSON.stringify(result));
        res.status(200).json({ message: "Data updated successfully" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
