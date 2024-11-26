import csv

# Function to read data from CSV
def read_csv(file_path):
    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

# Function to write data to CSV
def write_csv(file_path, data, fieldnames):
    with open(file_path, mode="w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
