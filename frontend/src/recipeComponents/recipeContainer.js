import React, { useContext, useState } from 'react';

//Style and Components
import './recipeContainer.css';
import NavBar from './navbar';
import {Row, Col, Button, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useLoaderData, useRevalidator } from 'react-router-dom';


//Routing
import axios from "axios";

//Auth
import AuthContext from "../context/AuthContext"


export const recipeLoader = async( {params} ) => {
    const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
    const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
    const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';
    const nutritionHost = process.env.REACT_APP_NUTRITION_BACKEND_HOST || 'http://localhost';
    const nutritionPort = process.env.REACT_APP_NUTRITION_BACKEND_PORT || 8001;
    const nutritionEndpoint = process.env.REACT_APP_NUTRITION_BACKEND_ENDPOINT || 'nutrition';

    const results = await axios.get(`${backendHost}:${backendPort}/${backendEndpoint}/${params.id}`)
    .catch(function(error){
        console.log('Error', error.message);
        return {};
    });
    let recipe = results.data;
    let query_text = ''
    {recipe['ingredients'].map((ingredient) => {
        query_text += ingredient['amount'] + ' ' + ingredient['unit'] + ' ' + ingredient['name'] + ' '
    })}
    let nutritionData = {'query_text': query_text};
    console.log(nutritionData)
    await axios.post(`${nutritionHost}:${nutritionPort}/${nutritionEndpoint}`, nutritionData,)
        .then(
            resp => {
                console.log(resp.data);
                recipe['nutritions'] = resp.data['nutrition_content'];
            }
        )
        .catch(error => {
            console.log("There was an error while fetching nutritions!", error)
            recipe['nutritions'] = '573 kcal';
        })
    return recipe;
}


const { DateTime } = require('luxon');

