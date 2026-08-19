const express = require('express');
const app = express();
app.use(express.static('public/games/space-shooter'));
app.listen(8080, () => console.log('Listening on 8080'));
