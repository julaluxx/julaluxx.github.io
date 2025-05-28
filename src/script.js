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

