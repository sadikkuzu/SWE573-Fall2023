<center><h1>MASTER RECIPE</h1></center>

&nbsp;

<center><h2>SWE573 - Fall 2023 - Final Project</h2></center>

&nbsp;

<center>02.01.2024</center>

<br/><br/>

<center>Sadık Kuzu - 2021719231</center>

&nbsp;


* GitHub Repository `https://github.com/sadikkuzu/SWE573-Fall2023`
* git tag version: v0.9.1
* GitHub Release: `https://github.com/sadikkuzu/SWE573-Fall2023/releases/tag/0.9.1`
* Deployment URI: `http://167.71.42.242:3000/`

&nbsp;

**HONOR CODE**
Related to the submission of all the project deliverables for the Swe573 2023 Fall
semester project reported in this report, I Sadık Kuzu declare that:
- I am a student in the Software Engineering MS program at Bogazici University and am registered for Swe573 course during the Fall 2023 semester.
- All the material that I am submitting related to my project (including but not limited to the project repository, the final project report, and supplementary documents) have been exclusively prepared by myself.
- I have prepared this material individually without the assistance of anyone else with the exception of permitted peer assistance which I have explicitly disclosed in this report.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Software Requirements Specification

The followings are a list of functional and non-functional requirements that specify the application, including a glossary that defines important terminology.


####  Glossary

- **F:** Functional Requirement
- **NF:** Non-Functional Requirement
- **System:** The application built for social recipe sharing
- **User:** Users registered on the system, with their personal profile page
- **New User:** Users not registered on the system yet but willing to register
- **Activity:** Likes, follows and comments
- **Recipe:** A post made on the system that have photo, description, ingredients and steps

---

#### Functional Requirements

| NO &nbsp;&nbsp;&nbsp;&nbsp; | REQUIREMENT | STATE |
|------|-------|:-----:|
| F-1 | New users shall register with a unique username and password. | Completed |
| F-2 | When a New User has registered, the System shall allow them to log in as a User. | Completed |
| F-3 | Users shall be able to submit, edit, or delete their Recipes on the System. | Completed |
| F-4 | Users shall be able to list ingredients with quantities and alternatives when submitting a Recipe. | Completed |
| F-5 | Users shall be able to add cooking steps in a sequential manner when submitting a Recipe. | Completed |
| F-6 | Users may include nutritional information when submitting a Recipe. | Completed |
| F-7 | Users shall be able to post, edit, or delete comments on Recipes. | Not Completed |
| F-8 | Users shall be able to like or follow other Users or their Recipes. | Not Completed |
| F-9 | The System shall update likes and follows in real-time. | Not Completed |
| F-10 | Users shall be able to edit their personal profile information and view their own Recipes, likes, and follows on the System. | Not Completed |
| F-11 | Users shall be able to rate Recipes on the System. | Not Completed |
| F-12 | The System may suggest ways to modify or derive new Recipes based on User interactions. | Not Completed |
| F-13 | The System shall offer a search function with filters for ingredients, cuisine types, dietary needs, etc. | Not Completed |
| F-14 | The search function shall provide results promptly. | Not Completed |

### Non-Functional Requirements

| NO &nbsp;&nbsp;&nbsp;&nbsp; | REQUIREMENT | STATE |
|------|-------------|:-----:|
| NF-1 | The System shall be available as a web application. | Completed |
| NF-2 | The System shall have a responsive design and easy navigation. | Completed |
| NF-3 | The System shall load pages quickly and handle a large number of simultaneous Users. | Completed |
| NF-4 | User data shall be encrypted and the System shall have robust authentication measures. | Completed |
| NF-5 | The System shall be operational 7/24 with minimal downtime. | Completed |
| NF-6 | The System shall be scalable to accommodate increasing numbers of Users and Recipes. | Not Completed |
| NF-7 | The System shall comply with relevant data protection and privacy regulations. | Not Completed |

### Design documents


![](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/341d6ce8-4d4e-44c8-b4cc-a58296eb39e8)

![](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/5528161a-2e1b-422c-8556-1771e435267f)

![](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/08ec9138-a205-4117-b0de-9a51b7e12ac3)

![](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/cb013659-fcd9-470a-a656-9013c51aedd0)



### Status of Deployment:

This project is **dockerized** and **deployed**.

The project is ready and deployed on a DigitalOcean Droplet Virtual Machine. Also, one can clone the main branch of the repository. By the help of dockerization one can run the whole project locally. When deploying the project with docker the project creates 3 different containers for backend, frontend and database.


Project dockerization is orchestrated by docker-compose 3.5 version.
After dockerization there are 3 containers we have.
* Backend Container:
  * Based on python:3.10-slim-buster image
  * Installs required packages via requirements-dev.txt
  * Copies necessary folders/files
  * Runs migrate and runserver commands
* Frontend Container:
  * Based on node:20-buster-slim image
  * Copies necessary folders
  * Installs necessary packages via npm install command
  * Runs npm start command
* Database Container:
  * Based on postgres:15.3-alpine image

docker-compose.yml URL:
https://github.com/sadikkuzu/SWE573-Fall2023/blob/main/docker-compose.yml
Backend Dockerfile URL:
https://github.com/sadikkuzu/SWE573-Fall2023/blob/main/backend/Dockerfile
Frontend Dockerfile URL:
https://github.com/sadikkuzu/SWE573-Fall2023/blob/main/frontend/Dockerfile


###  System manual


#### Instructions for local development

##### Prerequisites

