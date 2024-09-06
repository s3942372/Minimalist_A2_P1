document.addEventListener('DOMContentLoaded', () => {
    const sentences = [
        "It squirmed about its cage",
        "feasted upon the dead and",
        "slept inside a blanket of",
        "the finest silk biding time",
        "until it finally was released",
    ];

    const backgroundImages = [
        '/img/cage.jpg',
        '/img/feast.jpg',
        '/img/slept.jpg',
        '/img/blanket.webp',
        '/img/boil.webp',
    ];

    const container = document.getElementById('story-container');
    let currentSentenceIndex = 0;
    const usedPositions = [];
    const spacing = 150;
    let allSentencesDisplayed = false;

    function getUniquePosition() {
        let top, left;
        let isValidPosition = false;

        while (!isValidPosition) {
            top = `${Math.random() * (container.clientHeight - spacing)}px`;
            left = `${Math.random() * (container.clientWidth - spacing)}px`;

            isValidPosition = !isOverlapping(top, left);
        }

        usedPositions.push({ top, left });
        return { top, left };
    }

    function isOverlapping(top, left) {
        return usedPositions.some(position => {
            return Math.abs(parseInt(top) - parseInt(position.top)) < spacing &&
                   Math.abs(parseInt(left) - parseInt(position.left)) < spacing;
        });
    }

    function fadeOutAllSentences() {
        const sentences = document.querySelectorAll('.sentence');
        sentences.forEach(sentence => {
            sentence.style.transition = 'opacity 0.5s';
            sentence.style.opacity = 0;
            setTimeout(() => {
                if (sentence) {
                    container.removeChild(sentence);
                }
            }, 500);
        });
    }

    function changeBackgroundImage() {
        if (backgroundImages.length > 0) {
            const imageIndex = currentSentenceIndex % backgroundImages.length;
            container.style.transition = 'background-image 0.5s';
            container.style.backgroundImage = `url('${backgroundImages[imageIndex]}')`;
        }
    }

    function fadeInSentences() {
        if (currentSentenceIndex >= sentences.length) {
            allSentencesDisplayed = true;
            return;
        }

        const sentenceElement = document.createElement('div');
        sentenceElement.classList.add('sentence');
        sentenceElement.id = `sentence${currentSentenceIndex + 6}`;
        sentenceElement.textContent = sentences[currentSentenceIndex];
        sentenceElement.style.opacity = 0;
        container.appendChild(sentenceElement);

        const { top, left } = getUniquePosition();
        sentenceElement.style.top = top;
        sentenceElement.style.left = left;

        setTimeout(() => {
            sentenceElement.style.transition = 'opacity 0.5s';
            sentenceElement.style.opacity = 1;
        }, 10); // Short delay to ensure transition is applied

        changeBackgroundImage();

        currentSentenceIndex++;
    }

    document.addEventListener('click', () => {
        if (allSentencesDisplayed) {
            fadeOutAllSentences();
            container.style.backgroundImage = '';
            currentSentenceIndex = 0;
            usedPositions.length = 0;
            allSentencesDisplayed = false;
        } else {
            fadeInSentences();
        }
    });
});
