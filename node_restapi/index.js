const express = require('express')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
  {
    id: '1',
    title: 'Inception',
    director: 'Christopher Nolan',
    release_date: '2010-07-10'
  },
  {
    id: '2',
    title: 'Boly',
    director: 'Mycroft Nolan',
    release_date: '2013-05-10'
  },
  {
    id: '3',
    title: 'Injustice',
    director: 'Jane Joe',
    release_date: '2011-12-10'
  }
]

app.get('/movies', (req, res) => {
  res.json(movies)
});

app.post('/movies', (req, res) => {
  const movie = req.body;
  console.log(movie)
  movies.push(movie);
  res.send('Movie is added to the list');
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;
  for (let movie of movies) {
    if (movie.id === id) {
      res.json(movie);
      return
    }
  }
  res.status(404).send('Movie not found!')
})

app.delete('/movies/:id', (req, res) => {
  const id = req.params.id;
  const found = movies.some((movie) => movie.id === id);
  if (found) {
    const newMovies = movies.filter((movie, index) => {
      if (movie.id !== id) {
        console.log(movie);
        return movie;
      }
    })
    console.log(newMovies);
    res.json({
      'message': 'Movie deleted',
      'movies': newMovies
    })
  } else {
    res.sendStatus(400);
  }
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
})
