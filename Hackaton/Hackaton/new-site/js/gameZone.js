var formCount = 2;
var formsContainer = document.getElementById("formsContainer");
var Player1;
var Player2;
var formData = [];
var playedData = [];
var wordData = ["Legal", "Moral", "Anormal", "Local", "Hospital", "Animal", "Social", "Musical", "Comercial", "Regional", "Original", "Nacional", "Tropical", "Central", "Racional", "Carnaval", "Cultural", "Sensacional", "Fácil", "Brasil", "Azul", "Anil", "Gentil", "Abril", "Subtil", "Infantil", "Aquilo", "Civil", "Difícil", "Perfil", "Projétil", "Réptil", "Textil", "Útil", "Viril", "Amar", "Andar", "Cantar", "Falar", "Jantar", "Nadar", "Ligar", "Chegar", "Dançar", "Jogar", "Chamar", "Trabalhar", "Pescar", "Sonhar", "Pensar", "Estar", "Passear", "Encontrar", "Esperar", "Sol", "Papel", "Farol", "Bolo", "Espelho", "Caracol", "Lençol", "Tijolo", "Pincel", "Andebol", "Controlo", "Jornal", "Parolo", "Pistola”, “Sol", "Sair", "Ir", "Partir", "Dividir", "Despir", "Conseguir", "Cumprir", "Medir", "Inserir", "Fingir", "Adquirir", "Curtir", "Resumir", "Assistir", "Distribuir", "Influenciar"];
var firstTime = true;
var firstPlayer = true;

function createNewForm() {
    if (formCount < 8) {
        var formsContainer = document.getElementById("formsContainer");
        var newForm = document.createElement("form");
        newForm.innerHTML = `
        <label for="name${formCount + 1}"><b>Name:</b></label>
        <input class="form-control form-control-lg" type="text" id="name${formCount + 1}" name="name${formCount + 1}" minlength="3" maxlength="20" required
            style="width: 400px"><br>`;

        formsContainer.appendChild(newForm);
        formCount++;
    }
}

function submitAllForms() {

    var forms = document.getElementsByTagName("form");
    for (var i = 0; i < forms.length; i++) {
        var inputs = forms[i].getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {

            if (inputs[j].value === undefined ||
                inputs[j].value === null ||
                inputs[j].value === "") {
                window.location.href = "playerForm.html";
                alert("All need a name!!! Stop being lazy! You fucker >:c");
                return;
            }

            var randomImg = Math.ceil(Math.random() * 10);
            var imgPath = "/new-site/img/" + randomImg + ".png";

            console.log(inputs[j].value);

            formData.push({
                id: i + 1,
                name: inputs[j].value,
                img: imgPath,
                score: 0,
                played: false
            });
        }
    }

    console.log(formData);
    var formsContainer = document.getElementById("formsContainer");


    for (var i = 0; i < formData.length; i++) {
        var newForm = document.createElement("form");

        newForm.innerHTML = "<p>" + formData[i].name + "</p>" +
            "<img src = ' " + formData[i].img + "'/>";
        formsContainer.appendChild(newForm);
    }

    var playersAsString = JSON.stringify(formData);
    //para redirecionar 
    window.location.href = "gamezone2.html?formData=" + playersAsString;
    gameStart();
    alert("ts");

}


function deleteForm() {
    if (formCount > 2) {
        var formsContainer = document.getElementById("formsContainer");
        formsContainer.removeChild(formsContainer.lastChild);
        formCount--;
    }
}

function choosePlayers(firstTime) {
    if (firstTime) {
        var randomPlayer1 = Math.floor(Math.random() * formData.length);
        var randomPlayer2 = Math.floor(Math.random() * formData.length);
        console.log(randomPlayer1 + " " + randomPlayer2);
        while (randomPlayer1 === randomPlayer2) {
            randomPlayer2 = Math.floor(Math.random() * formData.length);
        }
        console.log(randomPlayer1 + " " + randomPlayer2);
        Player1 = formData[randomPlayer1];
        Player2 = formData[randomPlayer2];

        playedData.push(Player1);
        playedData.push(Player2);

    } else {

        /*var randomPlayer = Math.floor(Math.random() * formData.length);

        while (Player1.id === randomPlayer + 1 || Player2.id === randomPlayer + 1) {
            randomPlayer = Math.floor(Math.random() * formData.length);
        }

        Player2 = formData[randomPlayer];
        playedData.push(Player2);*/

        var randomPlayer = Math.floor(Math.random() * formData.length);

        while (true) {
            var cheese = true;
            randomPlayer = Math.floor(Math.random() * formData.length);

            if (formData.length === playedData.length) {
                playedData = [];
                playedData.push(Player1);
            }


            for (var i = 0; i < playedData.length; i++) {
                if (playedData[i].id !== formData[randomPlayer].id && i === playedData.length - 1) {
                    cheese = false;
                }
                if (playedData[i].id === formData[randomPlayer].id) {
                    break;
                }
            }

            if (!cheese) {
                break;
            }



        }
        Player2 = formData[randomPlayer];
        playedData.push(Player2);
    }

}

