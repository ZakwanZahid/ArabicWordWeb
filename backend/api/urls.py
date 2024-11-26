from django.urls import path
from .views import word_list
from . views import get_graph_data
from . import views

urlpatterns = [
    path('words', word_list),
    path("graph-data/", get_graph_data, name="graph-data"),
    path('identify_baab/<str:word>/', views.identify_baab_view, name='identify_baab'),
]
