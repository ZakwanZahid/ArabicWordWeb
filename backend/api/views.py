
# # Create your views here.
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from django.http import JsonResponse

# @api_view(['GET'])
# def word_list(request):
#     search_query = request.query_params.get('search', None)
#     words = [{"id": 1, "word": f"{search_query} meaning 1"}, {"id": 2, "word": f"{search_query} meaning 1"}]
#     return Response(words)

# views.py


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from nltk.stem.isri import ISRIStemmer
from rules.word_derivation import derive_words

isri_stemmer = ISRIStemmer()

@api_view(['GET'])
def word_list(request):
    # Get the search query from the request
    search_query = request.query_params.get('search', None)
    
    if search_query is None or search_query.strip() == "":
        return Response({"error": "No search query provided"}, status=400)

    # Apply stemming using ISRIStemmer
    
    stemmed_word = isri_stemmer.stem(search_query)

    # Create a response with the stemmed word
    words = [
        {"id": 1, "word": f"{stemmed_word} meaning 1"},
        {"id": 2, "word": f"{stemmed_word} meaning 2"}
    ]
    return Response({"stemmed_word": stemmed_word, "results": words})

# Import Baabs for checking compatibility
from rules.baabs import BAABS
@api_view(['GET'])
def get_graph_data(request):
    search_query = request.GET.get("word", None)
    
    if search_query is None or search_query.strip() == "":
         return JsonResponse({"error": "No word provided"}, status=400)

     # Stem the input word
    root = isri_stemmer.stem(search_query)
    # Extract the word from query parameters
    # word = request.GET.get("word", "مکتوب")

    # Step 1: Apply stemming to the input word
    # isri_stemmer = ISRIStemmer()
    # root = isri_stemmer.stem(stemmed_word)
    # Step 2: Manually map the stemmed root to a triliteral root structure (f, a, l)
    # In real-world use, this would be more robust and automated
    root_letters = root[:3]  # Assume root is valid triliteral (adjust as needed)
    triliteral_root = list(root_letters)
    
    # Step 3: Generate derived words using Salasi Mujarrad rules
    baab_name = "Nasara"  # Example Baab (you may implement a Baab selection logic)
    try:
        derived_words = derive_words(triliteral_root, baab_name)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)
    
    # Step 4: Format the derived words for graph nodes and edges
    graph_data = {
     "nodes": [
        {"data": {"id": root, "label": root}},
        {"data": {"id": derived_words["past"], "label": derived_words["past"]}},
        {"data": {"id": derived_words["present"], "label": derived_words["present"]}},
        {"data": {"id": derived_words["ism_fa'il"], "label": derived_words["ism_fa'il"]}},
        {"data": {"id": derived_words["ism_maf'ool"], "label": derived_words["ism_maf'ool"]}},
        {"data": {"id": derived_words["tafzeel"], "label": derived_words["tafzeel"]}},  # Tafzeel (Comparative/Superlative)
        {"data": {"id": derived_words["ism_zarf_place"], "label": derived_words["ism_zarf_place"]}},  # Place (Ism Zarf)
        {"data": {"id": derived_words["ism_zarf_time"], "label": derived_words["ism_zarf_time"]}},  # Time (Ism Zarf)
        {"data": {"id": derived_words["ism_aala_tool"], "label": derived_words["ism_aala_tool"]}},  # Tool (Ism Aala)
    ],
           "edges": [
        # Root → Past Tense
        {"data": {"source": root, "target": derived_words["past"]}},
        
        # Past Tense → Present Tense and Ism Fa'il
        {"data": {"source": derived_words["past"], "target": derived_words["present"]}},
        {"data": {"source": derived_words["past"], "target": derived_words["ism_fa'il"]}},
        
        # Ism Fa'il → Ism Maf'ool
        {"data": {"source": derived_words["ism_fa'il"], "target": derived_words["ism_maf'ool"]}},
        
        # Past Tense → Tafzeel (Superlative/Comparative)
        {"data": {"source": derived_words["past"], "target": derived_words["tafzeel"]}},
        
        # Tafzeel → Ism Zarf (Place, Time) and Ism Aala (Tool)
        {"data": {"source": derived_words["tafzeel"], "target": derived_words["ism_zarf_place"]}},
        {"data": {"source": derived_words["tafzeel"], "target": derived_words["ism_zarf_time"]}},
        {"data": {"source": derived_words["tafzeel"], "target": derived_words["ism_aala_tool"]}},
    ],
    }

    # Step 5: Return the graph data as a JSON response
    return JsonResponse(graph_data)

