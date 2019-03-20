const express = require('express');

const app = express();

app.get('/api', function (req, res, next) {
    const test = [
        {test: 'OK Connected backend'}
     ];
    res.json(test);
});


app.listen(8080, function () {
    console.log('Listening');
}
)