function RecipeBody(props) {

    function ValidateInput(input) {
        if (input !== ""){
            return true
        } else {
            return false
        }
    }

    function IngredientRow(props) {

        const [isEdit, setIsEdit] = useState(false);
        const [ingAmount, setIngAmount] = useState(props.ingredient['amount']);
        const [ingUnit, setIngUnit] = useState(props.ingredient['unit']);
        const [ingName, setIngName] = useState(props.ingredient['name']);
        const [modal, setModal] = useState(false);

        const modalToggle = () => setModal(!modal);

        function handleOnClick() {
            setIsEdit(!isEdit);
        }

        function handleChange(e, setstate) {
            setstate(e.target.value);
        }

        function handleCancel(e) {
            setIngAmount(props.ingredient['amount']);
            setIngUnit(props.ingredient['unit']);
            setIngName(props.ingredient['name']);
            setIsEdit(false);
        }

        function handleSubmit(e) {
            ////
            // Reads form, creates a new Data, Validates form,
            // then sends a PUT request to update ingredient
            ////
            e.preventDefault();
            let formData = new FormData();
            formData.append('name', JSON.stringify(ingName));
            formData.append('amount', JSON.stringify(ingAmount));
            formData.append('unit', JSON.stringify(ingUnit));
            formData.append('id',JSON.stringify(props.ingredient['id']));
            formData.append('recipe', JSON.stringify(props.ingredient['recipe']));
            // console.log(...formData);

            const nameIsValid = ValidateInput(ingName);
            const amountIsValid = ValidateInput(ingAmount);
            const unitIsValid = ValidateInput(ingUnit);

            if (nameIsValid && amountIsValid && unitIsValid){
                const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
                const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
                const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

                console.log("Form validated")
                console.log("submitting form");
                axios.put(`${backendHost}:${backendPort}/${backendEndpoint}/ingredient/`, formData)
                .then(
                    resp => {
                        console.log(resp);
                        setIngName(resp.data['name']);
                        setIngAmount(resp.data['amount']);
                        setIngUnit(resp.data['unit']);
                        setIsEdit(false);
                    }
                )
                .catch(error => {console.log("There was an Error!", error)})
            } else {
                console.log("Form Not valid")
                props.setAlertVisible(true);
            }
        }

        function handleDelete(){
            ////
            // on click, opens model page to confirm deletion.
            // If confirmed sends a delete request using axios.
            ////
            const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
            const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
            const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

            axios.delete(`${backendHost}:${backendPort}/${backendEndpoint}/ingredient/${props.ingredient['id']}`)
            .then(
                resp => {
                    console.log(resp);
                    setModal(false);
                    props.revalidator.revalidate();
                }
            )
            .catch(error => {console.log("There was an error!", error)})
        }

        return (
            <>


            <Modal
                isOpen={modal}
                toggle={modalToggle}
                backdrop={true}
            >
                <ModalHeader toggle={modalToggle}>Are you sure?</ModalHeader>
                <ModalBody>
                You're about to delete the ingredient "{ingName}".<br/>Click "I'm sure" to confirm.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleDelete}>
                    I'm Sure
                </Button>{' '}
                <Button color="danger" onClick={modalToggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>


            <hr className='hr-contents' />
            <div className='ingredient-row'>
                <Row>
                    {
                    !isEdit ?
                    <>
                    <Col className='content-row'> {ingAmount} </Col>
                    <Col className='content-row'> {ingUnit} </Col>
                    <Col className='content-row'> {ingName} </Col>
                    {props.user.username === props.owner &&
                    <Col xs='2' className='edit-btn'>
                        <Button size='sm' outline onClick={handleOnClick}> Edit </Button>
                    </Col>
                    }
                    </>
                    :
                    <form onSubmit={handleSubmit}>

                        <Col className='content-row mt-2'>
                            <Input
                                value={ingAmount}
                                onChange={(e) => handleChange(e, setIngAmount)}
                                placeholder='Amount'
                            />
                        </Col>

                        <Col className='content-row'>
                            <Input
                                value={ingUnit}
                                onChange={(e) => handleChange(e, setIngUnit)}
                                placeholder='Unit'
                            />
                        </Col>

                        <Col className='content-row'>
                            <Input
                                value={ingName}
                                onChange={(e) => handleChange(e, setIngName)}
                                placeholder='Ingredient Name'
                            />
                        </Col>
                        <Row>
                            <Col className='mt-2'>
                                <Button size='sm' outline color='warning' onClick={handleCancel} className="me-2" > Cancel </Button>
                                <Button size='sm' outline color='primary' type='submit' className='me-2'> Submit </Button>
                                <Button size='sm' outline color='danger' onClick={modalToggle} > Delete </Button>
                            </Col>
                        </Row>

                    </form>
                    }
                </Row>
            </div>
            </>
        )
    };

    function IngredientsContainer(props) {
        const [isAddIng, setIsAddIng] = useState(false);
        const [newIngName, setNewIngName] = useState("");
        const [newIngAmount, setNewIngAmount] = useState("");
        const [newIngUnit, setNewIngUnit] = useState("");
        const [alertVisible, setAlertVisible] = useState(false);

        const onDismiss = () => { setAlertVisible(false) }

        function handleClick(){
            setIsAddIng(true);
        }

        function handleChange(e, setstate) {
            setstate(e.target.value);
        }

        function handleCancel(){
            setNewIngName("");
            setNewIngAmount("");
            setNewIngUnit("");
            setIsAddIng(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            let formIsValid = true
            console.log("new ingredient submitting");
            let nameIsValid = ValidateInput(newIngName)
            let amountIsValid = ValidateInput(newIngAmount)
            let unitIsValid = ValidateInput(newIngUnit)

            if (!nameIsValid){
                formIsValid = false;
            }

            if (!amountIsValid){
                formIsValid = false;
            }

            if (!unitIsValid){
                formIsValid = false;
            }

            let formData = new FormData();
            formData.append('name', newIngName);
            formData.append('amount', newIngAmount);
            formData.append('unit', newIngUnit);
            formData.append('recipe', JSON.stringify(props.recipe));

            if (formIsValid){
                console.log("New form validated!");
                const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
                const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
                const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

                axios.post(`${backendHost}:${backendPort}/${backendEndpoint}/ingredient/`, formData)
                .then(
                    resp => {
                        console.log(resp);
                        props.revalidator.revalidate();
                    }
                )
                .catch(error => {console.log("There was an error!", error)})
                setIsAddIng(false);
            } else {
                console.log("New form invalid!");
                setAlertVisible(true);
            }
            return

        }

        return(
            <Row className='ingredients-container me-2'>
                <Alert color="danger" isOpen={alertVisible} toggle={onDismiss}>
                    Looks like one or more of your fields are blank! Please check again.
                </Alert>
                <div className='body-titles' id="ingredients-title">Ingredients:</div>
                {props.ingredients.map((ingredient) => {
                    return <IngredientRow ingredient={ingredient} key={ingredient.id} user={props.user} owner={props.owner} setAlertVisable={setAlertVisible} revalidator={props.revalidator} />
                })}

                {props.user.username === props.owner && // validating that the current user is the owner
                <>
                {
                !isAddIng ? // opens or closes the form by read isAddIng state
                    <Button outline onClick={handleClick}> Add New Ingredient </Button>
                :
                    <>
                    <hr className='hr-contents'/>
                    <form className='mt-2' onSubmit={handleSubmit}>

                            <Col className='content-row mt-2'>
                                <Input
                                    placeholder='Ingredient Amount'
                                    onChange={(e) => handleChange(e, setNewIngAmount)}
                                />
                            </Col>

                            <Col className='content-row mt-2'>
                                <Input
                                    placeholder='Ingredient Unit'
                                    onChange={(e) => handleChange(e, setNewIngUnit)}
                                />
                            </Col>

                            <Col className='content-row mt-2'>
                                <Input
                                    placeholder='Ingredient Name'
                                    onChange={(e) => handleChange(e, setNewIngName)}
                                />
                            </Col>
                            <Row>
                                <Col className='mt-2'>
                                    <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2"> Cancel </Button>
                                    <Button size='sm' outline color='primary' type='submit'> Submit </Button>
                                </Col>
                            </Row>
                    </form>
                    </>
                }
                </>
                }

            </Row>
        )
    };

    function DirectionRow(props) {
        const [isEdit, setIsEdit ] = useState(false);
        const [ dirContent, setDirContent ] = useState(props.direction['content'])
        const [modal, setModal] = useState(false)

        function modalToggle(){setModal(!modal)}

        function handleClick(){
            setIsEdit(!isEdit);
        }

        function handleChange(e){
            setDirContent(e.target.value);
        }

        function handleCancel(){
            setDirContent(props.direction['content']);
            setIsEdit(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            console.log("submitting form");
            let formData = new FormData();
            formData.append('content', JSON.stringify(dirContent));
            formData.append('id', JSON.stringify(props.direction['id']));
            formData.append('recipe', JSON.stringify(props.direction['recipe']))
            console.log(...formData);
            console.log("submitting form")
            const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
            const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
            const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

            axios.put(`${backendHost}:${backendPort}/${backendEndpoint}/direction/`, formData)
            .then(
                resp => {
                    console.log(resp);
                    setDirContent(resp.data['content']);
                    setIsEdit(false);
                }
            )
            .catch(error => {console.log("There was an Error!", error)})
        }

        function handleDelete(){
            ////
            // on click, opens model page to confirm deletion.
            // If confirmed sends a delete request using axios.
            ////
            const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
            const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
            const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

            axios.delete(`${backendHost}:${backendPort}/${backendEndpoint}/direction/${props.direction['id']}`)
            .then(
                resp => {
                    console.log(resp);
                    setModal(false);
                    props.revalidator.revalidate();
                }
            )
            .catch(error => {console.log("There was an error!", error)})
        }


        return (
            <>
            <Modal
                isOpen={modal}
                toggle={modalToggle}
                backdrop={true}
            >
                <ModalHeader toggle={modalToggle}>Are you sure?</ModalHeader>
                <ModalBody>
                You're about to delete the step "{dirContent}".<br/>Click "I'm sure" to confirm.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleDelete}>
                    I'm Sure
                </Button>{' '}
                <Button color="danger" onClick={modalToggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
            <hr className='hr-contents' />
            <Row className='direction-row col-12'>
                {
                !isEdit ?
                    <>
                    <Col className='content-row'>{props.index + 1}.  {dirContent}</Col>
                    {props.user.username === props.owner &&
                    <Col xs='2' className='edit-btn'>
                        <Button size='sm' outline onClick={handleClick}> Edit </Button>
                    </Col>
                    }
                    </>
                :
                    <Col>
                        <form onSubmit={handleSubmit}>
                            <Col className='content-row'>
                                <Input
                                    value={dirContent}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Col>

                            <Row>
                                <Col className='mt-2'>
                                <Button size='sm' outline color='warning' onClick={handleCancel} className="me-2" > Cancel </Button>
                                    <Button size='sm' outline color='primary' type='submit' className='me-2'> Submit </Button>
                                    <Button size='sm' outline color='danger' onClick={modalToggle} > Delete </Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                }
            </Row>
            </>
        )
    }

    function DirectionContainer (props) {
        const [newDir, setNewDir] = useState("");
        const [isAddIng, setIsAddIng] = useState(false);
        const [alertVisible, setAlertVisible] = useState(false);

        const onDismiss = () => { setAlertVisible(false) }

        function handleClick(){
            setIsAddIng(true);
        }

        function handleChange(e) {
            setNewDir(e.target.value);
        }

        function handleCancel(){
            setNewDir("");
            setIsAddIng(false);
        }

        function handleSubmit(e){
            e.preventDefault();
            let formIsValid = true
            let dirIsValid = ValidateInput(newDir)
            let formData = new FormData()
            formData.append('content', JSON.stringify(newDir));
            formData.append('recipe', JSON.stringify(props.recipe));

            if (!dirIsValid){
                formIsValid = false;
            }

            if (formIsValid){
                console.log("New form validated!");
                const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
                const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
                const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

                axios.post(`${backendHost}:${backendPort}/${backendEndpoint}/direction/`, formData)
                .then(
                    resp => {
                        console.log(resp);
                        props.revalidator.revalidate();
                    }
                )
                .catch(error =>{console.log("There was an error!", error)})
                setIsAddIng(false);
            } else {
                console.log("New form invalid!");
                setAlertVisible(true);
            }
            return
        }

        return (
            <Row className='directions-container me-2'>
                <Alert color="danger" isOpen={alertVisible} toggle={onDismiss}>
                    Looks like one or more of your fields are blank! Please check again.
                </Alert>
                <div className='body-titles' id='directions-title'> Steps: </div>
                {props.directions.map((direction, index) =>{
                    return <DirectionRow direction={direction} index={index} key={index + 1} user={props.user} owner={props.owner} revalidator={props.revalidator} />
                })}
                {props.user.username === props.owner && // validating that the current user is the owner
                <>
                {
                !isAddIng ?
                    <Button outline onClick={handleClick}>Add New Step</Button>
                :
                    <>
                    <hr className='hr-contents'/>
                    <form className='mt-2' onSubmit={handleSubmit}>
                            <Col className='content-row'>
                                <Input
                                    placeholder='Step'
                                    onChange={(e) => handleChange(e, setNewDir)}
                                />
                            </Col>

                            <Row>
                                <Col className='mt-3'>
                                    <Button size='sm' outline color='danger' onClick={handleCancel} className="me-2">Cancel</Button>
                                    <Button size='sm' outline color='primary' type='submit'>Submit</Button>
                                </Col>
                            </Row>
                    </form>
                    </>
                }
                </>

                }

            </Row>
        )
    }

    return (
        <div className='recipe-body-wrapper p-3 m-3'>
            <div id='recipe-description'>
                {props.description}
                <hr className='hr-description' />
            </div>

            <div id='recipe-nutritions'>
                {props.nutritions}
                <hr className='hr-description' />
            </div>

            <Row className='mt-3'>
                <Col>
                    <IngredientsContainer ingredients={props.ingredients} user={props.user} owner={props.owner} recipe={props.recipe} revalidator={props.revalidator} />
                </Col>

                <Col>
                    <DirectionContainer directions={props.directions} user={props.user} owner={props.owner} recipe={props.recipe} revalidator={props.revalidator} />
                </Col>
            </Row>

        </div>
    )
}


function RecipeHeader(props) {
    const created_at = DateTime.fromISO(props.created_at).toLocaleString(DateTime.DATETIME_MED);

    return (
        <>

        <div className='recipe-header-wrapper p-3'>

            <div className='recipe-header container'>
                <Row className='d-flex flex-md-row flex-column-reverse'>
                    <Col id="recipeMeta">
                        <div className='recipe-meta'>
                            <div className='recipe-name'> {props.name} </div>
                            <div className='recipe-owner'> {props.owner} </div>
                            <div className='recipe-timestamp'> {created_at} </div>
                        </div>
                    </Col>
                    <Col align='center'>
                        <img src={props.image} alt="Recipe" id="header-img" />
                    </Col>
                </Row>
            </div>
        </div>
        </>

    )
}



export default function RecipeContainer(props){

    const recipe = useLoaderData();
    const revalidator = useRevalidator();
    let { user } = useContext(AuthContext);

    if (user == null){
        user = {'username':'guest'}
    }

    return (
    <>
    <div className='recipe-background'>
    <NavBar />
        <RecipeHeader
            name={recipe['name']}
            owner={recipe['owner']}
            created_at={recipe['created_at']}
            image={recipe['image']}

            />
        <div className="container" name="RecipeContainer">
            <RecipeBody
                description={recipe['description']}
                ingredients={recipe['ingredients']}
                directions={recipe['directions']}
                nutritions={recipe['nutritions']}
                owner={recipe['owner']}
                recipe={recipe['id']}
                user={user}
                revalidator={revalidator}
                />
        </div>
    </div>
    </>
    );
}
