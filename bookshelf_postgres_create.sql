SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- BOOKSHELF CONTAINS LIST OF ALL BOOKS BEING "WATCHED" FOR PRICE FLUCTUATIONS
-- NONE OF ITS PROPERTIES SHOULD BE NULL 
-- WE DO NOT WANT DEFAULT OIDS GENERATED
-- SERIAL TYPES ARE AUTOMATICALLY INCREMENTED BY POSTGRESQL
-- TITLE UNIQUENESS NEEDS TO BE ENFORCED

-- ISBNS ARE SHOWN ON PAGE FOR PAPERBACK VERSION BUT NOT THE EBOOK VERSION YAY....


CREATE TABLE IF NOT EXISTS public.bookshelf (
    "book_id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,  
    "author" VARCHAR NOT NULL,
    -- "ISBN13" BIGINT NOT NULL,
    "nook_url" VARCHAR NOT NULL,
    "kobo_url" VARCHAR NOT NULL,
    "kindle_url" VARCHAR NOT NULL,
    UNIQUE("title"),
	  CONSTRAINT "bookshelf_pk" PRIMARY KEY ("book_id")
) WITH (
  OIDS=FALSE
);

-- NOOK, KOBO, KINDLE WILL CONTAIN TIME SERIES DATA OF CORRESPONDING BOOK ENTRIES
-- FOREIGN KEYS OF ALL 3 TABLES REF BACK TO BOOK_ID IN PARENT TABLE (BOOKSHELF)
-- NO NULL PROPERTIES ALLOWED EXCEPT FOREIGN KEY (UPON DELETION OF ENTRY IN PARENT TABLE)

CREATE TABLE IF NOT EXISTS public.nook(
    -- "ISBN13" BIGINT NOT NULL,
    "time" DATE NOT NULL,
    "price" NUMERIC(10,2) NOT NULL,
    "nook_id" BIGINT
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.kobo(
    -- "ISBN13" BIGINT NOT NULL,
    "time" DATE NOT NULL,
    "price" NUMERIC(10,2) NOT NULL,
    "kobo_id" BIGINT
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS public.kindle(
    -- "ISBN13" BIGINT NOT NULL,
    "time" DATE NOT NULL,
    "price" NUMERIC(10,2) NOT NULL,
    "kindle_id" BIGINT
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.nook ADD CONSTRAINT "nook_fk" FOREIGN KEY ("nook_id") REFERENCES public.bookshelf("book_id") ON DELETE SET NULL;

ALTER TABLE public.kobo ADD CONSTRAINT "kobo_fk" FOREIGN KEY ("kobo_id") REFERENCES public.bookshelf("book_id") ON DELETE SET NULL;

ALTER TABLE public.kindle ADD CONSTRAINT "kindle_fk" FOREIGN KEY ("kindle_id") REFERENCES public.bookshelf("book_id") ON DELETE SET NULL;