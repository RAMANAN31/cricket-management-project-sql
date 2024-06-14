import pandas as pd

# Player table
player_data = {
    'plr_name': ['John Smith', 'David Warner', 'Rohit Sharma', 'Kane Williamson', 'Virat Kohli', 'AB de Villiers', 'Andre Russell', 'Ben Stokes', 'Shakib Al Hasan', 'Rashid Khan', 'Jasprit Bumrah'],
    'plr_ID': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'plr_t_ID': [1001, 1002, 1003, 1001, 1002, 1003, 1001, 1002, 1003, 1001, 1002],
    'plr_contact_amt': [1200000, 2300000, 1100000, 3400000, 4300000, 2330000, 1240000, 4240000, 5543000, 1220000, 2220000],
    'contract_start': ['2022-01-01'] * 11,
    'contract_end': ['2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31'],
    'plr_type': ['Batsman', 'Batsman', 'Batsman', 'Batsman', 'Batsman', 'Batsman', 'All-rounder', 'All-rounder', 'All-rounder', 'Bowler', 'Bowler']
}
df_player = pd.DataFrame(player_data)
df_player 
