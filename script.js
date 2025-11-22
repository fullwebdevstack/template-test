window.console.log('Testing'); 
// Dom Manipulation
const quotesContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading(){
    loader.hidden=false;
    quotesContainer.hidden=true;
}
// Hide Loading
function complete(){
    loader.hidden=true;
    quotesContainer.hidden=false;
}

// Show new Quote
function newQuote(){
    // loading();
    // Pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(Quotes);

    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if(quote.text.length >50){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
let apiQuotes = [];
async function getQuotes(params) {
    loading();
     // Show random Quotes from ApiQuotes array of Objects
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // Check if the 
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
        // Handle Error Here
    };
}

// Tweet A Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
document.addEventListener('DOMContentLoaded', getQuotes);
