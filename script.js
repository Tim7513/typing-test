'use strict';

let main = document.getElementById('main');
let textContainer = document.getElementById('text-container');
let resultsContainer = document.getElementById('results');
let wpmText = document.getElementById('wpm');
let accuracyText = document.getElementById('accuracy');
let timeText = document.getElementById('time');

const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(
    ' ',
);

const text_list = ["We live in bliss. Blind, unknowing, and ignorant of the troubles that come before us. In the face of stride-highs, monument after monument crashing down, do the arrays fork and reincarnate. The worst comes at the best, the best comes at the worst, and life is a pure defiance of the plateau.",
"Waves, crescents, rays, needles, a typical day is built of multiple logarithms.", "Move. get up. Take action. Drag your feet out of bed. You're late for school. Some checklists points have already been missed. The stock market has been open for three hours. Life-altering deals are being made without your control. As your snooze button was abused, the others were dismissed. As you felt the comfort of your bed, others felt the comfort of success. Look at your pathetic childhood room walls. No awards, no certificates, no medals, no distinct ambiance of memories. You have no friends, no achievements, no memories, no personality, and it is all because of YOU."
,"Retardation. Light of my life, fire of my loins, the crescent, the uptick, the downfall, the mesmerization. The catalyst against the law, the stair’s to glory, lie in this behaviour. No matter the shift, physically, chemically, or biologically, retardation is of no equation. No linear line, parabola, derivative, logarithim, or set theory number can encompass the range that is upheld. Amongst all the darkness, anger, dispute, and despair, retardation shall sustain",
"Keep smiling, because life is a beautiful thing and there's so much to smile about",
"Life is a long lesson in humility.",
"In three words I can sum up everything I've learned about life: it goes on",
"Opportunities don't happen, you create them",
"Success is not final; failure is not fatal: It is the courage to continue that counts",
"School.. The churner of the robots. The neutralizer of the seed. Thecatalyst of boredom, and the poision for uniqueness. From the moment once sits down, subjected to the confinement of a kindergarten classroom, their fate is sealed. Indoctrinated, lost, gone, only to come out with nothing."
]


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
let i  = getRndInteger(0, 9);
let text = text_list[i];

const textArr = text.split('');
const htmlArr = textArr.map((item, index, array) => {
    if (item === ' ') {
        return `<span class="space" id="span${index}">${item}</span>`;
    }
    return `<span class="char" id="span${index}">${item}</span>`;
});
let errors = [];
textContainer.innerHTML = htmlArr.join('');
let firstTime = true;
let currentPos = 0;
let backspaceNeeded = false;
let currentTime = 0;
let repeat;
document.addEventListener('keydown', event => {
    if (event.key === ' ') {
        event.preventDefault();
    }
    if (firstTime) {
        firstTime = false;
        repeat = setInterval(() => currentTime++, 1000);
    }
    if (event.location === 0 && !invalidKeys.includes(event.key)) {
        handleKey(event.key);
    }
});

function handleKey(key) {
    let span = document.getElementById(`span${currentPos}`).style;
    if (!backspaceNeeded) {
        if (key === textArr[currentPos]) {
            span.color = 'green';
            currentPos++;
        } else {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'red';
            } else {
                span.color = 'red';
            }
            backspaceNeeded = true;
            errors.push(textArr[currentPos]);
        }
    } else {
        if (event.key === 'Backspace') {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'transparent';
            } else {
                span.color = 'black';
            }
            backspaceNeeded = false;
        }
    }
    if (currentPos === textArr.length) {
        clearInterval(repeat);
        handleEnd();
    }
}

function handleEnd() {
    let wpm = Math.floor(textArr.length / 5 / (currentTime / 60));
    let accuracy = Math.floor(
        ((textArr.length - errors.length) / textArr.length) * 100,
    );
    let multiples = Math.floor(currentTime / 60);
    let seconds = currentTime - multiples * 60;

    let list = document.getElementById("Results");

    let li = document.createElement("li");
    li.innerText = `wpm: ${wpm} wpm`;
    list.appendChild(li);

    let li1 = document.createElement("li");
    li1.innerText = `accuracy: ${accuracy}%`;
    list.appendChild(li1);

    let li2 = document.createElement("li");
    li2.innerText = `Time: ${multiples} m ${seconds} s`;
    list.appendChild(li2);

    main.style.display = 'none';
    resultsContainer.style.display = 'block';


}
