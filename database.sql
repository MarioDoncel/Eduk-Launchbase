CREATE DATABASE "eduk"

CREATE TABLE "teachers" (
    "id"	SERIAL PRIMARY KEY,
    "name"	TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "birth_date" TIMESTAMP,
    "education_level" TEXT NOT NULL,
    "class_type" TEXT NOT NULL,
    "subjects_taught" TEXT NOT NULL,
    "created_at" TIMESTAMP DEFAULT(now())		
);
 

CREATE TABLE "students" (
    "id"	SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birth" TIMESTAMP,
    "grade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP DEFAULT(now()),
    "teacher_id" INTEGER 
);