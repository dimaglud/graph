window.addEventListener('resize', function(event) {
    drawGraph();
}, true);

function drawGraph() {
    const container = document.getElementById('graph');
    const dot = document.getElementById('graph_dot');

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    

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

    //TODO: get other needed parameters from inputs
    //TODO: add validation 

    var weightIndex = getWeightIndex(weight,heightM);
    var healthIndex = getHealthIndex(pulse,pressureU,pressureL,age,weight,heightM);
    
    const weightSpan = document.getElementById(`weightIndex`);
    weightSpan.innerText = Math.round(weightIndex * 10) / 10;

    const imtSpan = document.getElementById(`healthIndex`);
    imtSpan.innerText = Math.round(healthIndex * 1000) / 1000;
    
    // var weightIndex = 18.5;
    // var healthIndex = 0.525;
    
    console.log("индекс Веса: " + weightIndex + " индекс Здоровья: " + healthIndex);

    var kX = width/296;
    var kY = height/219;

    var x = 5 * weightIndex - 35;
    x = kX*x;

    var y = 200 * healthIndex - 22;
    y = kY*y;

    dot.style.left = x + "px";
    dot.style.bottom = y + "px";
}

//TODO: use this function 
function getFieldValue(name) {
    const heightInput = document.getElementById(name);
    const heightM = +heightInput.value;
}

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