function randomWord() {
    console.log(wordData)
    var selectIndexWord = Math.floor(Math.random() * wordData.length);
    return wordData[selectIndexWord];
}

function takeUrl() {
    var queryParams = new URLSearchParams(window.location.search);
    var playersAsString = queryParams.get('formData');
    formData = JSON.parse(playersAsString);
    gameStart();
}

function takeUrlScore() {
    var queryParams = new URLSearchParams(window.location.search);
    var playersAsString = queryParams.get('formData');
    formData = JSON.parse(playersAsString);



    formData.sort(function (a, b) {
        return a.score - b.score;
    });

    var table = document.getElementById("tableScore");


    var shots = 0;
    formData.forEach(function (element) {
        shots += 2;
        var elementStr =
            "<tr><td>" +
            shots +
            "</td>" +

            "<td>" +
            element.name
        "</td></tr>";

        var row = table.insertRow(-1);
        row.innerHTML = elementStr;


    });
}

function gameStart() {

    $("audio").hide();
    $("#timerAll").hide();
    $("#winnerTime").hide();

    console.log(formData);
    var chosenWord = randomWord();

    console.log(chosenWord);
    document.getElementById("wordNow").textContent = chosenWord;
    if (firstTime) {
        choosePlayers(true);
        firstTime = false;
    }
    console.log(Player1);
    document.getElementById("p1img").src = Player1['img'];
    document.getElementById("p2img").src = Player2['img'];
    document.getElementById("p1Name").textContent = Player1.name;
    document.getElementById("p2Name").textContent = Player2.name;

    var str;
    if (firstPlayer) {
        firstPlayer = false;
        str = "<b>SPIT SOME BARS " + Player1.name + "!!</b>";
    }

    document.getElementById("spitBarsBtn").innerHTML = str;
}

function startBars() {
    var audio = document.querySelector('audio');
    audio.play();

    $("#spitBarsBtn").hide();
    $("#timerAll").show();

    //music plays
    started(15);

    console.log("teste");
    setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
        //stop music
        $("#spitBarsBtn").show();
        $("#timerAll").hide();
        str = "<b>SPIT SOME BARS " + Player2.name + "!!</b>";
        document.getElementById("spitBarsBtn").innerHTML = str;
        if (firstPlayer) {
            document.getElementById("spitBarsBtn").innerHTML = "escolhe vencedor caralho";
            //pass para chose your winner
            $("#gameplay").hide();
            $("#winnerTime").show();
            document.getElementById("p1imgFinal").src = Player1['img'];
            document.getElementById("p2imgFinal").src = Player2['img'];
            document.getElementById("p1NameFinal").textContent = Player1.name;
            document.getElementById("p2NameFinal").textContent = Player2.name;
        }
        firstPlayer = true;

    }, 16000);
}

function started(duration) {
    var TotalSeconds = 15;
    var documentWidth = $(document).width();
    var start = Date.now();
    var intervalSetted = null;

    function timer() {
        var diff = duration - (((Date.now() - start) / 1000) | 0);
        var seconds = (diff % 60) | 0;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $('#timer').html("00:" + seconds);
        var progresBarWidth = (seconds * documentWidth / TotalSeconds);

        $('#progress').css({
            width: progresBarWidth + 'px'
        });

        if (diff <= 0) {
            clearInterval(intervalSetted);
        }
    }

    timer();
    intervalSetted = setInterval(timer, 1000);
}

function winnerChoose(player1Win) {

    console.log(Player1);
    console.log(Player2);

    if (player1Win) {
        Player1.score++;
        Player2.score += 2;
        console.log("aqui caralho")

    } else {
        Player2.score++;
        Player1.score += 2;

        Player1 = Player2;
        console.log("aie joca");
    }


    choosePlayers(false);
    $("#gameplay").show();
    $("#winnerTime").hide();
    gameStart();
}

function goToScoreboard() {
    var playersAsString = JSON.stringify(formData);
    //para redirecionar 
    window.location.href = "scoreboard.html?formData=" + playersAsString;
}

