#player prediction usinng ml
import pandas as pd

# Player table
player_data = {
    'plr_name': ['John Smith', 'David Warner', 'Rohit Sharma', 'Kane Williamson', 'Virat Kohli', 'AB de Villiers', 'Andre Russell', 'Ben Stokes', 'Shakib Al Hasan', 'Rashid Khan', 'Jasprit Bumrah'],
    'plr_ID': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'plr_t_ID': [1001, 1002, 1003, 1001, 1002, 1003, 1001, 1002, 1003, 1001, 1002],
    'plr_contact': [1234567890, 9876543210, 5555555555, 1111111111, 2222222222, 3333333333, 4444444444, 6666666666, 7777777777, 8888888888, 9999999999],
    'contract_start': ['2022-01-01'] * 11,
    'contract_end': ['2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31', '2024-12-31', '2023-12-31', '2025-12-31'],
    'plr_type': ['Batsman', 'Batsman', 'Batsman', 'Batsman', 'Batsman', 'Batsman', 'All-rounder', 'All-rounder', 'All-rounder', 'Bowler', 'Bowler']
}
df_player = pd.DataFrame(player_data)

