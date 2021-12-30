BEGIN;
INSERT INTO
  "users" (
    "username",
    "email",
    "password",
    "avatar_url"
  )
VALUES
  (
    'juliusomo',
    'juliusomo@example.com',
    'motdepasse',
    DEFAULT
  ),
  (
    'amyrobson',
    'amyrobson@example.com',
    'motdepasse',
    DEFAULT
  ),
  (
    'maxblagun',
    'maxblagun@example.com',
    'motdepasse',
    DEFAULT
  ),
  (
    'ramsesmiron',
    'ramsesmiron@example.com',
    'motdepasse',
    DEFAULT
  );
INSERT INTO
  "comments" (
    "content",
    "score",
    "user_id",
    "replying_to"
  )
VALUES
  (
    'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You''ve nailed the design and the responsiveness at various breakpoints works really well.',
    12,
    2,
    NULL
  ),
  (
    'Woah, your project looks awesome! How long have you been coding for? I''m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!',
    5,
    3,
    NULL
  ),
  (
    'If you''re still new, I''d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It''s very tempting to jump ahead but lay a solid foundation first.',
    4,
    4,
    2
  ),
  (
    'I couldn''t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.',
    2,
    1,
    3
  );
COMMIT;