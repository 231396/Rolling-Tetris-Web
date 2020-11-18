const tableHtml = document.querySelector("table");

const playersHtml = [
    document.getElementById("one-player"),
    document.getElementById("two-player"),
    document.getElementById("tree-player"),
    document.getElementById("four-player"),
    document.getElementById("five-player"),
    document.getElementById("six-player"),
    document.getElementById("seven-player"),
    document.getElementById("eight-player"),
    document.getElementById("nine-player"),
    document.getElementById("ten-player"),
];

const currentPlayerHtml = document.getElementById("best-player");

function FillTable(){
    //TODO - get top 10 requests form php
    //TODO - get player best run and ranking
}

function SetCurrentPlayerBest(username, score, level, duration){
    const fields = currentPlayerHtml.getElementsByTagName("td");
    fields[1].innerHTML = username;
    fields[2].innerHTML = score;
    fields[3].innerHTML = level;
    fields[4].innerHTML = duration;
}

function AlterTable(index, username, score, level, duration)
{
    const fields = playersHtml[index].getElementsByTagName("td");
    fields[1].innerHTML = username;
    fields[2].innerHTML = score;
    fields[3].innerHTML = level;
    fields[4].innerHTML = duration;
}

//TODO - KEEP PLAYER LOGGED