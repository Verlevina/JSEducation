getElements();
FindResultFoeClear();
var resultStr = document.getElementById('result');
function getElements() {
    var elems = document.getElementsByClassName('calc');

    for (var i = 0; i < elems.length; i++) {
        if (elems[i].innerHTML != '=') {
            elems[i].addEventListener('click', writeToResult)
        }
        else {
            elems[i].addEventListener('click', result)
        }
    }
}

function writeToResult() {
    resultStr.innerHTML = resultStr.innerHTML + this.innerHTML;
}

function result() {
    findErrors();
    resultStr.innerHTML = eval(resultStr.innerHTML);
}

function FindResultFoeClear() {
    var clear = document.getElementById('clear');
    clear.addEventListener('click', cleanResult);
}

function cleanResult() {
    resultStr.innerHTML = '';
}

function findErrors() {
    var str = resultStr.innerHTML;
    var flag = false;
    for (var i = 0; i < str.length; i++) {

        if (str[i] == '-' || str[i] == '+' || str[i] == '*' || str[i] == '/') {
            if (flag) {
                resultStr.innerHTML = 'error';
                break;
            }
            flag = true;
        }
        else flag = false;
    }
}

// Крестики-нолики
const elemsTd = document.getElementsByClassName('xotd');
clickElements();
clearClickXO();

function clickElements() {
    for (var i = 0; i < elemsTd.length; i++) {
        elemsTd[i].addEventListener('click', addXO);
    }
}

function addXO() {
    var spanXO = document.getElementById('XOrO');
    var elem = document.getElementById('XO');
    if (elem.hasAttribute('data-beginX')) {
        this.innerHTML = 'X';
        elem.removeAttribute('data-beginX');
        spanXO.innerHTML = 'O'
    } else {
        this.innerHTML = 'O';
        elem.setAttribute('data-beginX', '');
        spanXO.innerHTML = 'X'
    }
    this.removeEventListener('click', addXO);
    checkVictory();
}

function clearClickXO() {
    var elem = document.getElementById('XOResetButton');
    elem.addEventListener('click', clearXO);
}

function checkVictory() {
    if (elemsTd[0].innerHTML == elemsTd[4].innerHTML && elemsTd[0].innerHTML == elemsTd[8].innerHTML && elemsTd[0].innerHTML != '') {
        victory(elemsTd[0].innerHTML);
    }

    if (elemsTd[2].innerHTML == elemsTd[4].innerHTML && elemsTd[2].innerHTML == elemsTd[6].innerHTML && elemsTd[2].innerHTML != '') {
        victory(elemsTd[2].innerHTML);
    }

    for (var i = 0; i < 3; i++) {
        if (elemsTd[i].innerHTML == elemsTd[i + 3].innerHTML && elemsTd[i].innerHTML == elemsTd[i + 6].innerHTML && elemsTd[i].innerHTML != '') {
            victory(elemsTd[i].innerHTML);
        }
    }

    for (var i = 0; i < 3; i++) {
        if (elemsTd[3 * i].innerHTML == elemsTd[3 * (i + 1) - 2].innerHTML && elemsTd[3 * i].innerHTML == elemsTd[3 * (i + 2) - 4].innerHTML && elemsTd[3 * i].innerHTML != '') {
            victory(elemsTd[i].innerHTML);
        }
    }

    var isEmpty=false;
    for (var i=0;i<elemsTd.length;i++){
        if(!elemsTd[i].innerHTML){
            isEmpty=true;
            break;
        }
    }

    if(!isEmpty){
        noWinners();
    }
}

function clearXO() {
    for (var i = 0; i < elemsTd.length; i++) {
        elemsTd[i].innerHTML = '';
        elemsTd[i].addEventListener('click', addXO);
    }
}

function victory(elem) {
    var victoryWriteX = document.getElementById('XVictory');
    var victoryWriteO = document.getElementById('OVictory');
    if (elem == 'X') {
        var sumX = victoryWriteX.innerHTML;
        victoryWriteX.innerHTML = ++sumX;
        for (var i = 0; i < elemsTd.length; i++) {
            elemsTd[i].removeEventListener('click', addXO);
        }
    }

    if (elem == 'O') {
        var sumO = victoryWriteO.innerHTML;
        victoryWriteO.innerHTML = ++sumO;
        for (var i = 0; i < elemsTd.length; i++) {
            elemsTd[i].removeEventListener('click', addXO);
        }
    }
    //elemsTd.removeEventListener('click', addXO);
}


function noWinners(){
    var noVictory = document.getElementById('noWin');
    var sumX = noVictory.innerHTML;
    noVictory.innerHTML = ++sumX;
}


// Тест 1
var ask0=document.getElementsByName('ask0');
var ask1=document.getElementsByName('ask1');
var ask2=document.getElementsByName('ask2');
var rightAnswers=[0,2,2];
var testedAnswers=['','',''];
var buttonToTest=document.getElementById('testIt');

buttonToTest.addEventListener('click',testAnswers);

function testAnswers(){
    for(var i=0;i<testedAnswers.length;i++){
    testedAnswers[i]=testUsersAnswers(i);
    }
    countTrueAnswers(testedAnswers);
}
function testUsersAnswers(num){
    var askNum=eval('ask'+num);
    for (var i=0;i<askNum.length;i++){
        if(askNum[i].checked){
            if(i==rightAnswers[num]){
                return true;
            }else{
                return false;
            }
        }
    }
}

function countTrueAnswers(arr) {
    var right = 0;
    var mistake = 0;
    for (var i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case  true:
                right++;
                break;
            case false:
                mistake++;
                break;
        }
    }
    alert('правильные ответы:  '+right+'  ('+(100*right/rightAnswers.length).toFixed(2)+'%)'+'\r\n не правильные ответы: '+mistake+'.');
}

// чеклист
var $wrapDiv = $('#wrapCheckList');
var $inputTask = $('#inputTask');
$inputTask.on('change', addList);

function addList(event) {
    $wrapDiv.append('<div></div>');
    $newChildrenDiv=$wrapDiv.children('div').last();
    $newChildrenDiv.addClass('task');
    var $task=$('.task');
    $task.last().append($inputTask.val());
    $task.last().append('<input>');
    $inputDel=$task.children('input');
    $inputDel.last().addClass('del').attr({'type':'button','value':'X'});
    $inputDel.on('click',delDiv);
    $inputTask.val('');
}
function delDiv(){
   var $divParent=$(this).parent();
    $divParent.detach();
}