* git - [Installation](https://git-scm.com/downloads)
* make - [Linux/Mac](https://formulae.brew.sh/formula/make) - [Windows](https://scoop.sh/#/apps?q=make)
* Docker - [Linux](https://docs.docker.com/desktop/install/linux-install/) - [Mac](https://docs.docker.com/desktop/install/mac-install/) - [Windows](https://docs.docker.com/desktop/install/windows-install/)
* Docker Compose

##### Run script

```shell
git clone https://github.com/sadikkuzu/SWE573-Fall2023.git
cd SWE573-Fall2023
make
make compose-up
```

#### Deployment

##### URL

* http://167.71.42.242:3000/

##### System Design

![system-design](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/fab238c9-a03d-4fce-9fef-f27660f82cde)

##### UML Diagram

```
+------------------------------------+
|               AbstractUser         |
|------------------------------------|
| - id: int                          |
| - username: str                    |
| - password: str                    |
| - email: str                       |
| - created_at: DateTime             |
|------------------------------------|
| + __str__(): str                   |
+------------------------------------+
                |
                |
                v
+-------------------------+     +-------------------------+     +-------------------------+
|           User          |     |         Recipe          |     |       Ingredient        |
|-------------------------|     |-------------------------|     |-------------------------|
| - id: int               |     | - id: int               |     | - id: int               |
| - username: str         |     | - name: str             |     | - name: str             |
| - password: str         |     | - owner: User           |     | - amount: str (opt)     |
| - email: str            |     | - created_at: DateTime  |     | - unit: str (opt)       |
| - created_at: DateTime  |     | - image: ImageField     |     | - recipe: Recipe        |
|-------------------------|     | - description: str      |     |-------------------------|
| + __str__(): str        |     | + __str__(): str        |     | + __str__(): str        |
+-------------------------+     +-------------------------+     +-------------------------+
                |                                   |
                |                                   |
                v                                   |
+-------------------------+     +-------------------------+
|        Direction        |     |          Image          |
|-------------------------|     |-------------------------|
| - id: int               |     | - id: int               |
| - content: str          |     | - image: ImageField     |
| - recipe: Recipe        |     |-------------------------|
|-------------------------|     | + __str__(): str        |
| + __str__(): str        |     +-------------------------+
+-------------------------+
```


### Testing

Test user:

```
Username: tahsin
Password: tahsin
```

Unit test coverage report

```
Name                                                                                          Stmts   Miss  Cover
-----------------------------------------------------------------------------------------------------------------
core/__init__.py                                                                                  0      0   100%
core/settings.py                                                                                 34      0   100%
core/urls.py                                                                                      8      1    88%
manage.py                                                                                        12      2    83%
masterrecipe/__init__.py                                                                          0      0   100%
masterrecipe/admin.py                                                                             9      0   100%
masterrecipe/apps.py                                                                              4      0   100%
masterrecipe/authentication/__init__.py                                                           3      0   100%
masterrecipe/authentication/access_token.py                                                      14      8    43%
masterrecipe/authentication/refresh_token.py                                                     14      8    43%
masterrecipe/migrations/0001_initial.py                                                           9      0   100%
masterrecipe/migrations/0002_recipe.py                                                            7      0   100%
masterrecipe/migrations/0003_recipe_image.py                                                      5      0   100%
masterrecipe/migrations/0004_alter_recipe_name_ingredient_direction.py                            6      0   100%
masterrecipe/migrations/0005_alter_recipe_owner.py                                                7      0   100%
masterrecipe/migrations/0006_remove_recipe_image_image.py                                         6      0   100%
masterrecipe/migrations/0007_recipe_image_delete_image.py                                         5      0   100%
masterrecipe/migrations/0008_recipe_description.py                                                5      0   100%
masterrecipe/migrations/0009_ingredient_amount.py                                                 5      0   100%
masterrecipe/migrations/0010_remove_direction_recipe_remove_ingredient_recipe_and_more.py         6      0   100%
masterrecipe/migrations/0011_remove_recipe_directions_remove_recipe_ingredients_and_more.py       6      0   100%
masterrecipe/migrations/0012_ingredient_unit.py                                                   5      0   100%
masterrecipe/migrations/__init__.py                                                               0      0   100%
masterrecipe/models.py                                                                           27      2    93%
masterrecipe/serializers.py                                                                     106     39    63%
masterrecipe/tests.py                                                                            94      0   100%
masterrecipe/urls.py                                                                             14      0   100%
masterrecipe/views.py                                                                           134     43    68%
```

### User manual

#### Home Page

![home-page](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/f8bcc5fd-e0ee-4344-9451-a7ec04d01c0e)

#### Register

![register](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/9ba11d1b-e03b-4698-93fc-2ca121cbc5d4)

#### Login

![login](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/758e3016-a77e-4cd6-be91-0071559c1106)


#### Create Recipe

![create-recipe-1](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/d110f8ba-80df-4fca-be28-0db76c1ccb68)
![create-recipe-2](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/6e47a549-dd24-47b8-bee3-b438cc42da57)
![create-recipe-3](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/86dbe31d-8fc9-46a3-9fb3-0130597acaaf)


#### Recipe List

![recipe-list](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/c71c3379-6ce7-45b0-bc77-522022622f75)

#### Recipe Detail

![recipe-detail](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/8a46702d-2955-4bdd-a79a-bb576f8d8666)


### Project Demo

https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/6d38b392-b496-4662-a6a5-fa11afdf6a17
![project-demo](https://github.com/sadikkuzu/SWE573-Fall2023/assets/23168063/f8bcc5fd-e0ee-4344-9451-a7ec04d01c0e)

### References

1. https://git-scm.com/
2. https://www.djangoproject.com/
3. https://www.django-rest-framework.org/
4. https://react.dev/
5. https://www.docker.com/
6. https://www.digitalocean.com/?refcode=c1f35c98ce91
7. https://cloudinary.com/
8. https://www.elephantsql.com/
9. https://developer.syndigo.com/docs/nutritionix-api-guide
