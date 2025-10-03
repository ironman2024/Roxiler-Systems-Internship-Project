@echo off
echo Setting up PostgreSQL database...
createdb store_rating_db
psql -d store_rating_db -f backend\database.sql
echo Database setup complete!
pause