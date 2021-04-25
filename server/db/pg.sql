drop schema if exists weka cascade;
create schema weka;
set search_path to weka;

create table person
(
    id_person serial primary key,
    username varchar,
    passwd varchar
);

create table Quiz
(
    id_quiz serial primary key,
	label_keyword varchar,
    label_quiz varchar,
    picture varchar
);

create table Question
(
    id_question serial primary key,
    id_quiz int,
    label_quest varchar,
    nb_points int,
    FOREIGN KEY (id_quiz) REFERENCES Quiz(id_quiz)
);

create table Response
(
    id_response serial primary key,
	id_question int,
    label_rep varchar,
    img_rep varchar,
    correct boolean,
    FOREIGN KEY (id_question) REFERENCES Question(id_question)
);

create table QuizUser
(
    id_quiz int,
	id_person int,
	score int,
	PRIMARY KEY (id_quiz, id_person),
    FOREIGN KEY (id_quiz) REFERENCES Quiz(id_quiz),
    FOREIGN KEY (id_person) REFERENCES person(id_person)
);


INSERT INTO weka.person(username, passwd) VALUES('Barrez', 'barrez');
INSERT INTO weka.person(username, passwd) VALUES('Boudali', 'boudali');
INSERT INTO weka.person(username, passwd) VALUES('Huret', 'huret');
INSERT INTO weka.person(username, passwd) VALUES('Kerkhove', 'kerkhove');
INSERT INTO weka.person(username, passwd) VALUES('Vennat', 'vennat');

INSERT INTO weka.quiz (label_keyword, label_quiz, picture) VALUES ('chimie', 'Chimie', 'chimie.png');
INSERT INTO weka.quiz (label_keyword, label_quiz, picture) VALUES ('sport', 'Sport', 'sport.png');

INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (1, 'En quoi exprime-t-on la masse molaire d''une entité chimique ?', 2);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (1, 'Au cours d''une transformation chimique :', 3);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (1, 'En quoi s''exprime une énergie ?', 2);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (1, 'Une molécule', 3);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (1, 'En quoi s''exprime une intensité ?', 2);

INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (2, 'Qui est Michael Jordan ?', 3);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (2, 'Dans quel sport emploie-t-on les termes suivants : split, spare, strike ?', 2);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (2, 'Combien dure chaque mi-temps d''un match de rugby ?', 2);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (2, 'Combien y a-t-il de joueurs sur le terrain dans une équipe de hockey sur glace ?', 2);
INSERT INTO weka.question(id_quiz, label_quest, nb_points) VALUES (2, 'Qui sont les entraîneurs de l''équipe de France de handball ?', 4);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (1, 'En mol/L', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (1, 'En mol/g', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (1, 'En g/mol', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (1, 'En L/mol', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (2, 'Des réactifs sont formés', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (2, 'Des produits sont formés', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (2, 'Des produits sont consommés', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (2, 'Des réactifs sont consommés', true);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (3, 'En joules', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (3, 'En watts', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (3, 'En volts', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (3, 'En ohm', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (4, 'Est constitué de plusieurs atomes', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (4, 'Est chargé négativement', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (4, 'N''est pas chargé électriquement', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (4, 'Est chargé positivement', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (5, 'En joules', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (5, 'En watts', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (5, 'En amperes', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (5, 'En ohm', false);


INSERT INTO weka.response (id_question, label_rep, correct) VALUES (6, 'Un basketteur', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (6, 'Un acteur', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (6, 'Un français', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (6, 'Un joueur en salle', true);

INSERT INTO weka.response (id_question, label_rep, img_rep, correct) VALUES (7, 'Pétanque', 'petanque.jpg', false);
INSERT INTO weka.response (id_question, label_rep, img_rep, correct) VALUES (7, 'Billard', 'billard.jpg', false);
INSERT INTO weka.response (id_question, label_rep, img_rep, correct) VALUES (7, 'Bowling', 'bowling.jpg', true);
INSERT INTO weka.response (id_question, label_rep, img_rep, correct) VALUES (7, 'Bille', 'bille.jpg', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (8, '35', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (8, '40', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (8, '45', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (8, '50', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (9, '6', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (9, '7', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (9, '8', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (9, '9', false);

INSERT INTO weka.response (id_question, label_rep, correct) VALUES (10, 'Christian Gourcuff', false);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (10, 'Olivier Krumbholz', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (10, 'Didier Dinard', true);
INSERT INTO weka.response (id_question, label_rep, correct) VALUES (10, 'Jose Mourinho', false);

INSERT INTO weka.quizuser (id_quiz, id_person, score) VALUES (1, 1, 0);
INSERT INTO weka.quizuser (id_quiz, id_person, score) VALUES (1, 2, 0);
INSERT INTO weka.quizuser (id_quiz, id_person, score) VALUES (2, 3, 0);
INSERT INTO weka.quizuser (id_quiz, id_person, score) VALUES (2, 4, 0);
INSERT INTO weka.quizuser (id_quiz, id_person, score) VALUES (2, 5, 0);
