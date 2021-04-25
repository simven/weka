import '../App.css';
import img from '../public/quiz.png';
import React from "react";
import {Button} from "react-bootstrap";

export default function Home() {
  return (
      <div className="Home">
          <div className="jumbotron jumbotron-fluid monJumbottron1">
                  <h1 className="display-4">Bienvenue sur Weka !</h1>
                  <p>Des quiz de différents genres qui vous permettront d'accentuer votre culture tout en vous amusant</p>

                  <div className="lead">
                      <Button variant="primary" href="/quizzes" size="lg">Voir les Quiz</Button>
                  </div>
          </div>

          <div className="jumbotron monJumbottron2 row">
              <div className="col-6">
                  <img src={img} width="300" height="280" alt="Buzzer"/>
              </div>
              <div className="col-6">
                  <h4>Nos Quiz :</h4>
                  <p className="justify">
                      Premièrement sur notre application vous avez la possibilité de choisir différents thèmes, "chimie" ou "sport", pour votre quiz.
                      Dans chacun de ces thèmes, vous avez trois questions avec quatre possibilités de réponse.
                      À la fin de votre quiz, un score vous sera attribué. Aucun point ne vous sera retiré pour chaque mauvaise réponse.
                  </p>
                  <p className="justify">
                      Maintenant que vous êtes prêt, il ne vous reste plus qu'à vous amuser !
                  </p>
              </div>
          </div>
      </div>
  );
}
