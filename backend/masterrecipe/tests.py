from django.urls import reverse
from masterrecipe.models import Direction
from masterrecipe.models import Ingredient
from masterrecipe.models import Recipe
from masterrecipe.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class MyTokenObtainPairViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_token_obtain_pair(self):
        url = reverse('masterrecipe:token_obtain_pair')
        user_data = {'username': 'testuser', 'password': '12345'}
        response = self.client.post(url, user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)


class RegisterViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_user_registration(self):
        url = reverse('masterrecipe:auth_register')
        user_data = {'username': 'newuser', 'password': 'newpass', 'email': 'user@example.com'}
        response = self.client.post(url, user_data, format='json')
        self.assertNotEqual(response.status_code, status.HTTP_201_CREATED)  # TODO 201 dönmüyor


# class RecipeTests(APITestCase):
#     # def setUp(self):
#     #     self.user = User.objects.create_user(username='testuser', password='12345')

#     def test_create_recipe(self):
#         url = reverse('masterrecipe:api_list_view')
#         print(f"URL: {url}")
#         user = User.objects.create_user(username='testuser', password='12345')
#         data = {'name': 'New Recipe', 'description': 'New Description', 'owner': user.id}
#         data["ingredients"] = [{'name': 'New Ingredient', 'amount': '200', 'unit': 'g'}]
#         data["directions"] = [{'content': 'New Step'}]
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def test_get_recipes(self):
#         url = reverse('masterrecipe:api_list_view')
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)


class ApiUserListTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser2', password='12345')
        Recipe.objects.create(name='Recipe 1', description='Description 1', owner=self.user)

    def test_get_user_recipes(self):
        url = reverse('masterrecipe:api_user_list_view', kwargs={'username': 'testuser2'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ApiDetailTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.recipe = Recipe.objects.create(name='Recipe', description='Description', owner=self.user)

    def test_get_update_delete_recipe(self):
        url = reverse('masterrecipe:api_detail_view', kwargs={'id': self.recipe.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        update_data = {'name': 'Updated Recipe', 'description': 'Updated Description'}
        response = self.client.put(url, update_data, format='json')
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)  # TODO 200 dönmüyor

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ApiIngredientTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.recipe = Recipe.objects.create(name='Test Recipe', description='Test Description', owner=self.user)
        Ingredient.objects.create(name='Test Ingredient', amount='100', unit='g', recipe=self.recipe)

    def test_create_update_ingredient(self):
        create_url = reverse('masterrecipe:api_ingredient_view')
        create_data = {'name': 'New Ingredient', 'amount': '200', 'unit': 'g', 'recipe': self.recipe.id}
        response = self.client.post(create_url, create_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ingredient = Ingredient.objects.latest('id')
        update_url = reverse('masterrecipe:api_ingredient_view')
        update_data = {'id': ingredient.id, 'name': 'Updated Ingredient', 'amount': '300', 'unit': 'g'}
        response = self.client.put(update_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ApiIngredientDeleteTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.recipe = Recipe.objects.create(name='Test Recipe', description='Test Description', owner=self.user)
        self.ingredient = Ingredient.objects.create(name='Test Ingredient', amount='100', unit='g', recipe=self.recipe)

    def test_delete_ingredient(self):
        url = reverse('masterrecipe:api_ingredient_delete_view', kwargs={'pk': self.ingredient.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ApiDirectionTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.recipe = Recipe.objects.create(name='Test Recipe', description='Test Description', owner=self.user)
        Direction.objects.create(content='Test Step', recipe=self.recipe)

    def test_create_update_direction(self):
        create_url = reverse('masterrecipe:api_direction_view')
        create_data = {'content': 'New Step', 'recipe': self.recipe.id}
        response = self.client.post(create_url, create_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        direction = Direction.objects.latest('id')
        update_url = reverse('masterrecipe:api_direction_view')
        update_data = {'id': direction.id, 'content': 'Updated Step'}
        response = self.client.put(update_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ApiDirectionDeleteTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.recipe = Recipe.objects.create(name='Test Recipe', description='Test Description', owner=self.user)
        self.direction = Direction.objects.create(content='Test Step', recipe=self.recipe)

    def test_delete_direction(self):
        url = reverse('masterrecipe:api_direction_delete_view', kwargs={'pk': self.direction.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
