CREATE EXTENSION pg_trgm;
CREATE EXTENSION pgroonga;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO users(name)
VALUES ('root');

CREATE TABLE  posts (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    content TEXT NOT NULL
);

CREATE TABLE  user_summaries (
    user_id INTEGER PRIMARY KEY,
    favorite_words TEXT[] NOT NULL,
    post_count INTEGER NOT NULL
);

CREATE TABLE  inflation_data (
    RegionalMember TEXT,
    Year INT,
    Inflation DECIMAL,
    Unit_of_Measurement TEXT,
    Subregion TEXT,
    Country_Code TEXT
);

COPY inflation_data
FROM '/docker-entrypoint-initdb.d/test.csv'
DELIMITER ','
CSV HEADER;