FROM postgres:15.4-alpine

COPY ./*.sql /docker-entrypoint-initdb.d/