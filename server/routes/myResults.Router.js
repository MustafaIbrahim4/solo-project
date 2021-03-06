const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id

    console.log('in get mine router', id);
    const queryText = `SELECT error.id,errorcode,topic,url, site, refrences, user_id, rating FROM error
JOIN url ON error.id = url.error_id WHERE user_id = $1`;
    pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});




module.exports = router;

