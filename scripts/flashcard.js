import Vivus from 'vivus';

export default class Flashcard {
    constructor(kanji, kanjiData) {
        this.kanji = kanji; // Kanji character
        this.kanjiData = kanjiData; // Object
    }

    render() {
        const card = document.createElement('div');
        card.className = 'flashcard';

        const kanjiElement = document.createElement('h1');
        kanjiElement.className = 'kanji-character';
        kanjiElement.textContent = this.kanji;
        card.appendChild(kanjiElement);

        const animationContainer = document.createElement('div');
        animationContainer.className = 'kanji-animation';
        animationContainer.id = `animation-${this.kanji}`;
        card.appendChild(animationContainer);

        const meaningElement = document.createElement('p');
        meaningElement.className = 'kanji-meaning';
        meaningElement.textContent = this.kanjiData.meaning || 'Meaning not available';
        card.appendChild(meaningElement);

        const readingsElement = document.createElement('div');
        readingsElement.className = 'kanji-readings';
        readingsElement.innerHTML = `
            <p><strong>On'yomi:</strong> ${this.kanjiData.readings.onyomi.join(', ')}</p>
            <p><strong>Kun'yomi:</strong> ${this.kanjiData.readings.kunyomi.join(', ')}</p>
        `;
        card.appendChild(readingsElement);

        const examplesElement = document.createElement('ul');
        examplesElement.className = 'kanji-examples';
        if (this.kanjiData.phraseExamples && this.kanjiData.phraseExamples.length > 0) {
            this.kanjiData.phraseExamples.forEach(example => {
                const listItem = document.createElement('li');
                listItem.textContent = example;
                examplesElement.appendChild(listItem);
            });
        } else {
            const noExamplesItem = document.createElement('li');
            noExamplesItem.textContent = 'No examples available';
            examplesElement.appendChild(noExamplesItem);
        }
        card.appendChild(examplesElement);

        return card;
    }

    loadStrokeAnimation(containerId) {
        const svgFile = this.kanjiData.svg;
        if (!svgFile) {
            console.error(`No SVG file found for kanji "${this.kanji}"`);
            document.getElementById(containerId).innerHTML = `<p style="color: red;">Error: SVG not found for "${this.kanji}"</p>`;
            return;
        }

        const svgPath = `assets/svg/${svgFile}`;

        fetch(svgPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`SVG for kanji "${this.kanji}" not found`);
                }
                return response.text();
            })
            .then(svgContent => {
                const container = document.getElementById(containerId);
                container.innerHTML = svgContent;
                const svgElement = container.querySelector('svg');

                const paths = Array.from(svgElement.querySelectorAll('path'));
                const texts = Array.from(svgElement.querySelectorAll('text'));

                // Hide all stroke numbers
                texts.forEach(text => text.setAttribute('opacity', '0'));

                // Animate the SVG with Vivus.js
                new Vivus(svgElement, {
                    type: 'oneByOne',
                    duration: paths.length * 200,
                    animTimingFunction: Vivus.EASE_IN,
                    onProgress: (progress) => {
                        this.updateStrokeNumbers(progress, paths, texts);
                    },
                });
            })
            .catch(error => {
                console.error('Error fetching SVG:', error);
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = `<p style="color: red;">${error.message}</p>`;
                }
            });
    }

    updateStrokeNumbers(progress, paths, texts) {
        const currentStroke = Math.floor(progress * paths.length);
    }
}
