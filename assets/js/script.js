window.addEventListener('load', function(event) {
    init();
}, true);

window.addEventListener('resize', function(event) {
    calculateIndexes();
}, true);

let isManSelected = undefined;
let isFormSubmited = false;

function init() {
    const inpSex = document.getElementById("inpSex");
    isManSelected = inpSex.classList.contains("man-selected");
}

function submit() {
    isFormSubmited = true;
    calculateIndexes();
}

function calculateIndexes() {
    if (!isFormSubmited)
        return;

    const weightInput = document.getElementById('inpWeight');
    const weight = +weightInput.value;

    const heightInput = document.getElementById('inpHeight');
    const heightM = +heightInput.value;

    const pulseInput = document.getElementById('inpPulse');
    const pulse = +pulseInput.value;

    const pressureInputU = document.getElementById('inpPressureU');
    const pressureU = +pressureInputU.value;

    const pressureInputL = document.getElementById('inpPressureL');
    const pressureL = +pressureInputL.value;

    const ageInput = document.getElementById('inpAge');        
    const age = ageInput.value;

    if (!validateInput(pulseInput, 45, 100) || !validateInput(pressureInputU, 80, 150) || !validateInput(pressureInputL, 50, 110) ){
        document.getElementById("divCalldoctor").style.visibility = 'visible';
        return false;
    }
    else if (!validateInput(ageInput, 16, 60) ){
        return false;
    } 
    
    document.getElementById("divCalldoctor").style.visibility = 'hidden';

    var weightIndex = getWeightIndex(weight, heightM);
    var healthIndex = getHealthIndex(pulse, pressureU, pressureL, age, weight, heightM);

    showResult(weightIndex, healthIndex);

    drawGraph(weightIndex, healthIndex);
}

function showResult(weightIndex, healthIndex) {
    document.getElementById("divResult").style.visibility = "visible";

    const weightSpan = document.getElementById(`weightIndex`);
    weightSpan.innerText = Math.round(weightIndex * 10) / 10;

    const healthSpan = document.getElementById(`healthIndex`);
    healthSpan.innerText = Math.round(healthIndex * 1000) / 1000;
    
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
            else if (healthIndex < 0.575) {hResult = " (Выше среднего)";}
            else {hResult = " (Высокое)";}   
    }
    
    document.getElementById("healthTXT").innerText = hResult;
}

function drawGraph(weightIndex, healthIndex) {
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
        imgDot.style.marginBottom = y * koef + "px";
    }, 1);

}

function validateInput(element, min, max) {
    let value = +element.value;
    if (value < min || value > max) {
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

function getWeightIndex(weight, heightM) {
    let weight1 = weight * 10000;
    let heightSQ = heightM ** 2;
    return weight1 / heightSQ;
}

function getHealthIndex(pulse, pressureU, pressureL, age, weight, heightM) {
    let pressureAvg = (pressureU - pressureL) / 3 + pressureL;
    let indexU = 700 - 3 * pulse - 2.5 * pressureAvg - 2.7 * age + 0.28 * weight;
    let indexL = 350 - 2.6 * age + 0.21 * heightM;
    return indexU/indexL; 
}
