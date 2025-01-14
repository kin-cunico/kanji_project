import Flashcard from './flashcard.js';

// Global variables for kanji data and current index
let kanjiData = {}; // Key-based data for all kanji
let kanjiList = []; // List of kanji characters (keys)
let currentKanjiIndex = 0; // Track the current kanji

/**
 * Loads the kanji.json file and initializes the kanji data and list.
 */
async function loadKanjiData() {
    try {
        const response = await fetch('/data/kanji.json');
        if (!response.ok) {
            throw new Error('Failed to load kanji.json');
        }
        kanjiData = await response.json();
        kanjiList = Object.keys(kanjiData); // Extract kanji characters (keys)
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
 * Initializes the app and sets up event listeners.
 */
async function initializeApp() {
    await loadKanjiData(); // Load kanji data from the JSON file
    if (kanjiList.length === 0) {
        console.error('Kanji list is empty. Check kanji.json.');
        return;
    }
    renderFlashcard(); // Display the first kanji flashcard

    // Set up navigation buttons
    document.getElementById('prev-btn').addEventListener('click', showPreviousKanji);
    document.getElementById('next-btn').addEventListener('click', showNextKanji);
    document.getElementById('replay-btn').addEventListener('click', replayKanji);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
