document.addEventListener('DOMContentLoaded', () => {
    // Handle "How To Play" pop-up
    const howToPlayPopUp = document.getElementById('popUp');
    const howToPlayBtn = document.querySelectorAll('.menu-btn')[1];
    const closeHowToPlayBtn = document.querySelector('.close-btn');

    howToPlayBtn.addEventListener('click', () => {
        howToPlayPopUp.style.display = 'block';
    });

    closeHowToPlayBtn.addEventListener('click', () => {
        howToPlayPopUp.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === howToPlayPopUp) {
            howToPlayPopUp.style.display = 'none';
        }
    });

    // Handle "Start" pop-up
    const startPopUp = document.getElementById('popUp-Start');
    const startBtn = document.querySelectorAll('.menu-btn')[0];
    const closeStartBtn = document.querySelector('.close-startbtn');

    startBtn.addEventListener('click', () => {
        startPopUp.style.display = 'block';
    });

    closeStartBtn.addEventListener('click', () => {
        startPopUp.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === startPopUp) {
            startPopUp.style.display = 'none';
        }
    });
});
