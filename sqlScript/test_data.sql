insert into payment_history (id, trans_id, uid, transfer_amount, transaction_date, diamond_amount, diamond_rate, created, status, message)
values  (1, 1, '801914524', 2000, '2024-05-10 23:42:30', 0.2, 10000, '2024-05-14 17:27:58', 0, 'Bad request'),
        (2, 1, '801914524', 2000, '2024-05-10 23:42:30', 0.2, 10000, '2024-05-14 18:15:38', 0, 'Bad request'),
        (3, 1, '801914524', 2000, '2024-05-10 23:42:30', 0.2, 10000, '2024-05-14 18:16:05', 1, 'Transfer Diamond Success'),
        (4, 2, '801914524', 2000, '2024-05-11 23:42:30', 0.2, 10000, '2024-05-14 18:26:21', 1, 'Transfer Diamond Success'),
        (5, 3, '801914524', 2000, '2024-05-12 13:42:30', 0.2, 10000, '2024-05-14 18:26:33', 0, 'Bad request'),
        (6, 3, '801914524', 2000, '2024-05-13 13:42:30', 0.2, 10000, '2024-05-14 18:29:45', 1, 'Transfer Diamond Success'),
        (7, 4, '801914524', 2000, '2024-05-13 23:42:30', 0.1, 20000, '2024-05-14 18:30:08', 1, 'Transfer Diamond Success'),
        (8, 4, '801914524', 4000, '2024-05-13 23:42:30', 0.2, 20000, '2024-05-14 18:30:34', 1, 'Transfer Diamond Success'),
        (9, 5, '801914524', 4000, '2024-05-13 23:45:30', 0.2, 20000, '2024-05-14 18:31:21', 0, 'Login required'),
        (10, 5, '801914524', 4000, '2024-05-13 23:45:30', 0.2, 20000, '2024-05-14 18:32:29', 0, 'Login required'),
        (11, 5, '801914524', 4000, '2024-05-13 23:45:30', 0.2, 20000, '2024-05-14 18:33:18', 0, 'Login required'),
        (12, 5, '801914524', 4000, '2024-05-13 23:45:30', 0.2, 20000, '2024-05-14 18:33:35', 1, 'Transfer Diamond Success'),
        (13, 847057, '801914524', 4000, '2024-05-13 23:50:30', 0.2, 20000, '2024-05-14 18:42:31', 0, 'Invalid token'),
        (14, 847057, '801914524', 4000, '2024-05-13 23:50:30', 0.2, 20000, '2024-05-14 18:42:50', 0, 'Bad request'),
        (15, 847057, '801914524', 4000, '2024-05-13 23:50:30', 0.2, 20000, '2024-05-14 18:43:14', 1, 'Transfer Diamond Success'),
        (16, 847058, '801914524', 2000, '2024-05-14 23:42:30', 0.1, 20000, '2024-05-14 18:43:50', 1, 'Transfer Diamond Success');

insert into settings (id, `key`, value, name, updated_at)
values  (1, 'DIAMOND_RATE', '10000', 'Diamond Rate', '2024-05-18 15:25:40'),
        (2, 'MIN_DIAMOND', '1', 'Min Diamond', '2024-05-18 15:25:40'),
        (3, 'SOLVER', 'ad90e38077cd66673e038baffb068995', '2CaptCha Api Key', '2024-05-19 13:13:43'),
        (4, 'ACCOUNT_NUMBER', '101499100004001345', 'Account Number', '2024-05-19 13:13:43'),
        (5, 'ACCOUNT_NAME', 'Ulacute', 'Account Name', '2024-05-17 17:12:07'),
        (6, 'PREFIX', 'KC', 'Prefix', '2024-05-06 16:35:25'),
        (7, 'PATI_PHONE_NUMBER', '0374727661', 'Pati Phone number', '2024-05-18 16:02:05'),
        (8, 'PATI_PASSWORD', 'dailikimcuonglt2024', 'Pati Password', '2024-05-18 15:58:33');

insert into users (id, username, password, role, refresh_token, expired)
values  (1, 'abc', '$2a$10$Ll4vPWHD4J0GCXJaKLx0QexhaW0qpK/j/j.Za8R5RIcMkdXJ28Bdm', 'ADMIN', 'vTEB1wzexup1MKeRIQeBfPSjd6T0ir', '2024-05-11 13:53:13'),
        (2, 'abcd', '$2a$10$BseGiZ6ndVybLChaEdt2yuzgeisqAJtQoAhKtBZwmJldmy9GyMPaO', 'GUEST', '7A3CPxOlBh8HRDkOtZdYXUoHFnihpw', null);