const pool = require('./pool.js');

const SQL = `
CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    year INT NOT NULL,
    developer TEXT NOT NULL
);

INSERT INTO games (title, year)
VALUES ('Rocket League', 2015), ('GTA', 2007), ('Madden', 2005);

CREATE TABLE IF NOT EXISTS genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name TEXT NOT NULL
);

INSERT INTO genres (genre_name)
VALUES ('Adventure'), ('Sports'), ('Driving');

CREATE TABLE IF NOT EXISTS game_genres (
  game_id INT REFERENCES games(game_id),
  genre_id INT REFERENCES genres(genre_id),
  PRIMARY KEY (game_id, genre_id)
);

INSERT INTO game_genres (game_id, genre_id)
VALUES (1, 2), (1, 3), (2, 1), (2, 3);
`

async function main() {
    try {
        await pool.query(SQL);
        console.log('Tables created and seeded');
    } catch(err) {
        console.log(err);
    }
}

main();
