BEGIN;
-- Deletion of tables if they already exist 
DROP TABLE IF EXISTS "users",
"comments";
-- Creation of the user table
CREATE TABLE "users" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  -- by default, the user's avatar will be the logo of mentor.me
  avatar_url TEXT NOT NULL DEFAULT 'https://i.imgur.com/Z9fVYeP.png',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Creation of the comment table
CREATE TABLE "comments" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content TEXT NOT NULL,
  score INT NOT NULL,
  user_id INT NOT NULL REFERENCES "users" (id),
  replying_to INT REFERENCES "comments" (id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Creation of the refreshToken table
CREATE TABLE "refreshtokens" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  refreshtoken TEXT NOT NULL UNIQUE
);
COMMIT;