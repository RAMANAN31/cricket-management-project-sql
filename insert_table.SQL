-- Inserting random values into the Player table
INSERT INTO Player (plr_name, plr_ID, t_ID, plr_contact, contract_start, contract_end, plr_type)
VALUES
('John Smith', 1, 1001, 1234567890, '2022-01-01', '2023-12-31', 'Batsman'),
('David Warner', 2, 1002, 9876543210, '2022-01-01', '2025-12-31', 'Batsman'),
('Rohit Sharma', 3, 1003, 5555555555, '2022-01-01', '2024-12-31', 'Batsman'),
('Kane Williamson', 4, 1001, 1111111111, '2022-01-01', '2023-12-31', 'Batsman'),
('Virat Kohli', 5, 1002, 2222222222, '2022-01-01', '2025-12-31', 'Batsman'),
('AB de Villiers', 6, 1003, 3333333333, '2022-01-01', '2024-12-31', 'Batsman'),
('Andre Russell', 7, 1001, 4444444444, '2022-01-01', '2023-12-31', 'All-rounder'),
('Ben Stokes', 8, 1002, 6666666666, '2022-01-01', '2025-12-31', 'All-rounder'),
('Shakib Al Hasan', 9, 1003, 7777777777, '2022-01-01', '2024-12-31', 'All-rounder'),
('Rashid Khan', 10, 1001, 8888888888, '2022-01-01', '2023-12-31', 'Bowler'),
('Jasprit Bumrah', 11, 1002, 9999999999, '2022-01-01', '2025-12-31', 'Bowler');

-- Inserting random values into the Team table
INSERT INTO Team (t_name, t_ID, off_addr, staff_name, staff_Id, staff_contract_period, contact, revenue, expense, profit)
VALUES
    ('Mumbai Indians', 1001, 'Mumbai, India', 'John Doe', 101, '2022-2025', 1234567890, 1000000000.00, 800000.00, 200000.00),
    ('Chennai Super Kings', 1002, 'Chennai, India', 'Jane Smith', 102, '2022-2024', 9876543210, 900000000.00, 700000.00, 200000.00),
    ('Royal Challengers Bangalore', 1003, 'Bangalore, India', 'David Johnson', 103, '2022-2025', 5555555555, 950000000.00, 750000.00, 200000.00),
    ('Sydney Sixers', 1004, 'Sydney, Australia', 'Michael Brown', 104, '2022-2024', 1111111111, 800000000.00, 600000.00, 200000.00),
    ('Perth Scorchers', 1005, 'Perth, Australia', 'Emma Davis', 105, '2022-2025', 2222222222, 850000000.00, 650000.00, 200000.00),
    ('Kolkata Knight Riders', 1006, 'Kolkata, India', 'Andrew Wilson', 106, '2022-2024', 3333333333, 900000000.00, 700000.00, 200000.00),
    ('Delhi Capitals', 1007, 'Delhi, India', 'Olivia Anderson', 107, '2022-2025', 4444444444, 950000000.00, 750000.00, 200000.00),
    ('Melbourne Stars', 1008, 'Melbourne, Australia', 'William Davis', 108, '2022-2024', 6666666666, 800000000.00, 600000.00, 200000.00),
    ('Sunrisers Hyderabad', 1009, 'Hyderabad, India', 'Sophia Wilson', 109, '2022-2025', 7777777777, 850000000.00, 650000.00, 200000.00),
    ('Lahore Qalandars', 1010, 'Lahore, Pakistan', 'Daniel Brown', 110, '2022-2024', 8888888888, 900000000.00, 700000.00, 200000.00);
