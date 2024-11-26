# Define patterns for each Baab
BAABS = {
    "Nasara": {"past": "فَعَلَ", "present": "يَفْعُلُ", "ism_fa'il": "فَاعِل", "ism_maf'ool": "مَفْعُول","tafzeel": "أَفْعَلَ","ism_zarf_place": "مَفْعَل", "ism_zarf_time": "مَفْعِل",  "ism_aala_tool": "مِفْعَل"},
    "Daraba": {"past": "فَعَلَ", "present": "يَفْعِلُ", "ism_fa'il": "فَاعِل", "ism_maf'ool": "مَفْعُول","tafzeel":"أَفْعَلَ", "ism_zarf_place": "مَفْعَل","ism_zarf_time": "مَفْعِل", "ism_aala_tool": "مِفْعَل",   },
    "Fataha": {"past": "فَعَلَ", "present": "يَفْتَحُ", "ism_fa'il": "فَاعِل", "ism_maf'ool": "مَفْتُوح","tafzeel": "أَفْتَحُ","ism_zarf_place": "مَفْتَح","ism_zarf_time": "مَفْتِل","ism_aala_tool": "مِفْتَح",  },
    "Sami'a": {"past": "فَعِلَ", "present": "يَفْعَلُ", "ism_fa'il": "فَاعِل", "ism_maf'ool": "مَفْعُول", "tafzeel": "أَفْعَلُ","ism_zarf_place": "مَفْعَل","ism_zarf_time": "مَفْعِل", "ism_aala_tool": "مِفْعَل", },
    "Karuma": {"past": "فَعُلَ", "present": "يَفْعُلُ", "ism_fa'il": "فَاعِل", "ism_maf'ool": "مَفْعُول", "tafzeel": "أَفْعَلُ","ism_zarf_place": "مَفْعَل","ism_zarf_time": "مَفْعِل","ism_aala_tool": "مِفْعَل",},
    # Add more Baabs as needed
}


# Function to get a Baab by name
def get_baab_rules(baab_name):
    return BAABS.get(baab_name, None)
