import pandas as pd

def csv_to_csv(input_file, output_file, columns):
    # Read CSV file
    df = pd.read_csv(input_file)
    
    # Select the specified columns
    df_selected = df[columns]
    
    # Save as CSV
    df_selected.to_csv(output_file, index=False)
    
    print(f"CSV file '{output_file}' has been created with the selected columns.")

# Example usage:
input_file = "game_info.csv"  # Specify your input CSV file path
output_file = "output.csv"  # Specify the desired output CSV file path
columns_to_select = ["id", "slug", "name"]  # Specify the columns you want to select

csv_to_csv(input_file, output_file, columns_to_select)
