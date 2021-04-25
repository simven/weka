import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "@reach/router";
import {Button, Form, Accordion, Card, Row, Col} from "react-bootstrap";
import { authContext } from "../Context/authContext";
import './FormQuizz.css';

export default function Login(props) {
    const [user,setUser] = useContext(authContext);
    const navigate = useNavigate();
    const [quizForm,setQuizForm] = useState(
    {
        label_keyword: "",
        label_quiz: "",
        questions: [
            {
                label_question:"",
                nb_points: 0,
                reponses: [
                    {
                        label_rep: "",
                        correct: false
                    }
                ]
            }
        ]
    });
    const handleSummitForm = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/create", quizForm);
            navigate("/")
        }catch(error){
            console.log(error);
        }
    }
    const handleAddQuestion = () => {
        setQuizForm({
            ...quizForm,
            questions: [
                ...quizForm.questions,
                {
                    label_question:"",
                    nb_points: 0,
                    reponses: [
                        {
                            label_rep: "",
                            correct: false
                        }
                    ]
                }
            ]
        })
    }

    const handleAddReponse = (indexQuestion) => {
        const questions = [...quizForm.questions];
        questions[indexQuestion].reponses.push(
            {
                label_rep: "",
                correct: false
            }
        );
        
        setQuizForm({
            ...quizForm,
            questions
        })
    }
    
    const handleQuizValuesChange = (e) => {
        setQuizForm({...quizForm, [e.target.name]:e.target.value});
    };
    const handleQuizQuestionValueChange = (e, indexQuestion) => {
        const questions = [...quizForm.questions];
        questions.splice(indexQuestion, 1 , {...quizForm.questions[indexQuestion], [e.target.name]:e.target.value})
        setQuizForm({...quizForm, questions});
    };
    const handelQuizQuestionResponseValueChange = (e, indexQuestion, indexReponse) => {
        console.log(e.target.checked);
        const questions = [...quizForm.questions];
        const reponses = [...questions[indexQuestion].reponses];
        reponses.splice(indexReponse, 1, {...reponses, [e.target.name]: e.target.value})
        reponses.splice(indexReponse, 1 , {...questions[indexQuestion].reponses[indexReponse], ...(e.target.name === "correct" ? {[e.target.name]: e.target.checked} :{[e.target.name]: e.target.value})})
        Object.assign(questions[indexQuestion], {reponses})
        setQuizForm({...quizForm, questions});
    }
    return (
        <div class="form-quiz-container">
            <Form className="form-quiz" onSubmit={handleSummitForm}>
                <h3>Créer un Quiz</h3>
                <Form.Group >
                    <Form.Label>Label du quiz</Form.Label>
                    <Form.Control name="label_quiz" onChange={handleQuizValuesChange} value={quizForm.label_quiz} type="text" placeholder="label du Quiz" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mot-clé du quiz</Form.Label>
                    <Form.Control name="label_keyword" onChange={handleQuizValuesChange} value={quizForm.label_keyword} type="text" placeholder="Mot clé" />
                </Form.Group>
                <Button  className="button" onClick={handleAddQuestion}>Ajouter une question</Button>
                <Button variant="success" className="form-submit-btn" type="submit">Envoyer</Button>
                <Accordion >
                {quizForm.questions.map((question, indexQuestion) => (
                    <React.Fragment key={indexQuestion}>
                        <Card className = "cardEdit">
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={indexQuestion + 1}>
                                Question n°{indexQuestion + 1}
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={indexQuestion + 1}>
                            <>
                                <Row>
                                    <Col>
                                        <Form.Control onChange={(e) => handleQuizQuestionValueChange(e, indexQuestion)} value={question.label_question} name="label_question" placeholder="Label de la question" className ="question"/>
                                    </Col>
                                    <Col>
                                        <Form.Control type="number" onChange={(e) => handleQuizQuestionValueChange(e, indexQuestion)} value={question.nb_points} name="nb_points" placeholder="Nombre de point" className ="question" />
                                    </Col>
                                </Row>
                                <h3>Réponses</h3>
                                {question.reponses.map((reponse, indexReponse) => (
                                    <React.Fragment key={indexReponse}>
                                        <Row>
                                            <Col>
                                                <Form.Control onChange={(e) => handelQuizQuestionResponseValueChange(e, indexQuestion, indexReponse)} value={reponse.label_rep} name="label_rep" placeholder="Label de la réponse" className = "reponse"/>
                                            </Col>
                                            <Col>
                                                <Form.Check type="checkbox" onChange={(e) => handelQuizQuestionResponseValueChange(e, indexQuestion, indexReponse)} value={reponse.correct} name="correct" inline label="Est la bonne réponse"  className = "" />
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Button className = "button" onClick={() =>handleAddReponse(indexQuestion)}>Ajouter une réponse</Button>
                            </>
                            </Accordion.Collapse>
                        </Card>
                    </React.Fragment>
                ))}
                </Accordion>
            </Form>
        </div>
    );
}
