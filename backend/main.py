from rules.word_derivation import derive_words
from utils.helpers import read_csv

# Load the roots and their Baabs
ROOTS_FILE = "data/roots.csv"

def main():
    # Load roots and their Baabs
    roots = read_csv(ROOTS_FILE)
    
    # Process each root and derive related words
    for entry in roots:
        root = entry["root"]
        baab = entry["baab"]
        
        # Split root into individual letters (f, a, l)
        root_letters = root.split("-")
        
        # Derive words based on the Baab
        try:
            derived = derive_words(root_letters, baab)
            print(f"Root: {root}, Baab: {baab}")
            print(f"  Past Tense: {derived['past']}")
            print(f"  Present Tense: {derived['present']}")
            print(f"  Ism Fa'il: {derived['ism_fa''il']}")
            print(f"  Ism Maf'ool: {derived['ism_maf''ool']}")
        except ValueError as e:
            print(e)

if __name__ == "__main__":
    main()
