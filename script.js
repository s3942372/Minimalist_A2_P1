document.addEventListener('DOMContentLoaded', () => {
    const sentences = [
        "It squirmed about its cage",
        "feasted upon the dead and",
        "slept inside a blanket of",
        "the finest silk biding time",
        "until it finally was released",
    ];

    const backgroundImages = [
        '/cage.jpg',
        '/feast.jpg',
        '/slept.jpg',
        '/blanket.webp',
        '/boil.webp',
    ];

    const container = document.getElementById('story-container');
    let currentSentenceIndex = 0;
    const usedPositions = []; // To keep track of used positions
    const spacing = 150; // Minimum spacing between sentences in pixels
    let allSentencesDisplayed = false; // Flag to track if all sentences have been displayed

    // Get a unique position for the new sentence
    function getUniquePosition() {
        let top, left;
        let isValidPosition = false;

        while (!isValidPosition) {
            top = `${Math.random() * (container.clientHeight - spacing)}px`;
            left = `${Math.random() * (container.clientWidth - spacing)}px`;

            // Check if the position is valid
            isValidPosition = !isOverlapping(top, left);
        }

        // Add this position to the list of used positions
        usedPositions.push({ top, left });
        return { top, left };
    }

    // Check if a position overlaps with existing positions
    function isOverlapping(top, left) {
        return usedPositions.some(position => {
            return Math.abs(parseInt(top) - parseInt(position.top)) < spacing &&
                   Math.abs(parseInt(left) - parseInt(position.left)) < spacing;
        });
    }

    // Fade out all sentences
    function fadeOutAllSentences() {
        const sentences = document.querySelectorAll('.sentence');
        sentences.forEach(sentence => {
            sentence.style.transition = 'opacity 0.5s';
            sentence.style.opacity = 0;
            setTimeout(() => {
                if (sentence) {
                    container.removeChild(sentence);
                }
            }, 500); // Wait for fade-out to complete
        });
    }

    // Change the background image
    function changeBackgroundImage() {
        if (backgroundImages.length > 0) {
            const imageIndex = currentSentenceIndex % backgroundImages.length;
            container.style.transition = 'background-image 0.5s'; // Smooth transition for background change
            container.style.backgroundImage = `url('${backgroundImages[imageIndex]}')`;
        }
    }

    // Fade in new sentences
    function fadeInSentences() {
        if (currentSentenceIndex >= sentences.length) {
            allSentencesDisplayed = true; // Mark that all sentences have been displayed
            return;
        }

        // Add a new sentence
        const sentenceElement = document.createElement('div');
        sentenceElement.classList.add('sentence');
        sentenceElement.id = `sentence${currentSentenceIndex + 6}`; // ID for dynamically added sentences
        sentenceElement.textContent = sentences[currentSentenceIndex];
        sentenceElement.style.opacity = 0; // Start invisible
        container.appendChild(sentenceElement);

        // Position new sentence uniquely
        const { top, left } = getUniquePosition();
        sentenceElement.style.top = top;
        sentenceElement.style.left = left;

        // Trigger fade-in effect
        setTimeout(() => {
            sentenceElement.style.transition = 'opacity 0.5s';
            sentenceElement.style.opacity = 1;
        }, 10); // Short delay to ensure transition is applied

        // Change the background image
        changeBackgroundImage();

        // Increment the current sentence index
        currentSentenceIndex++;
    }

    // Handle clicks on the screen to add more sentences or clear everything
    document.addEventListener('click', () => {
        if (allSentencesDisplayed) {
            // Remove all sentences and reset everything
            fadeOutAllSentences();
            container.style.backgroundImage = ''; // Clear background image
            currentSentenceIndex = 0; // Reset index
            usedPositions.length = 0; // Clear the used positions array
            allSentencesDisplayed = false; // Reset the flag
        } else {
            fadeInSentences();
        }
    });
});
