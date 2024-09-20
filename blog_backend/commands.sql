CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT null,
    title TEXT NOT null,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Test man 1', 'www.test1.com', 'A test blog 1', 11);

INSERT INTO blogs (author, url, title, likes) VALUES ('Test man 2', 'www.test2.com', 'A test blog 2', 12);
