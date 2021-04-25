const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = require('./auth.js')();
const cfg = require('./config.js');
const db = require('./db/pg');
const { faNotEqual } = require("@fortawesome/free-solid-svg-icons");
const saltRounds = 10;

const router = express.Router();

router
    .use(auth.initialize())

    .post("/signup", async (req, res) => {
        try {
            const result = await db.query('select * from person where username = $1', [req.body.username]);
            if (result && result.rows && result.rows[0])
            {
                return res.status(400).send({message:"username deja pris"});
            }
            const hashedPasswd = await bcrypt.hash(req.body.passwd, saltRounds)
            await db.query(
                'insert into person(username,passwd) values($1,$2) returning id_person',
                [req.body.username, hashedPasswd]
            );
            return res.sendStatus(201);
        } catch (err) {
            console.error("ERROR SIGNUP", err);
            res.sendStatus(401);
        }
    })

    .post("/login", async(req,res) => {

        console.log(req.body);
        const {username , passwd } = req.body;
        if(!username || !passwd) {return res.sendStatus(400);}

        const user = await db.query('select * from person where username = $1',[username])
        if (!user || !user.rows || !user.rows[0]) {
            return res.sendStatus(401);}

        const isPasswdValid = await bcrypt.compare(passwd,user.rows[0].passwd)
        if(!isPasswdValid) {return res.sendStatus(401);}

        const userToken = await jwt.sign({id : user.rows[0].id_person}, cfg.jwtSecret,{expiresIn:'7d'})
        res.send({userToken});

    })

    .get("/me",auth.authenticate(),async(req,res)=>{
        const [,token] = req.headers.authorization.split("Bearer ")
        const decodedToken = jwt.decode(token);
        const user = await db.query('select username,id_person from person where id_person = $1',[decodedToken.id]);
        if (!user || !user.rows || !user.rows[0]) {
            return res.sendStatus(401);
        }
        res.send({me:user.rows[0]});
    })

    .post("/create", auth.authenticate(), async(req,res)=>{
        const {label_keyword,label_quiz,questions} = req.body;
        if(!label_keyword || !label_quiz || !questions ) {return res.sendStatus(400);}

        const insertQuiz = await db.query('insert into quiz (label_keyword,label_quiz) VALUES($1,$2) RETURNING id_quiz',[label_keyword,label_quiz]);
        console.log(insertQuiz);
        const id_quiz = insertQuiz.rows[0].id_quiz;
        //await db.query('insert into question (id_quiz,label_question) VALUES($1,$2)',[id_quiz,motclef]);

        await Promise.all(
            questions.map(async (question) => {
                const insertQuestion = await db.query('insert into question (id_quiz,label_quest,nb_points) VALUES ($1,$2,$3) RETURNING id_question',[id_quiz,question.label_question,question.nb_points]);
                const id_question = insertQuestion.rows[0].id_question;

                await Promise.all(
                    question.reponses.map( async (reponse) => {
                        await db.query('insert into response (id_question,label_rep,correct) VALUES ($1,$2,$3)',[id_question,reponse.label_rep,reponse.correct]);
                    })
                )
            })
        );
        res.sendStatus(201);

    })

    .get("/", (req, res) => {
        res.json("Bienvenue sur Weka une application de Quizz Tah Lewandowski !");
    })



    // retourne tous les quiz en base de données
    .get('/quizzes', async (req, res) => {
        const result = await db.query('select * from quiz');
        res.json(result.rows);
    })

    // retourne une table contenant le quiz donnée en paramètre
    // avec ses questions et les différentes possibilité de réponses
    .get('/quiz/:id', async (req, res) => {
        const result = await db.query('select * from quiz inner join question on quiz.id_quiz=question.id_quiz inner join response on question.id_question=response.id_question where quiz.id_quiz=$1', [req.params.id]);
        res.json(result.rows);
    })

    .get('/quiz/:quizId/countQuestions/', async (req, res) => {
        const result = await db.query('select count(*) from quiz inner join question on quiz.id_quiz=question.id_quiz where quiz.id_quiz=$1', [req.params.quizId]);
        res.json(result.rows);
    })

    // retourne une table contenant les questions du quiz donnée en paramètre
    .get('/quiz/:quizId/questions/', async (req, res) => {
        const result = await db.query('select question.* from quiz inner join question on quiz.id_quiz=question.id_quiz where quiz.id_quiz=$1 limit 3', [req.params.quizId]);
        res.json(result.rows);
    })


    // retourne une table contenant les réponses du quiz donnée en paramètre
    .get('/quiz/:quizId/responses/', async (req, res) => {
        const result = await db.query('select response.* from response inner join question on response.id_question=question.id_question inner join quiz on question.id_quiz=quiz.id_quiz where quiz.id_quiz=$1 limit 12', [req.params.quizId]);
        res.json(result.rows);
    })

    // retourne une table contenant les questions du quiz donnée en paramètre (utilisateur connecté)
    .get("/quiz/:quizId/questionsLogin", auth.authenticate(), async(req,res) => {
        const result = await db.query('select question.* from quiz inner join question on quiz.id_quiz=question.id_quiz where quiz.id_quiz=$1', [req.params.quizId]);
        res.json(result.rows);
    })

    // retourne une table contenant les réponses du quiz donnée en paramètre (utilisateur connecté)
    .get("/quiz/:quizId/responsesLogin", auth.authenticate(), async(req,res) => {
        const result = await db.query('select response.* from response inner join question on response.id_question=question.id_question inner join quiz on question.id_quiz=quiz.id_quiz where quiz.id_quiz=$1', [req.params.quizId]);
        res.json(result.rows);
    })


    // retourne une table contenant les id des réponses correctes avec le numéro de la question
    .get('/quiz/:quizId/correctResponses', async (req, res) => {
        const result = await db.query('select response.id_response, response.id_question from quiz inner join question on quiz.id_quiz=question.id_quiz inner join response on question.id_question=response.id_question where quiz.id_quiz=$1 and response.correct=true', [req.params.quizId]);
        res.json(result.rows);
    })

    // retourne une table contenant les réponses de la question donnée en paramètre
    .get('/quiz/:quizId/:questionId/', async (req, res) => {
        const result = await db.query('select response.* from quiz inner join question on quiz.id_quiz=question.id_quiz inner join response on question.id_question=response.id_question where quiz.id_quiz=$1 and response.id_question=$2', [req.params.quizId, req.params.questionId]);
        res.json(result.rows);
    })

    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

module.exports = router;
