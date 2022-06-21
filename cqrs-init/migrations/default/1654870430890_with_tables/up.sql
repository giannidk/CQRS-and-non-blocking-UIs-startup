SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.commands (
    cmd_id integer NOT NULL,
    cmd_type text NOT NULL,
    item_id bigint NOT NULL,
    cmd_ref text NOT NULL,
    payload json NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.commands_cmd_id_seq
    AS integer
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.commands_cmd_id_seq OWNED BY public.commands.cmd_id;
CREATE TABLE public.responses (
    cmd_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    cmd_ref text NOT NULL,
    payload json NOT NULL,
    response_id integer NOT NULL
);
CREATE VIEW public.commands_responses AS
 SELECT c.cmd_id,
    c.cmd_type,
    c.cmd_ref,
    c.payload AS data_in,
    r.payload AS data_out,
    c.created_at,
    r.created_at AS last_response_at
   FROM (public.commands c
     LEFT JOIN ( SELECT DISTINCT ON (responses.cmd_id) responses.cmd_id,
            responses.created_at,
            responses.cmd_ref,
            responses.payload,
            responses.response_id
           FROM public.responses
          WHERE (responses.created_at > (now() - '08:00:00'::interval))
          ORDER BY responses.cmd_id DESC, responses.created_at DESC) r ON ((c.cmd_id = r.cmd_id)))
  WHERE (c.created_at > (now() - '08:00:00'::interval))
  ORDER BY r.created_at DESC;
CREATE SEQUENCE public.responses_response_id_seq
    AS integer
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.responses_response_id_seq OWNED BY public.responses.response_id;
CREATE TABLE public.todos (
    id bigint NOT NULL,
    user_id text NOT NULL,
    title text NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;
ALTER TABLE ONLY public.commands ALTER COLUMN cmd_id SET DEFAULT nextval('public.commands_cmd_id_seq'::regclass);
ALTER TABLE ONLY public.responses ALTER COLUMN response_id SET DEFAULT nextval('public.responses_response_id_seq'::regclass);
ALTER TABLE ONLY public.commands
    ADD CONSTRAINT commands_pkey PRIMARY KEY (cmd_id);
ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (response_id);
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_todos_updated_at BEFORE UPDATE ON public.todos FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_todos_updated_at ON public.todos IS 'trigger to set value of column "updated_at" to current timestamp on row update';


CREATE
OR REPLACE VIEW "public"."commands_responses" AS
SELECT
DISTINCT ON (c.item_id) c.cmd_id,
c.cmd_type,
c.cmd_ref,
c.payload AS data_in,
r.payload AS data_out,
c.created_at,
r.created_at AS last_response_at,
c.item_id
FROM
(
commands c
LEFT JOIN (
SELECT
responses.cmd_id,
responses.created_at,
responses.cmd_ref,
responses.payload,
responses.response_id
FROM
responses
WHERE
(
responses.created_at > (now() - '08:00:00' :: interval)
)
ORDER BY
responses.cmd_id,
responses.created_at DESC
) r ON ((c.cmd_id = r.cmd_id))
)
WHERE
(c.created_at > (now() - '08:00:00' :: interval))
ORDER BY
c.item_id DESC,
c.created_at DESC;