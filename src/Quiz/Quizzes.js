import  "./Quizzes.css";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "@reach/router";
import {Button, InputGroup, FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [filterText, setFilterText] = useState(new RegExp(""));

    useEffect(() => {
        getQuizzes();
    }, []);

    async function getQuizzes() {
        let data = [];
        try {
            data = (await axios.get('http://localhost:8000/quizzes')).data;
        } catch (err) {
            alert(err);
        } finally {
            setQuizzes(data);
        }
    }

    const imgStyle = {marginLeft: '1em'};
    return (
        <div>
            <h1 className="p-4">Les Quiz</h1>

            <InputGroup size="default" className="w-25 my-0 mx-auto">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm"><FontAwesomeIcon icon="search"/></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className={"input"} aria-label="search" type="text" onChange={e => setFilterText(new RegExp(e.target.value))}/>
            </InputGroup>

            <div className={"py-5"}>
                {quizzes
                    .filter(q => filterText.test(q.label_keyword))
                    .map(q =>
                    <Link to={"/quiz/"+q.id_quiz} className="px-3" key={q.id_quiz}>
                        <Button type="button" variant="primary" size="lg">
                            {q.label_quiz}
                            {q.picture !== null && <img width="100" height="100" src={'http://localhost:8000/img/' + q.picture} style={imgStyle}/>}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
