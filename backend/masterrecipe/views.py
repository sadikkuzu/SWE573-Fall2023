from django.http import HttpResponse
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Direction
from .models import Ingredient
from .models import Recipe
from .models import User
from .serializers import DirectionSerializer
from .serializers import IngredientSerializer
from .serializers import MyTokenObtainPairSerializer
from .serializers import RecipeSerializer
from .serializers import RegisterSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET", "POST"])
def api_list(request):
    if request.method == "GET":
        data = Recipe.objects.all()

        serializer = RecipeSerializer(data, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        print("POST received")
        print(request.data)
        context = {'rqst': request.data}
        serializer = RecipeSerializer(data=request.data, context=context)
        print("Validating..")
        if serializer.is_valid():
            print("validated!")
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def api_user_list(request, username):
    if request.method == "GET":
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = Recipe.objects.filter(owner=user)
        serializer = RecipeSerializer(data, many=True)

        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def api_detail(request, id):
    try:
        recipe = Recipe.objects.get(id=id)
    except Recipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = RecipeSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()

            ingredients = request.data.get("ingredients")
            print(ingredients)

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def api_recents(request):
    if request.method == "GET":
        print("recent GET received")
        data = Recipe.objects.order_by('id')[:3]
        print(f"recent data: {data}")

        serializer = RecipeSerializer(data, many=True)

        print(f"recent serializer: {serializer.data}")
        return Response(serializer.data)


@api_view(["POST", "PUT"])
def api_ingredient(request):
    print(request.data)

    if request.method == "POST":
        serializer = IngredientSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        try:
            ingredient = Ingredient.objects.get(pk=request.data['id'])
        except Exception:
            return Response(statues=status.HTTP_404_NOT_FOUND)

        serializer = IngredientSerializer(ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["Delete"])
def api_ingredient_delete(request, pk):
    if request.method == "DELETE":
        try:
            ingredient = Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        ingredient.delete()
        return HttpResponse(status=204)


@api_view(['POST', 'PUT'])
def api_direction(request):
    if request.method == "POST":
        serializer = DirectionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PUT":
        try:
            direction = Direction.objects.get(pk=request.data['id'])
        except Exception:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = DirectionSerializer(direction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["Delete"])
def api_direction_delete(request, pk):
    if request.method == "DELETE":
        try:
            ingredient = Direction.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        ingredient.delete()
        return HttpResponse(status=204)
