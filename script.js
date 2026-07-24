let lastTapTime = 0;
let intervals = [];

const tapZone = document.getElementById('tap-zone');
const instruction = document.getElementById('instruction');
const logBtn = document.getElementById('log-btn');
const resetBtn = document.getElementById('reset-btn');
const output = document.getElementById('output');

function recordTap(e) {
    if (e) e.preventDefault(); // Prevents phone from zooming on double-tap
    
    const now = Date.now();
    if (lastTapTime === 0) {
        intervals = [];
        instruction.innerText = "Recording...";
    } else {
        const diff = now - lastTapTime;
        intervals.push(diff);
    }
    lastTapTime = now;
    
    // Quick flash for visual feedback
    tapZone.style.backgroundColor = '#333';
    setTimeout(() => {
        tapZone.style.backgroundColor = 'transparent';
    }, 50);
}

// Listen for both touch and mouse clicks
tapZone.addEventListener('touchstart', recordTap, {passive: false});
tapZone.addEventListener('mousedown', recordTap);

logBtn.addEventListener('click', () => {
    if (intervals.length === 0) {
        output.value = "No rhythm recorded yet. Strike the screen first.";
        return;
    }
    
    const logData = {
        timestamp: new Date().toISOString(),
        total_strikes: intervals.length + 1,
        intervals_ms: intervals
    };
    
    output.value = JSON.stringify(logData, null, 2);
    instruction.innerText = "Cadence Logged. Tap to start a new rhythm.";
    lastTapTime = 0; 
});

resetBtn.addEventListener('click', () => {
    intervals = [];
    lastTapTime = 0;
    output.value = "";
    instruction.innerText = "Tap your rhythm here";
});
