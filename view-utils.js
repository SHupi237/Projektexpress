const createHeader = (isLogged, color = '#319AF5', isAdmin = false) => {
    let subHeader = '';
    if (isAdmin) {
        subHeader += `<section class="menu menu-yellow">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
        </section>`;
    }
    return `<section class="menu" style="background-color: ${color}">
        <a href="/">main</a>
        <a href="/rejestracja">rejestracja</a>
        <a href="/login">login</a>
        <a href="/admin">admin</a>
        ${isLogged ? '<a href="/logout">logout</a>' : ''}
    </section>
    ${subHeader}`;
}

const wrapHtml = (html) => `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serwer</title>
    <link rel="stylesheet" href="/css/style.css">
    <script>
        window.addEventListener('load', () => {
            document.querySelectorAll('.sortButton').forEach(button => {
                button.addEventListener('change', e => {
                    document.getElementById('sortForm').submit();
                });
            });
        });
    </script>
</head>
<body>
    ${html}
</body>
</html>`;

const createRegisterForm = () => `<form method="POST" action="/rejestracja">
    <ul>
        <li>
            <label for="login">Login </label>
            <div>
                <input id="login" name="login" type="text" maxlength="255" value="">
            </div> 
        </li>
        <li>
            <label for="password">Password </label>
            <div>
                <input id="password" name="password" type="text" maxlength="255" value=""> 
            </div> 
        </li>
        <li>
            <label class="description" for="wiek">Wiek </label>
            <div>
                <input id="wiek" name="wiek" type="text" maxlength="255" value=""> 
            </div> 
        </li>
        <li>
            <label class="description" for="element_4">Uczeń</label>
            <span>
                <input id="uczen" type="checkbox" name="uczen" value="tak">
                <label for="uczen">tak</label>
            </span> 
        </li>
        <li>
            <label for="plec">Płeć</label>
            <span>
                <input id="kobieta" type="radio" name="plec" value="kobieta">
                <label for="kobieta">Kobieta</label>
                <input id="mezczyzna" name="plec" type="radio" value="mezczyzna">
                <label for="mezczyzna">Mężczyzna</label>
            </span> 
        </li>
        <li>
            <input type="submit" name="submit" value="Zarejestruj">
        </li>
    </ul>
</form>`;

const loging = () => `<form method="POST" action="/login">
    <ul>
        <li>
            <label for="login">Login </label>
            <div>
                <input id="login" name="login" type="text" maxlength="255" value="">
            </div> 
        </li>
        <li>
            <label for="password">Password </label>
            <div>
                <input id="password" name="password" type="text" maxlength="255" value=""> 
            </div> 
        </li>
        <li>
        <input type="submit" name="submit" value="Zaloguj sie">
    </li>
</ul>
</form>`;

const createBlackHeader = () => {
    return `<section class="menu menu-black">
            <a href="/sort">sort</a>
            <a href="/gender">gender</a>
            <a href="/show">show</a>
        </section>
        <style>
            body {
                background-color: #000;
            }
        </style>`;
}

const createShowTable = (users, sortMode = false, sortParam = 'rosnaco') => {
    let tableCell = ' ';
    for (let i = 0; i < users.length; i++) {
        tableCell += `<tr>
            <td>id: ${users[i].id}</td>
            <td>login: ${users[i].login} - ${users[i].password}</td>
            <td>uczen: ${users[i].uczen}</td>
            <td>wiek: ${users[i].wiek}</td>
            <td>plec: ${users[i].plec}</td>
        </tr>`;
    }
    let sortPart = `<form id="sortForm" method="POST" action="/sort">
        <span>
            <input class="sortButton" id="rosnaco" type="radio" name="sort" value="rosnaco" ${sortParam === 'rosnaco' ? 'checked' : ''}>
            <label for="rosnaco" style="color: #fff;">rosnąco</label>
            <input class="sortButton" id="malejaco" name="sort" type="radio" value="malejaco" ${sortParam === 'malejaco' ? 'checked' : ''}>
            <label for="malejaco" style="color: #fff;">malejąco</label>
        </span>
    </form>`;
    return `
        ${sortMode ? sortPart : ''}
        <table class="table">
            ${tableCell}    
        </table>`;
}

const createGenderTable = (users) => {
    let tableRow = ' ';
    for (let i = 0; i < users.length; i++) {
        tableRow += `<tr>
            <td>id: ${users[i].id}</td>
            <td>plec: ${users[i].plec}</td>
        </tr>`;
    }
    return `<table class="table">
        ${tableRow}
    </table>`;
}

exports.createHeader = createHeader;
exports.wrapHtml = wrapHtml;
exports.createRegisterForm = createRegisterForm;
exports.loging = loging;
exports.createShowTable = createShowTable;
exports.createBlackHeader = createBlackHeader;
exports.createGenderTable = createGenderTable;