# @api_view(['GET'])
# def get_graph_data(request):
#     # Get the word from the query params
#     search_query = request.GET.get("word", None)
    
#     if search_query is None or search_query.strip() == "":
#         return JsonResponse({"error": "No word provided"}, status=400)

#     # Stem the input word
#     stemmed_word = isri_stemmer.stem(search_query)

#     # Generate dummy data dynamically based on the stemmed word
#     data = {
#         "nodes": [
#             {"data": {"id": stemmed_word, "label": stemmed_word}},  # Root node (stemmed word)
#             {"data": {"id": f"{stemmed_word}_1", "label": f"{stemmed_word} related 1"}},  # Related word 1
#             {"data": {"id": f"{stemmed_word}_2", "label": f"{stemmed_word} related 2"}},  # Related word 2
#         ],
#         "edges": [
#             {"data": {"source": stemmed_word, "target": f"{stemmed_word}_1"}},  # Connection 1
#             {"data": {"source": stemmed_word, "target": f"{stemmed_word}_2"}},  # Connection 2
#         ],
#     }

#     return JsonResponse(data)

# dummy data for graph
# GRAPH_DATA = {
#     "مکتوب": {
#         "nodes": [
#             {"data": {"id": "مکتوب", "label": "مکتوب"}},  # Stemmed word
#             {"data": {"id": "خط", "label": "خط"}},        # Related word: Letter
#             {"data": {"id": "پیغام", "label": "پیغام"}},  # Related word: Message
#             {"data": {"id": "مکتوبات", "label": "مکتوبات"}},  # Plural of مکتوب
#         ],
#         "edges": [
#             {"data": {"source": "مکتوب", "target": "خط"}},
#             {"data": {"source": "مکتوب", "target": "پیغام"}},
#             {"data": {"source": "مکتوب", "target": "مکتوبات"}},
#         ],
#     },
#     "خط": {
#         "nodes": [
#             {"data": {"id": "خط", "label": "خط"}},        # Related node
#             {"data": {"id": "مکتوب", "label": "مکتوب"}},  # Connection back to مکتوب
#             {"data": {"id": "تحریر", "label": "تحریر"}},  # Related word: Writing
#         ],
#         "edges": [
#             {"data": {"source": "خط", "target": "مکتوب"}},
#             {"data": {"source": "خط", "target": "تحریر"}},
#         ],
#     },
# }

# def get_graph_data(request):
#     word = request.GET.get("word", "مکتوب")
#     data = GRAPH_DATA.get(word, {"nodes": [], "edges": []})
#     return JsonResponse(data)


from django.http import JsonResponse
from django.shortcuts import render
import unicodedata

# Normalize input word to ensure proper encoding
def normalize_word(word):
    return unicodedata.normalize('NFC', word)

def identify_baab(word_to_check):
    # Normalize the word to ensure consistent encoding
    word_to_check = normalize_word(word_to_check)
    print(f"Normalized word: {word_to_check}")  # Debugging line to check input
    
    # Check for the Baab of the word
    for baab_name, rules in BAABS.items():
        # Debugging: print out the Baab rules
        print(f"Checking {word_to_check} against Baab: {baab_name}")
        print(f"Past Tense Rule: {rules['past']}")
        
        if word_to_check == rules["past"]:
            return {"baab": baab_name, "word": word_to_check, "type": "past"}
    
    return {"error": "No Baab match found", "word": word_to_check}

def identify_baab_view(request, word):
    # Call the identify_baab function with the word entered
    result = identify_baab(word)
    return JsonResponse(result)