// Helperfunctie voor willekeurige waarden
const randomValue = (min, max) => Math.random() * (max - min) + min;

// Helperfunctie voor een willekeurige timing-function
const randomEase = () => {
    const easings = [
        "linear", 
        "ease-in", 
        "ease-out", 
        "ease-in-out", 
        `cubic-bezier(${randomValue(0, 1).toFixed(2)}, ${randomValue(0, 1).toFixed(2)}, ${randomValue(0, 1).toFixed(2)}, ${randomValue(0, 1).toFixed(2)})`
    ];
    return easings[Math.floor(Math.random() * easings.length)];
};

// Functie om een willekeurige animatie te genereren
function generateRandomAnimation(element, transformType) {
    if (!element) return;

    // Genereer een willekeurige duur (tussen 1s en 15s)
    const duration = randomValue(1, 15).toFixed(2) + "s";

    // Genereer een willekeurig aantal keyframes (tussen 2 en 5)
    const keyframesCount = Math.floor(randomValue(2, 5));

    // Creëer willekeurige keyframes
    let keyframes = "";
    for (let i = 0; i <= keyframesCount; i++) {
        const percentage = (i / keyframesCount) * 100;
        let transformValue;

        switch (transformType) {
            case "translateX":
                transformValue = `translateX(${randomValue(-100, 100).toFixed(2)}%)`;
                break;
            case "translateY":
                transformValue = `translateY(${randomValue(-100, 100).toFixed(2)}%)`;
                break;
            case "rotate":
                transformValue = `rotate(${randomValue(-360, 360).toFixed(2)}deg)`;
                break;
            case "scale":
                transformValue = `scale(${randomValue(0.5, 2).toFixed(2)})`;
                break;
            default:
                transformValue = "none";
        }

        keyframes += `${percentage}% {transform: ${transformValue}; }`;
    }

    // Genereer een willekeurige naam voor de animatie
    const animationName = "randomAnimation" + Math.floor(Math.random() * 10000);

        // Voeg de keyframes toe aan de stylesheet
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const styleElement = iframeDoc.getElementById('style-animations');
	
    const keyframesRule = `@keyframes ${animationName} { ${keyframes} }`;
	styleElement.innerHTML += keyframesRule;
    //styleElement.sheet.insertRule(keyframesRule, styleElement.sheet.cssRules.length);

    // Genereer een willekeurige timing-function
    const timingFunction = randomEase();

    // Pas de animatie toe op het element
    element.style.animation = `${animationName} ${duration} ${timingFunction} infinite`;
}

// Voeg eventlisteners toe aan de knoppen
document.getElementById('XBtn').addEventListener('click', () => {
    generateRandomAnimation(SELECT, "translateX");
});

document.getElementById('YBtn').addEventListener('click', () => {
    generateRandomAnimation(SELECT, "translateY");
});

document.getElementById('scaBtn').addEventListener('click', () => {
    generateRandomAnimation(SELECT, "scale");
});

document.getElementById('rotBtn').addEventListener('click', () => {
    generateRandomAnimation(SELECT, "rotate");
});
