from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import api_detail
from .views import api_direction
from .views import api_direction_delete
from .views import api_ingredient
from .views import api_ingredient_delete
from .views import api_list
from .views import api_recents
from .views import api_user_list
from .views import MyTokenObtainPairView
from .views import RegisterView

app_name = "masterrecipe"
urlpatterns = [
    path('api/', api_list, name="api_list_view"),
    path('api/userList/<str:username>', api_user_list, name="api_user_list_view"),
    path('api/<int:id>', api_detail, name="api_detail_view"),
    path('api/ingredient/', api_ingredient, name="api_ingredient_view"),
    path('api/ingredient/<int:pk>', api_ingredient_delete, name="api_ingredient_delete_view"),
    path('api/direction/', api_direction, name="api_direction_view"),
    path('api/direction/<int:pk>', api_direction_delete, name="api_direction_delete_view"),
    path('api/recents', api_recents, name="api_recents_view"),
    path('api/token', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/register', RegisterView.as_view(), name="auth_register"),
]
