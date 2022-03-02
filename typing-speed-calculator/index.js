const mainTxt = 'Americans on the average eat 18 acres of pizza every day. ' +
    'Banging your head against a wall uses 150 calories an hour. ' +
    'Contrary to popular belief, the British flag is not called ' +
    '"The Union Jack" it is actually called "The Union Flag". ' +
    "It's only called the Union Jack when out at sea on navy " +
    'ships. You are most likely to get murdered at Christmas ' +
    'time due to more alcohol being drunk. Merry Christmas.';


// Populate each char in span element
for (let i = 0; i < mainTxt.length; i++) {
    const newSpan = document.createElement("span");
    newSpan.textContent = mainTxt.charAt(i);
    if (i === 0) {
        newSpan.classList.add('on-char');
    }
    const mainDiv = document.getElementById('main-text');
    mainDiv.appendChild(newSpan);
}


function init() {
    let i = 0;
    let once = true;
    let intervalID;
    let sec = 60;
    let wrongCnt = 0;

    document.onkeydown = (e) => {
        // Init setinterval once
        if (once) {
            once = false;
            intervalID = setInterval(() => {
                const timerSpan = document.getElementById("sec");
                timerSpan.textContent = --sec;
                if (sec === 0 || i === mainTxt.length) {
                    clearInterval(intervalID);
                    document.onkeydown = null;
                    calculate();
                }
            }, 1000);
        }

        // Keyboard event part
        if (e.location === e.DOM_KEY_LOCATION_STANDARD) {
            const onChar = document.getElementsByClassName('on-char')[0];

            if (onChar.textContent === e.key) {
                if (onChar.classList.contains("wrong-char")) {
                    onChar.classList.remove("on-char");
                    onChar.classList.replace("wrong-char", "corrected-char");
                }
                else {
                    onChar.classList.replace("on-char", "passed-char");
                }

                if (i < mainTxt.length - 1) {
                    onChar.nextElementSibling.classList.add("on-char");
                }
                i++;
            }
            else {
                onChar.classList.add("on-char", "wrong-char");
                wrongCnt++;
            }
        }
    }

    // Math for WPM and Accuracy
    function calculate() {
        const wpmSpan = document.getElementById("wpm");
        const accuracySpan = document.getElementById("accuracy");
        let min = (60 - sec) / 60;
        wpmSpan.textContent = Math.round((i / 5) / min);
        accuracySpan.textContent = (((i - wrongCnt) / i) * 100).toFixed(1);
    }
}


init();