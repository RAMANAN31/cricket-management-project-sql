create database cricket
use cricket

-- Creating the Player table
CREATE TABLE Player (
    plr_name VARCHAR(50),
    plr_ID INT PRIMARY KEY,
    t_ID INT REFERENCES Team(t_ID),
    plr_contact INT,
    contract_start DATE,
    contract_end DATE,
    plr_type VARCHAR(50)
);

-- Creating the Team table
CREATE TABLE Team (
    t_name VARCHAR(50),
    t_ID INT PRIMARY KEY,
    off_addr VARCHAR(100),
    staff_name VARCHAR(50),
    staff_Id INT,
    staff_contract_period VARCHAR(50),
    contact INT,
    revenue DECIMAL(10, 2),
    expense DECIMAL(10, 2),
    profit DECIMAL(10, 2)
);

-- Creating the Conducting_Board table
CREATE TABLE Conducting_Board (
    name VARCHAR(50),
    b_ID INT,
    type VARCHAR(50),
    revenue DECIMAL(10, 2),
    expense DECIMAL(10, 2),
    profit DECIMAL(10, 2),
    format VARCHAR(50),
    s_ID INT REFERENCES Sponsor(s_ID)
);

-- Creating the Sponsor table
CREATE TABLE Sponsor (
    s_name VARCHAR(50),
    s_ID INT PRIMARY KEY,
    type VARCHAR(50),
    office_address VARCHAR(100)
);

-- Creating the Schedule table
CREATE TABLE Schedule (
    name VARCHAR(50),
    type VARCHAR(50),
    format_s INT REFERENCES Conducting_Board(format),
    scl_num INT,
    scl_desc VARCHAR(50)
);

-- Creating the Equipment table
CREATE TABLE Equipment (
    name VARCHAR(50),
    type VARCHAR(50),
    plr_ID INT REFERENCES Player(plr_ID),
    owned_by VARCHAR(50)
);

