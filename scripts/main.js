import Flashcard from './flashcard.js';


function randomInt(max) {
    return Math.floor(Math.random() * max)
}
// Global variables for kanji data and current index
let kanjiData = {}; // Key-based data for all kanji
let kanjiList = []; // List of kanji characters (keys)
let currentKanjiIndex = randomInt(50); // Track the current kanji

/**
 * Loads the kanji.json file and initializes the kanji data and list.
 */
async function loadKanjiData() {
    try {
        const response = await fetch('data/kanji.json');
        if (!response.ok) {
            throw new Error('Failed to load kanji.json');
        }
        kanjiData = await response.json();
        kanjiList = Object.keys(kanjiData);
    } catch (error) {
        console.error('Error loading kanji data:', error);
    }
}

/**
 * Renders the current kanji flashcard.
 */
function renderFlashcard() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear previous content

    // Get the current kanji key and its data
    const currentKanji = kanjiList[currentKanjiIndex];
    const currentKanjiData = kanjiData[currentKanji];

    // Pass the kanji character and its data to the Flashcard
    const flashcard = new Flashcard(currentKanji, currentKanjiData);
    app.appendChild(flashcard.render());

    // Load and animate the kanji SVG
    flashcard.loadStrokeAnimation(`animation-${currentKanji}`);
}

/**
 * Navigates to the next kanji flashcard.
 */
function showNextKanji() {
    currentKanjiIndex = (currentKanjiIndex + 1) % kanjiList.length;
    renderFlashcard();
}

/**
 * Navigates to the previous kanji flashcard.
 */
function showPreviousKanji() {
    currentKanjiIndex = (currentKanjiIndex - 1 + kanjiList.length) % kanjiList.length;
    renderFlashcard();
}

/**
 * Replays the current kanji animation.
 */
function replayKanji() {
    renderFlashcard();
}

/**
 * Handles user interaction through clicks and key presses.
 */
function handleEvent(event) {
    let action;

    // Determine the action based on the event type
    switch (event.type) {
        case 'click':
            if (event.target.id === 'next-btn') action = 'forward';
            else if (event.target.id === 'prev-btn') action = 'back';
            else if (event.target.id === 'replay-btn') action = 'select';
            break;
        case 'keydown':
            switch (event.key) {
                case 'ArrowRight':
                    action = 'forward';
                    break;
                case 'ArrowLeft':
                    action = 'back';
                    break;
                case 'Enter':
                case 'Return':
                    action = 'select';
                    break;
            }
            break;
        default:
            return;
    }

    // Perform the action
    switch (action) {
        case 'forward':
            showNextKanji();
            break;
        case 'back':
            showPreviousKanji();
            break;
        case 'select':
            replayKanji();
            break;
    }
}

/**
 * Displays the Kanji List popup.
 */
function showList() {
    const popup = document.getElementById('pop-up'); // Popup container
    const kanjiContainer = document.getElementById('kanji-list'); // List container

    // Clear existing list
    kanjiContainer.innerHTML = '';

    // Populate the Kanji list
    kanjiList.forEach((kanji, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = kanji;

        // Add click listener for each Kanji
        listItem.addEventListener('click', () => {
            currentKanjiIndex = index; // Update current index
            renderFlashcard(); // Render the selected Kanji
            closeKanjiPopUp(); // Close the popup
        });

        kanjiContainer.appendChild(listItem);
    });

    // Show the popup
    popup.classList.remove('hidden');
    popup.setAttribute('aria-hidden', 'false'); // Update ARIA visibility
}

/**
 * Closes the Kanji List popup.
 */
function closeKanjiPopUp() {
    const popup = document.getElementById('pop-up');
    popup.classList.add('hidden'); // Hide the popup
    popup.setAttribute('aria-hidden', 'true'); // Update ARIA visibility
}

/**
 * Initializes the app and sets up event listeners.
 */
async function initializeApp() {
    await loadKanjiData(); // Load kanji data from the JSON file
    if (kanjiList.length === 0) {
        console.error('Kanji list is empty. Check kanji.json.');
        return;
    }
    renderFlashcard(); // Display the first kanji flashcard

    // Add event listeners for navigation buttons
    document.getElementById('next-btn').addEventListener('click', showNextKanji);
    document.getElementById('prev-btn').addEventListener('click', showPreviousKanji);
    document.getElementById('replay-btn').addEventListener('click', replayKanji);

    // Event listener for the "Kanji List" button
    document.getElementById('choose-btn').addEventListener('click', showList);

    // Event listener for the "Close" button in the popup
    document.getElementById('close-popup').addEventListener('click', closeKanjiPopUp);

    // Close popup when clicking outside of its content
    document.getElementById('pop-up').addEventListener('click', (event) => {
        if (event.target.id === 'pop-up') {
            closeKanjiPopUp();
        }
    });

    // Add global listeners for keyboard navigation
    document.addEventListener('keydown', handleEvent);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
