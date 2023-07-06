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

-- Inserting  values into the Team table
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

-- Inserting  values into the Conducting_Board table
INSERT INTO Conducting_Board (name, b_ID, type, revenue, expense, profit, format, s_ID, t_id)
VALUES
    ('ECB', 1234, 'Domestic T20 Tournament', 1200000000, 1300000.230, 230000.450, 'T20', 5678, 1001),
    ('BCCI', 2345, 'Domestic T20 Tournament', 1300000000, 2300000.320, 320000.560, 'T20', 6789, 1002),
    ('PCB', 3456, 'Domestic T20 Tournament', 1400000000, 3300000.410, 410000.670, 'T20', 7890, 1003),
    ('MCC', 4567, 'Domestic T20 Tournament', 1500000000, 4300000.500, 500000.780, 'T20', 8901, 1004),
    ('CA', 5678, 'Domestic T20 Tournament', 1600000000, 5300000.590, 590000.890, 'T20', 9012, 1005),
    ('CNZ', 6789, 'Domestic T20 Tournament', 1700000000, 6300000.680, 680000.910, 'T20', 1011, 1006),
    ('ICC', 7890, 'Domestic T20 Tournament', 1800000000, 7300000.770, 770000.120, 'T20', 1112, 1007),
    ('ACB', 8901, 'Domestic T20 Tournament', 1900000000, 8300000.860, 860000.230, 'T20', 1213, 1008),
    ('SLC', 9012, 'Domestic T20 Tournament', 2000000000, 9300000.950, 950000.340, 'T20', 1314, 1009),
    ('NZC', 1011, 'Domestic T20 Tournament', 2100000000, 10300000.041, 410000.450, 'T20', 1415, 1010);

-- Inserting values into the Sponsor table
INSERT INTO Sponsor (s_name, s_ID, type, office_address)
VALUES
    ('Byjus', 5678, 'Umpire Sponsor', '123 ABC Street, XYZ City'),
    ('Vivo', 6789, 'Kit Sponsor', '456 DEF Street, XYZ City'),
    ('Tata', 7890, 'Officlal Partners', '789 GHI Street, XYZ City'),
    ('Nike', 8901, 'Official Partners', '321 JKL Street, XYZ City'),
    ('Adidas', 9012, 'Title Sponsor', '654 MNO Street, XYZ City'),
    ('Star Sports', 1011, 'Broadcaster', '987 PQR Street, XYZ City'),
    ('SuperSport', 1112, 'Broadcaster', '876 STU Street, XYZ City'),
    ('Amazon', 1213, 'Official Partners', '543 VWX Street, XYZ City'),
    ('Google', 1314, 'Kit Sponsor', '210 YZ Street, XYZ City'),
    ('Microsoft', 1415, 'kit Sponsor', '999 XYZ Street, XYZ City');


-- Inserting  values into the Schedule table
INSERT INTO Schedule (name, type, format_s, scl_num, scl_desc)
VALUES
    ('MI vs CSK', 'League', 'T20', 12345, 'Match day 1 at Wankhede Stadium, Mumbai at 7:00 PM'),
    ('DC vs PS', 'Qualifier', 'T20', 23456, 'Qualifier 1 at Dubai International Cricket Stadium, Dubai at 7:30 PM'),
    ('KKR vs RCB', 'League', 'T20', 34567, 'Match day 2 at Eden Gardens, Kolkata at 7:00 PM'),
    ('SRH vs MI', 'Eliminator', 'T20', 45678, 'Eliminator at Rajiv Gandhi International Stadium, Hyderabad at 7:30 PM'),
    ('CSK vs DC', 'Semi-Final', 'T20', 56789, 'Semi-Final 1 at M. A. Chidambaram Stadium, Chennai at 7:00 PM'),
    ('RCB vs SRH', 'League', 'T20', 67890, 'Match day 3 at M. Chinnaswamy Stadium, Bengaluru at 7:30 PM'),
    ('PS vs KKR', 'Qualifier', 'T20', 78901, 'Qualifier 2 at Perth Stadium, Perth at 7:00 PM'),
    ('MI vs RCB', 'Final', 'T20', 89012, 'Final at Wankhede Stadium, Mumbai at 7:30 PM'),
    ('DC vs CSK', 'League', 'T20', 90123, 'Match day 4 at Feroz Shah Kotla, Delhi at 7:00 PM'),
    ('SRH vs KKR', 'League', 'T20', 10111, 'Match day 5 at Rajiv Gandhi International Stadium, Hyderabad at 7:30 PM');

