import React, {useCallback, useState} from "react";

//Components and Styling
import NavBar from "./navbar";
import {Button, Input, Card, CardImg, CardImgOverlay, CardTitle, CardText, Row, Col } from 'reactstrap'
import './home.css'

//Routing and Request
import {useLoaderData, useNavigate} from 'react-router-dom'
import axios from "axios";




export const homeLoader = async () => {
    const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'http://localhost';
    const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
    const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'api';

    const results = await axios.get(`${backendHost}:${backendPort}/${backendEndpoint}/recents`)
    .catch(function (error){
        console.log('Error', error.message);
    }); 
    const recipes = results.data;
    console.log(recipes);
    return recipes;
}

function SearchBarContainer() {
    const navigate = useNavigate();
    const [initialName, setInitialName] = useState('')

    function onChange(e){setInitialName(e.target.value)}

    function handleClick(){
        navigate('/RecipeCreate', {state:{'initialName':initialName}})
    }
    
    return (
        <div className="flex">
            <Row>
                <Col xl="6">
                    <Input className="home-input mt-3" onChange={onChange} placeholder="Start creating a new recipe by typing a name!" />
                    <Button className="home-btn mt-3 mb-3" color="primary" onClick={handleClick}> Create a Recipe now! </Button>
                </Col>
            </Row>
            
        </div>
    )
}

function HeaderTitleContainer() {
    
    return (
        <div className="headerTitle mt-3">
            <Row>
                <Col xl="6">
                    <div className="title-container">
                        MasterRecipe
                    </div>

                    <div className="undertitle-container">
                        Recipes <span style={{color:"#ff6700"}}>Made</span> Easy
                    </div>

                    <div className="tradeline-container">
                        {"Specially made for the cook in you. MasterRecipe is the best place to store and share your beloved recipes. You can keep them for yourself or share them with the world!"}
                    </div>
                </Col> 
            </Row>
            
        </div>
    )
}

function HeaderSection(){

    return(
        <div className="container">
            <div className="header-section d-flex flex-column justify-content-center">       
                <HeaderTitleContainer />
                <SearchBarContainer />
            </div> 
        </div>
        
    )
}


function GalleryCard(props) {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate(`/Recipe/${props.recipe.id}`, {replace:true}),[navigate]);
    return (
        <Col className="card-column"  md="12" xl="4">
            <Card className="gallery-card" onClick={handleOnClick}>
                <CardImg
                    alt="card image"
                    src={props.recipe.image}
                    className="card-img"
                />
                <CardImgOverlay>
                    <CardTitle>
                        {props.recipe.name}
                    </CardTitle>
                    <CardText>
                        <small>
                            &nbsp; {/* by: {props.recipe.owner} */}
                        </small>
                    </CardText>
                </CardImgOverlay>
            </Card>
        </Col>

    )
}


function GalleryContainer(props) {

    let cards = []

    for(let i = 0; i < 3; i++){
        cards.push(<GalleryCard />);
    }   
    
    return (
            <Row className="gallery-row d-flex flex-xl-nowrap justify-content-around">
                {props.recipes.map(recipe => {
                    return <GalleryCard  recipe={recipe} key={recipe.name} />
                })}
            </Row> 
    )
}


function GallerySection(props) {
    
    return(
        <div className="gallery-container p-3 mt-3 ms-3 me-4">
            <GalleryContainer recipes={props.recipes}/>   
        </div>
    )

}


export default function HomePage() {

    const recipes = useLoaderData();

    return ( 
        <div className='home-background'>
            <div className="home-page">
                <NavBar />
                <HeaderSection />
                <GallerySection recipes={recipes} />
            </div>
        </div> 
    )
}