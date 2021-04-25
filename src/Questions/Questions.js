import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import { authContext } from "../Context/authContext";


export default function Questions(props) {
    const [user,setUser] = useContext(authContext);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreMax, setScoreMax] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [correctResponses, setCorrectResponses] = useState([]);
    const [userResponses, setUserResponses] = useState([]);
    const [dataSubmit, setDataSubmit] = useState({});
    const { handleSubmit, register } = useForm();
    const end = indexQuestion === questions.length-1;
    const maxQuestionLogged = questions.length;
    const maxQuestionUnlogged = 3;
    let nextButton;

    const onSubmit = data => {
        if (userResponses.indexOf(data.value_name) !== -1 && data.value_name !== false) {
            userResponses.push(false);
        }
        if(userResponses.indexOf(data.value_name) === -1 || data.value_name === false) {
            userResponses.push(data.value_name);
        }
        setDataSubmit(data);

        if((user.isLoggedIn && indexQuestion >= maxQuestionLogged) || (!user.isLoggedIn && indexQuestion >= maxQuestionUnlogged)) {
            getScoreUser();
            getScoreMax();
        }

    };

    useEffect(() => {
        if (user.isLoggedIn) {
            getQuestionsQuizLogin(props.quizId);
            getResponsesQuizLogin(props.quizId);
        } else {
            getQuestionsQuiz(props.quizId);
            getResponsesQuiz(props.quizId);
        }
        getCorrectResponses(props.quizId);
    }, []);

    async function getQuestionsQuizLogin(id) {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quiz/'+id+'/questionsLogin/')).data;
        } catch (err) {
            alert(err);
        } finally {
            setQuestions(data);
        }
    }

    async function getResponsesQuizLogin(quizId) {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quiz/'+quizId+'/responsesLogin/')).data;
        } catch (err) {
            alert(err);
        } finally {
            setResponses(data);
        }
    }

    async function getQuestionsQuiz(id) {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quiz/'+id+'/questions/')).data;
        } catch (err) {
            alert(err);
        } finally {
            setQuestions(data);
        }
    }

    async function getResponsesQuiz(quizId) {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quiz/'+quizId+'/responses')).data;
        } catch (err) {
            alert(err);
        } finally {
            setResponses(data);
        }
    }

    async function getCorrectResponses(quizId) {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quiz/'+quizId+'/correctResponses')).data;
        } catch (err) {
            alert(err);
        } finally {
            setCorrectResponses(data);
        }
    }

    function handleClick(x) {
        const change = indexQuestion + x;
        if (change < 0) {
            setIndexQuestion(indexQuestion);
        }
        else {
            setIndexQuestion(change);
        }
    }

    function onPrevious() {
        userResponses.pop()
        setUserResponses(userResponses);
    }

    function getScoreUser() {
        const counts = {};
        let isCorrectResp = false;
        let isQuestAlreadyFound = false;
        let correctResponsesCopy = [...correctResponses];
        let idQuestUnique = [];
        let idQuestAlreadyProcessed = [];
        let correctResponsesQuestions = {
            responses : [],
            question : []
        };
        let res = 0;

        for (const cR of correctResponsesCopy) {
            for (const idQ of idQuestUnique) {
                isQuestAlreadyFound = cR.id_question === idQ.id_question;
            }
            if (!isQuestAlreadyFound) {
                idQuestUnique.push(cR);
            }

            const num = cR.id_question;
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        for (const idQ of idQuestUnique) {
            if (idQuestAlreadyProcessed.indexOf(idQ.id_question) === -1) {
                if (counts[idQ.id_question] > 1) {
                    let multipleResponses = [];
                    for (const cR of correctResponsesCopy) {
                        if (cR.id_question === idQ.id_question) {
                            multipleResponses.push((cR.id_response).toString());
                        }
                    }
                    (correctResponsesQuestions.responses).push(multipleResponses);
                    (correctResponsesQuestions.question).push(idQ.id_question);
                } else {
                    (correctResponsesQuestions.responses).push(new Array((idQ.id_response).toString()));
                    (correctResponsesQuestions.question).push(idQ.id_question);
                }
                idQuestAlreadyProcessed.push(idQ.id_question);
            }
        }

        for (let i = 0; i < userResponses.length; i++) {
            for (let j = 0; j < userResponses[i].length; j++) {
                if (userResponses[i].length !== correctResponsesQuestions.responses[i].length) {
                    isCorrectResp = false;
                } else {
                    isCorrectResp = userResponses[i][j] === correctResponsesQuestions.responses[i][j];
                }
            }
            if (isCorrectResp === true) {
                let nb_points;
                for(const q of questions) {
                    if (q.id_question === correctResponsesQuestions.question[i]) {
                        nb_points = q.nb_points;
                    }
                }
                res += nb_points;
            }
        }

        setScore(res);
    }

    function getScoreMax() {
        let max_points = 0;
        for (const q of questions) {
            max_points += q.nb_points;
        }
        setScoreMax(max_points);
    }

    if (end) {
        nextButton = <Button variant="success" onClick={() => handleClick(1)} type={"submit"}>Terminer</Button>
    }
    else if ((user.isLoggedIn && indexQuestion !== maxQuestionLogged) || (!user.isLoggedIn && indexQuestion !== maxQuestionUnlogged)) {
        nextButton = <Button variant="primary" onClick={() => handleClick(1)} type={"submit"}>Suivant</Button>
    }
    else {
        nextButton = <Button hidden type={"submit"}>fin</Button>
    }

    const imgStyle = {marginLeft: '1em', marginRight: '1em'};

    return (
        <div>
            <h1 className="p-4">Les Questions</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                {questions[indexQuestion] &&
                    <div>
                        <h4>{questions[indexQuestion].label_quest}</h4>
                        {responses.map(r =>
                            <div key={r.id_response}>
                                {r.id_question === questions[indexQuestion].id_question &&
                                    <label>
                                        {r.img_rep != null
                                            ? <img width="200" height="150" src={'http://localhost:8000/img/' + r.img_rep} alt={r.img_rep} style={imgStyle}/>
                                            : r.id_question === questions[indexQuestion].id_question && r.label_rep + " "
                                        }
                                        <input
                                            value={r.id_response}
                                            type="checkbox"
                                            {...register('value_name')}
                                        />
                                    </label>
                                }
                            </div>
                        )}
                    </div>
                }
                {((user.isLoggedIn && indexQuestion === maxQuestionLogged) || (!user.isLoggedIn && indexQuestion === maxQuestionUnlogged)) &&
                    <div>
                        <div>
                            <h2>Mon score</h2>
                            <h3>{score}/{scoreMax}</h3>
                        </div>
                        <div className="p-3">
                            <Button variant="primary" href="/quizzes" size="lg">Retourner aux Quiz</Button>
                        </div>
                    </div>
                }
                {indexQuestion > 0 && ((user.isLoggedIn && indexQuestion < maxQuestionLogged) || (!user.isLoggedIn && indexQuestion < maxQuestionUnlogged)) &&
                    <Button variant="primary" onClick={() => {handleClick(-1); onPrevious()}}>Précédent</Button>
                }{" "}
                {nextButton}
            </form>
        </div>
    );
}
