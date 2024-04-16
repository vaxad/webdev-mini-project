# import pandas as pd

# def csv_to_csv(input_file, output_file, columns):
#     # Read CSV file
#     df = pd.read_csv(input_file)
    
#     # Select the specified columns
#     df_selected = df[columns]
    
#     # Save as CSV
#     df_selected.to_csv(output_file, index=False)
    
#     print(f"CSV file '{output_file}' has been created with the selected columns.")

# Example usage:
# input_file = "game_info.csv"  # Specify your input CSV file path
# output_file = "output.csv"  # Specify the desired output CSV file path
# columns_to_select = ["id", "slug", "name"]  # Specify the columns you want to select

# csv_to_csv(input_file, output_file, columns_to_select)

# import csv
# import json

# def extract_unique_genres(csv_file):
#     unique_genres = set()  # Using a set to automatically handle uniqueness
    
#     with open(csv_file, 'r',encoding='utf-8') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             # Split the genres string by commas and add each genre to the set
#             genres = row['genres'].split(',')
#             unique_genres.update(genres)

#     return list(unique_genres)  # Convert set to list for JSON serialization

# Example usage
# csv_file = 'game_info.csv'  # Replace 'your_csv_file.csv' with the path to your CSV file
# unique_genres = extract_unique_genres(csv_file)

# # Save unique genres to a JSON file
# output_file = 'genres.json'
# with open(output_file, 'w') as json_file:
#     json.dump(unique_genres, json_file)

# print(f"Unique genres saved to {output_file}")



import json

def extract_unique_genres(json_file):
    unique_genres = set()
    
    with open(json_file, 'r') as file:
        data = json.load(file)
        for item in data:
            # Split the genres string by '||' and add each genre to the set
            genres = item.split('||')
            unique_genres.update(genres)

    return list(unique_genres)

# Example usage
json_file = 'genres.json'  # Replace 'your_json_file.json' with the path to your JSON file
unique_genres = extract_unique_genres(json_file)

# Save unique genres to a JSON file
output_file = 'unique_genres.json'
with open(output_file, 'w') as file:
    json.dump(unique_genres, file)

print(f"Unique genres saved to {output_file}")


