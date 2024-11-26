from rules.baabs import get_baab_rules

def derive_words(root, baab_name):
    """Derive words based on the triliteral root and Baab."""
    rules = get_baab_rules(baab_name)
    if not rules:
        raise ValueError(f"Baab '{baab_name}' not found.")
    
    # Map the root letters to the pattern
    f, a, l = root
    derived = {
    "past": rules["past"].replace("ف", f).replace("ع", a).replace("ل", l),
    "present": rules["present"].replace("ف", f).replace("ع", a).replace("ل", l),
    "ism_fa'il": rules["ism_fa'il"].replace("ف", f).replace("ع", a).replace("ل", l),
    "ism_maf'ool": rules["ism_maf'ool"].replace("ف", f).replace("ع", a).replace("ل", l),
    
    # Add Tafzeel (comparative/superlative)
    "tafzeel": rules["tafzeel"].replace("ف", f).replace("ع", a).replace("ل", l),
    
    # Add Ism Zarf (Place and Time)
    "ism_zarf_place": rules["ism_zarf_place"].replace("ف", f).replace("ع", a).replace("ل", l),
    "ism_zarf_time": rules["ism_zarf_time"].replace("ف", f).replace("ع", a).replace("ل", l),
    
    # Add Ism Aala (Tool)
    "ism_aala_tool": rules["ism_aala_tool"].replace("ف", f).replace("ع", a).replace("ل", l),
}

    return derived
