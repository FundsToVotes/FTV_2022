FROM mysql
COPY ./schema.sql /docker-entrypoint-initdb.d/schema.sql
COPY ./stored_proc.sql /docker-entrypoint-initdb.d/stored_proc.sql