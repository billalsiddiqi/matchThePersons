const section = document.getElementById('section')
const restart = document.getElementById('restart')
const timer = document.getElementById('timer')
const play = document.createElement('img')

const createPlayBtn = () => {
    play.src = './images/play.svg'
    timer.appendChild(play)
    play.classList = 'play'
}

const data = [
    {imgSrc: "./images/1.jpg", id: 1},
    {imgSrc: "./images/2.jpg", id: 2},
    {imgSrc: "./images/3.jpg", id: 3},
    {imgSrc: "./images/4.jpg", id: 4},
    {imgSrc: "./images/5.jpg", id: 5},
    {imgSrc: "./images/6.jpg", id: 6},
    {imgSrc: "./images/7.jpg", id: 7},
    {imgSrc: "./images/8.jpg", id: 8},
    {imgSrc: "./images/1.jpg", id: 1},
    {imgSrc: "./images/2.jpg", id: 2},
    {imgSrc: "./images/3.jpg", id: 3},
    {imgSrc: "./images/4.jpg", id: 4},
    {imgSrc: "./images/5.jpg", id: 5},
    {imgSrc: "./images/6.jpg", id: 6},
    {imgSrc: "./images/7.jpg", id: 7},
    {imgSrc: "./images/8.jpg", id: 8}
]

let currentTime = 25;
function updateTimer() {
    const foldCard = document.querySelectorAll('.back');
    const data = Object.values(foldCard)
    
    const interval =  setInterval(()=>{
        const distance = currentTime - 1;
        currentTime = distance
        timer.innerHTML = distance 

        const result = data.every((e) => {
            return e.classList.contains("toggleBack")
        })
        if(result){
            clearInterval(interval);
            timer.innerHTML = "Congratulations"
            timer.style.color = 'green'
        }

        if(distance < 0){
            clearInterval(interval);
            timer.innerHTML = "Game Over!"
            timer.style.color = 'red'
            section.style.pointerEvents = 'none'
        }
    }, 1000)

    const restartTheGame = () => {
        clearInterval(interval);
        timer.innerHTML = ""
        timer.style.color = 'black'
        currentTime = 25
        section.style.pointerEvents = 'none'
        let cardData = getRandomItems();
        let cards = document.querySelectorAll('.card')
        let backs = document.querySelectorAll('.back')
        const imageData = document.querySelectorAll('.image')
    
        cardData.forEach((item, index) => {
            backs[index].classList.remove('toggleBack');
            cards[index].id = item.id
            imageData[index].src = item.imgSrc;
            cards[index].style.pointerEvents = "inherit"
        })
        
    }
    
    restart.addEventListener(("click"), ()=> {
        restartTheGame()
    })

}

play.addEventListener(("click"), () => {
    updateTimer()
    section.style.pointerEvents = 'all'
})

function getRandomItems() {
    createPlayBtn()
    const cardData = data 
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}


const randomData = getRandomItems();
randomData.forEach((img)=>{
    // Create HTML tags
    const card = document.createElement("div");
    const image = document.createElement("img");
    const back = document.createElement("div");
    // Attach tags to Section
    section.appendChild(card);
    card.appendChild(image);
    card.appendChild(back);
    //Adding class to tags
    card.classList = "card";
    image.classList = "image";
    back.classList = "back";
    // Attach the info to the card
    image.src = img.imgSrc;
    card.setAttribute("id", img.id)
    card.addEventListener("click", (e) => {
        back.classList.toggle("toggleBack")
        checkCards(e)
    })
})


const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped")
    const flippedCard = document.querySelectorAll('.flipped')
    
    if(flippedCard.length === 2) {
        if(flippedCard[0].getAttribute('id') === flippedCard[1].getAttribute('id')){
            flippedCard.forEach((card)=> {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        }else {
            flippedCard.forEach((card) => {
                card.classList.remove("flipped");
                const back = card.getElementsByTagName('div')[0];
                setTimeout(() => back.classList.toggle("toggleBack"), 500);
            })
        }
    }
}




