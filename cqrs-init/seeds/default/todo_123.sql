SET check_function_bodies = false;
INSERT INTO public.todos (id, user_id, title, is_completed, created_at, updated_at) VALUES (123, 'Gianni', 'My first todo', false, '2022-06-17 13:24:13.238865+00', '2022-06-17 13:24:13.238865+00');
SELECT pg_catalog.setval('public.commands_cmd_id_seq', 5, false);
SELECT pg_catalog.setval('public.responses_response_id_seq', 3, false);
SELECT pg_catalog.setval('public.todos_id_seq', 1, false);