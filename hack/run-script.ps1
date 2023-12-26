echo "" >> ./backend/core/.env
echo "" >> ./frontend/.env
echo "" >> ./.env

docker compose up -d --build
