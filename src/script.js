let clickCount = 0;
document.getElementById('profile-picture').addEventListener('click', () => {
    clickCount++;

    // Create a temporary element to display the click count
    const clickDisplay = document.createElement('div');
    clickDisplay.textContent = `+${clickCount}`;
    clickDisplay.style.position = 'absolute';
    clickDisplay.style.color = 'white'; // Or any visible color
    clickDisplay.style.fontSize = '24px';
    clickDisplay.style.fontWeight = 'bold';
    clickDisplay.style.pointerEvents = 'none'; // So it doesn't interfere with clicking
    clickDisplay.style.top = '50%'; // Center vertically (relative to the image)
    clickDisplay.style.left = '50%'; // Center horizontally (relative to the image)
    clickDisplay.style.transform = 'translate(-50%, -50%)'; // Fine-tune centering
    clickDisplay.style.opacity = '1';
    clickDisplay.style.transition = 'opacity 0.5s ease-out';
    document.getElementById('profile-picture').appendChild(clickDisplay);

    // Fade out and remove the click display element
    setTimeout(() => {
        clickDisplay.style.opacity = '0';
        clickDisplay.addEventListener('transitionend', () => {
            clickDisplay.remove();
        });
    }, 500); // Display for 0.5 seconds

    if (clickCount >= 5) { // Trigger the rain effect after 5 clicks
        // Reset count only after the rain effect is triggered
        clickCount = 0; // Reset count
        // Trigger the rain effect
        const rainDuration = 5000; // 5 seconds
        const numberOfDrops = 100; // control how many drops are.

        for (let i = 0; i < numberOfDrops; i++) {
            const drop = document.createElement('div');
            drop.textContent = ['✧', '⋆', '°', '˖', '✿'][Math.floor(Math.random() * 3)]; // Or any character for the effect
            drop.style.position = 'fixed';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.top = '-10px'; // Start above the screen
            drop.style.color = '#483AA0'; // Or your desired color
            drop.style.fontSize = `${Math.random() * 20 + 10}px`;
            drop.style.zIndex = '1000'; // Ensure it's on top
            document.body.appendChild(drop);

            const animationDuration = Math.random() * 3 + 2; // Random duration
            drop.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(105vh)', opacity: 0 }
            ], {
                duration: animationDuration * 1000,
                easing: 'linear',
                fill: 'both'
            });

            // Remove the drop after the animation
            setTimeout(() => {
                drop.remove();
            }, animationDuration * 1000);
        }

        // Stop the rain effect after 5 seconds (optional, drops remove themselves)
        // You might add code here to clear all drops if you wanted a different effect
    }
});

// Moon Phase Functionality
async function getMoonPhase() {
    try {
        // Get current timestamp in milliseconds
        const timestamp = Date.now();
        
        // Fetch moon data from Farmsense API
        const response = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`);
        const data = await response.json();
        
        if (!data || data.length === 0) {
            throw new Error('No moon data available');
        }

        const moonPhase = data[0];
        const phase = parseInt(moonPhase.Phase);
        
        // Map phase number to moon phase name and emoji
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

        // Find the closest phase
        const phaseIndex = Math.floor((phase / 28) * 8) % 8;
        const currentPhase = phases[phaseIndex];

        // Update the moon phase display
        const moonPhaseText = document.getElementById('moon-phase-text');
        const moonPhaseImg = document.getElementById('moon-phase');
        
        if (moonPhaseText && moonPhaseImg) {
            moonPhaseText.textContent = `${currentPhase.name}`;
            // Create a temporary div to display the emoji as an image
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

    } catch (error) {
        console.error('Error fetching moon phase:', error);
        const moonPhaseText = document.getElementById('moon-phase-text');
        if (moonPhaseText) {
            moonPhaseText.textContent = 'Moon phase unavailable';
        }
    }
}

// Call getMoonPhase when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getMoonPhase();
    // Refresh moon phase every hour
    setInterval(getMoonPhase, 3600000);
});

// Music Player Functionality
document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progress = document.querySelector('.progress');
    let isPlaying = false;

    // Toggle play/pause
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.querySelector('span').textContent = isPlaying ? '⏸' : '▶';
        
        // Add animation to progress bar when playing
        if (isPlaying) {
            progress.style.width = '100%';
            progress.style.transition = 'width 30s linear';
        } else {
            const currentWidth = progress.offsetWidth / progress.parentElement.offsetWidth * 100;
            progress.style.width = `${currentWidth}%`;
            progress.style.transition = 'none';
        }
    });

    // Reset progress bar when it reaches the end
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

    // Previous and Next button effects
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset progress bar
            progress.style.transition = 'none';
            progress.style.width = '0';
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);

            // If playing, start progress bar animation
            if (isPlaying) {
                setTimeout(() => {
                    progress.style.transition = 'width 30s linear';
                    progress.style.width = '100%';
                }, 50);
            }
        });
    });
});

