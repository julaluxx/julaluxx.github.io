let clickCount = 0;
document.getElementById('profile-picture').addEventListener('click', () => {
    clickCount++;

    const clickDisplay = document.createElement('div');
    clickDisplay.textContent = `+${clickCount}`;
    clickDisplay.style.position = 'absolute';
    clickDisplay.style.color = 'white';
    clickDisplay.style.fontSize = '24px';
    clickDisplay.style.fontWeight = 'bold';
    clickDisplay.style.pointerEvents = 'none';
    clickDisplay.style.top = '50%';
    clickDisplay.style.left = '50%';
    clickDisplay.style.transform = 'translate(-50%, -50%)';
    clickDisplay.style.opacity = '1';
    clickDisplay.style.transition = 'opacity 0.5s ease-out';
    document.getElementById('profile-picture').appendChild(clickDisplay);

    setTimeout(() => {
        clickDisplay.style.opacity = '0';
        clickDisplay.addEventListener('transitionend', () => {
            clickDisplay.remove();
        });
    }, 500);

    if (clickCount >= 5) {
        clickCount = 0;
        const rainDuration = 5000;
        const numberOfDrops = 100;

        for (let i = 0; i < numberOfDrops; i++) {
            const drop = document.createElement('div');
            drop.textContent = ['✧', '⋆', '°', '˖', '✿'][Math.floor(Math.random() * 3)];
            drop.style.position = 'fixed';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.top = '-10px';
            drop.style.color = '#ff7196';
            drop.style.fontSize = `${Math.random() * 20 + 10}px`;
            drop.style.zIndex = '1000';
            document.body.appendChild(drop);

            const animationDuration = Math.random() * 3 + 2;
            drop.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(105vh)', opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'linear',
                fill: 'both'
            });

            setTimeout(() => {
                drop.remove();
            }, animationDuration * 1000);
        }
    }
});

function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-time').textContent = formattedTime;
}

function getMoonPhase() {
    const lunarDays = 29.53058867;
    const knownNewMoon = new Date(2000, 0, 6, 18, 14).getTime();
    const now = new Date().getTime();
    const daysSinceKnownNewMoon = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentAge = (daysSinceKnownNewMoon % lunarDays);
    const phaseIndex = Math.floor((currentAge / lunarDays) * 8);
    
    const phases = {
        0: { name: 'New Moon', emoji: '🌑' },
        1: { name: 'Waxing Crescent', emoji: '🌒' },
        2: { name: 'First Quarter', emoji: '🌓' },
        3: { name: 'Waxing Gibbous', emoji: '🌔' },
        4: { name: 'Full Moon', emoji: '🌕' },
        5: { name: 'Waning Gibbous', emoji: '🌖' },
        6: { name: 'Last Quarter', emoji: '🌗' },
        7: { name: 'Waning Crescent', emoji: '🌘' }
    };

    const currentPhase = phases[phaseIndex];
    const moonPhaseText = document.getElementById('moon-phase-text');
    const moonPhaseImg = document.getElementById('moon-phase');
    
    if (moonPhaseText && moonPhaseImg) {
        moonPhaseText.textContent = `${currentPhase.name}`;
        const tempDiv = document.createElement('div');
        tempDiv.style.fontSize = '48px';
        tempDiv.style.height = '60px';
        tempDiv.style.width = '60px';
        tempDiv.style.display = 'flex';
        tempDiv.style.alignItems = 'center';
        tempDiv.style.justifyContent = 'center';
        tempDiv.textContent = currentPhase.emoji;
        moonPhaseImg.parentNode.replaceChild(tempDiv, moonPhaseImg);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getMoonPhase();
    updateDateTime();
    setInterval(getMoonPhase, 3600000);
    setInterval(updateDateTime, 1000);
    initializeSkillBars();
});

document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.querySelector('.progress');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.querySelector('span').textContent = isPlaying ? '⏸' : '▶';
        
        if (isPlaying) {
            progress.style.width = '100%';
            progress.style.transition = 'width 30s linear';
        } else {
            const currentWidth = progress.offsetWidth / progress.parentElement.offsetWidth * 100;
            progress.style.width = `${currentWidth}%`;
            progress.style.transition = 'none';
        }
    });

    progress.addEventListener('transitionend', () => {
        if (isPlaying) {
            progress.style.transition = 'none';
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.transition = 'width 30s linear';
                progress.style.width = '100%';
            }, 50);
        }
    });

    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            progress.style.transition = 'none';
            progress.style.width = '0';
            
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);

            if (isPlaying) {
                setTimeout(() => {
                    progress.style.transition = 'width 30s linear';
                    progress.style.width = '100%';
                }, 50);
            }
        });
    });
});

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(progress => {
        const width = progress.style.width;
        if (width) {
            progress.parentElement.style.setProperty('--progress-width', width);
        }
    });
}

