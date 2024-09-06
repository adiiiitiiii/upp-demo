document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car');
    const pauseButton = document.getElementById('pauseButton');
    let position = 0;
    const speed = 10; // Speed of the car
    let counter = 0; 
    let isPaused = false; 
    let animationFrameId; 
    const carColors = [
        'car--color1',
        'car--color2',
        'car--color3',
        'car--color4',
        'car--color5'
    ];
    function moveCar() {
        if (!isPaused) {
            position += speed;
            car.style.left = position + 'px';
            if (position > window.innerWidth) {
                position = -car.offsetWidth; 
                counter++; 
                const bankAmount = counter * 60;
                document.getElementById('bank').innerHTML = `$ ${bankAmount}`;
                const randomColorClass = carColors[Math.floor(Math.random() * carColors.length)];
                car.className = 'car ' + randomColorClass;
            }
        }
        animationFrameId = requestAnimationFrame(moveCar);
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            cancelAnimationFrame(animationFrameId); 
            pauseButton.textContent = 'Split'; 
            document.body.classList.add('paused'); 
            const card1Amount = (counter * 60) * 0.50;
            const card2Amount = (counter * 60) * 0.30;
            const card3Amount = (counter * 60) * 0.20;

            const cards = document.querySelectorAll('.card');
            cards[0].innerHTML = `Split By 50%<br>$ ${card1Amount.toFixed(2)}`;
            cards[1].innerHTML = `Split By 30%<br>$ ${card2Amount.toFixed(2)}`;
            cards[2].innerHTML = `Split By 20%<br>$ ${card3Amount.toFixed(2)}`;
        } else {
            moveCar();
            pauseButton.textContent = 'Split'; 
            document.body.classList.remove('paused'); 
            counter = 0;
            document.getElementById('bank').innerHTML = `$ 0`;
            const cards = document.querySelectorAll('.card');
            cards[0].innerHTML = `Split By 50%<br>$ 0`;
            cards[1].innerHTML = `Split By 30%<br>$ 0`;
            cards[2].innerHTML = `Split By 20%<br>$ 0`;
        }
    }

    pauseButton.addEventListener('click', togglePause);

    moveCar(); 
});
