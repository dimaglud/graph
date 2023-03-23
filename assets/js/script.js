window.addEventListener('load', function(event) {
    init();
}, true);

window.addEventListener('resize', function(event) {
    drawGraph();
}, true);

let isManSelected = undefined;
let isFormSubmited = false;

function init() {
    const inpSex = document.getElementById("inpSex");
    isManSelected = inpSex.classList.contains("man-selected");
}

function submit() {
    isFormSubmited = true;
    drawGraph();
}

function drawGraph() {
    document.getElementById("results-container").style.visibility = "visible";

    if (!isFormSubmited)
        return;

    const weightInput = document.getElementById('inpWeight');
    const weight = +weightInput.value;

    // added height (heightM)
    const heightInput = document.getElementById('inpHeight');
    const heightM = +heightInput.value;

    // added Pulse
    const pulseInput = document.getElementById('inpPulse');
    const pulse = +pulseInput.value;

    // added Pressure Upper (PressureU)
    const pressureInputU = document.getElementById('inpPressureU');
    const pressureU = +pressureInputU.value;

    // added Pressure Lower (PressureL)
    const pressureInputL = document.getElementById('inpPressureL');
    const pressureL = +pressureInputL.value;

    // added Age
    const ageInput = document.getElementById('inpAge');        
    const age = ageInput.value;

    if (!validateInput(ageInput, 16, 60) || !validateInput(pulseInput, 45, 250) )
        return [{ messagem: 'ПРОВЕРТЕ ПОЛЯ' }]

    var weightIndex = getWeightIndex(weight,heightM);
    var healthIndex = getHealthIndex(pulse,pressureU,pressureL,age,weight,heightM);
    
    //weightIndex = 18.5;
    //healthIndex = 0.525;

    //weightIndex = 25;
    //healthIndex = 0.826;

    const weightSpan = document.getElementById(`weightIndex`);
    weightSpan.innerText = Math.round(weightIndex * 10) / 10;

    const healthSpan = document.getElementById(`healthIndex`);
    healthSpan.innerText = Math.round(healthIndex * 1000) / 1000;
    
    // index text

    if (weightIndex < 18.5) {
        wResult = "(Ниже нормального веса)";
    } 
    else if (weightIndex < 25) {
        wResult = "(Нормальный вес)";
    }
    else if (weightIndex < 30) {
        wResult = "(Избыточный вес)";
    }        
    else if (weightIndex < 35) {
        wResult = "(Ожирение)";
    }
    else {
        wResult = "(Ожирение)";
    }
      
    document.getElementById("weightTXT").innerText = wResult;

    /*
        if (healthIndex < 0.375) {
            hResult= " (Низкое)";
          } else if (healthIndex < 0.525) {
            hResult = " (Ниже среднего)";
          } else if (healthIndex < 0.675){
            hResult = " (Среднее)";}
            else if (healthIndex < 0.825) {hResult = " (Выше среднего";}
            else {hResult = " (Высокое)";}

    */
    

    if (isManSelected == true) {
        if (healthIndex < 0.375) {
            hResult= " (Низкое)";
          } else if (healthIndex < 0.525) {
            hResult = " (Ниже среднего)";
          } else if (healthIndex < 0.675){
            hResult = " (Среднее)";}
            else if (healthIndex < 0.825) {hResult = " (Выше среднего";}
            else {hResult = " (Высокое)";}

    } else {
        if (healthIndex < 0.260) {
            hResult= " (Низкое)";
          } else if (healthIndex < 0.365) {
            hResult = " (Ниже среднего)";
          } else if (healthIndex < 0.475){
            hResult = " (Среднее)";}
            else if (healthIndex < 0.575) {hResult = " (Выше среднего";}
            else {hResult = " (Высокое)";}   
    }
    
    
    document.getElementById("healthTXT").innerText = hResult;


    
    console.log("индекс Веса: " + weightIndex + " индекс Здоровья: " + healthIndex);

    const imgGraph = document.getElementById('graph_img');
    const koef = imgGraph.offsetWidth / 296;

    const x = 5 * weightIndex - 36;
    const y = 200 * healthIndex - 15.5;

    const imgDot = document.getElementById('graph_dot');
    imgDot.style.display = "block";
    imgDot.style.width = 10 * koef + "px";
    setTimeout(() => 
    { 
        imgDot.style.marginLeft = x * koef + "px";
        imgDot.style.marginTop = - y * koef + "px";
    }, 1);

}

function validateInput(element, min, max) {
    let value = +element.value;
    if (value < min || value > max) {
        //TODO make red border
        element.style.border = '5px solid';
        element.style.borderColor = 'red';
        return false;
    }
    element.style.border = '0.878274px solid';
    element.style.borderColor = '#D4D4D4';
    return true;
}

function toggleSex() {
    const inpSex = document.getElementById("inpSex");

    isManSelected = !isManSelected;
    if (isManSelected) {
        inpSex.classList.remove("woman-selected");
        inpSex.classList.add("man-selected");
    }
    else {
        inpSex.classList.remove("man-selected");
        inpSex.classList.add("woman-selected");
    }

    if (isManSelected == true) {
        var graphSrc = "./assets/img/graph_man.svg"
    } else {
        var graphSrc = "./assets/img/graph_woman.svg"
    }
    
    document.getElementById('graph_img').src = graphSrc;    
}

//TODO: use this function 
function getFieldValue(name) {
    const heightInput = document.getElementById(name);
    const heightM = +heightInput.value;
}

document.getElementById("weigthIntro").innerText = "Ваш ИМТ:";

function getWeightIndex(weight, heightM) {
    //TODO: make formula more readable
    let weight1;
    weight1=weight*10000;
    let heightSQ;
    heightSQ = heightM **2;
    return weight1/heightSQ;
}

function getHealthIndex(pulse, pressureU, pressureL, age, weight, heightM) {
    let pressureAvg = (pressureU - pressureL) / 3 + pressureL;
    let indexU = 700 - 3 * pulse - 2.5 * pressureAvg - 2.7 * age + 0.28 * weight;
    let indexL = 350 - 2.6 * age + 0.21 * heightM;

    return indexU/indexL; 
}

//TODO: delete me
function getHealthIndex2(pulse, pressureU, pressureL, age, weight, heightM) {
    let pressureAvg = (pressureU - pressureL)/3 + pressureL;

    let indexU = (700 - (3 * pulse));
    indexU = indexU - (2.5 * pressureAvg);
    indexU -= 2.7 * age;
    indexU += 0.28 * weight;
    
    let index2a = 350 - (2.6 * age);
    let index2 = index2a + (0.21*heightM);

    return index1/index2; 
}

