const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createHeader, wrapHtml, createRegisterForm, loging, createShowTable, createBlackHeader,createGenderTable } = require('./view-utils');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let currentUserId = 5;
const users = [
    {id: 1, login: '111', password: '111', wiek: '23', plec: 'mezczyzna', uczen: true },
    {id: 2, login: '222', password: '222', wiek: '30', plec: 'kobieta', uczen: true },
    {id: 3, login: '333', password: '333', wiek: '12', plec: 'mezczyzna', uczen: true },
    {id: 4, login: '444', password: '444', wiek: '18', plec: 'kobieta', uczen: true }
];
const loggedUsers = {};

app.get("/", function (req, res) {
    html = '';
    html += createHeader(isLogged(req));
    html += '<h1>main page</h1>';
    sendResponse(res, html);
});

app.get("/rejestracja", function (req, res) {
    html = '';
    html += createHeader(isLogged(req));
    html += '<h1>rejestracja</h1>';
    html += createRegisterForm();
    sendResponse(res, html);
});

app.post("/rejestracja", function (req, res) {
    users.push({
        id: currentUserId,
        login: req.body.login,
        password: req.body.password,
        wiek: req.body.wiek,
        plec: req.body.plec,
        uczen: typeof req.body.uczen === 'undefined' ? false : true
    });
    currentUserId++;

    html = '';
    html += createHeader(isLogged(req));
    html += '<h1>rejestracja</h1>';
    html += createRegisterForm();
    sendResponse(res, html);
});

app.get("/admin", function (req, res) {
    html = '';
    if (isLogged(req)) {
        html += createHeader(isLogged(req), '#319AF5', true);
        html += '<h1>admin page</h1>';
    } else {
        html += createHeader(isLogged(req), '#EB1100', false);
        html += '<h1>brak dostępu do tej strony</h1>';
    }
    sendResponse(res, html);
});

app.get("/login", function (req, res) {
    html = '';
    html += createHeader(isLogged(req));
    html += loging();
    sendResponse(res, html);
});

app.post("/login", function (req, res) {
    const matchedUsers = users.filter(user => user.login === req.body.login && user.password === req.body.password);
    if (matchedUsers.length > 0) {
        const sessionId = create_UUID();
        res.cookie('sessionId', sessionId, { maxAge: 604800, httpOnly: true });
        loggedUsers[sessionId] = matchedUsers[0];
        res.redirect('/admin');
    } else {
        html = '';
        html += createHeader(false);
        html += '<h2>Nie zalogowano.</h2>';
        html += loging();
        sendResponse(res, html);
    }
});

app.get("/logout", function (req, res) {
    delete loggedUsers[req.cookies.sessionId];
    res.redirect('/');
});

app.get("/show", function (req, res) {
    html = '';
    html += createBlackHeader();
    html += createShowTable(users);
    sendResponse(res, html);
});

app.get("/sort", function (req, res) {
    html = '';
    html += createBlackHeader();
    const sortedUsers = users.map(user => user).sort(sortUsersAsc);
    html += createShowTable(sortedUsers, true);
    sendResponse(res, html);
});

app.post("/sort", function (req, res) {
    const sortFunction = req.body.sort === 'rosnaco' ? sortUsersAsc : sortUsersDesc;
    html = '';
    html += createBlackHeader();
    const sortedUsers = users.map(user => user).sort(sortFunction);
    html += createShowTable(sortedUsers, true, req.body.sort);
    sendResponse(res, html);
});

app.get("/gender", function (req, res) {
    html = '';
    html += createBlackHeader();
    
    const genderObject = {
        'mezczyzna': [],
        'kobieta': []
    };

    users.forEach(user => genderObject[user.plec].push(user));
    html+=createGenderTable(genderObject.mezczyzna);
    html+=createGenderTable(genderObject.kobieta);
    
    sendResponse(res, html);
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});

function sendResponse(res, html) {
    res.send(wrapHtml(html));
}

//Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function isLogged(req) {
    if (typeof loggedUsers[req.cookies.sessionId] != 'undefined') {
        return true;
    }
    return false;
}

function sortUsersAsc(user1, user2) {
    if (user1.wiek > user2.wiek) {
        return 1;
    } else if (user1.wiek === user2.wiek) {
        return 0;
    } else {
        return -1;
    }
}

function sortUsersDesc(user1, user2) {
    if (user1.wiek > user2.wiek) {
        return -1;
    } else if (user1.wiek === user2.wiek) {
        return 0;
    } else {
        return 1;
    }
}
