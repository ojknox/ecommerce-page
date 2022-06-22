//adding functionality to quantity button
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const num = document.querySelector(".num");

let n = 0;

plus.addEventListener("click", () => {
    n++;
    num.innerHTML = n;
});

minus.addEventListener("click", () => {
    if(n > 0){
        n--;
        num.innerHTML = n;
    }
})

//Switch the large product image by clicking on the small thumbnail images
mainImg = document.getElementById('mainImg');

thumb1 = document.getElementById('thumb1');
thumb1Src = thumb1.src.replace('-thumbnail', '');
thumb2 = document.getElementById('thumb2');
thumb2Src = thumb2.src.replace('-thumbnail', '');
thumb3 = document.getElementById('thumb3');
thumb3Src = thumb3.src.replace('-thumbnail', '');
thumb4 = document.getElementById('thumb4');
thumb4Src = thumb4.src.replace('-thumbnail', '');

thumb1.addEventListener('click', () => {
    mainImg.src = thumb1Src;
})
thumb2.addEventListener('click', () => {
    mainImg.src = thumb2Src;
})
thumb3.addEventListener('click', () => {
    mainImg.src = thumb3Src;
})
thumb4.addEventListener('click', () => {
    mainImg.src = thumb4Src;
})

//Making lightbox appear
const lightboxEnabled = document.querySelector('.photo.main');
const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnLeft = document.getElementById('left');
const lightboxBtnRight = document.getElementById('right');
let activeImage;

const showLightbox = () => {lightboxContainer.classList.add('active')};
const hideLightbox = () => {lightboxContainer.classList.remove('active')};
const transitionSlideLeft = () => {
    console.log('left');
}
const transitionSlideRight = () => {
    console.log('right');
}
const transitionSlideHandler = (moveItem) => {
    moveItem.includes('left') ? transitionSlideLeft() : transitionSlideRight();
}

lightboxEnabled.addEventListener('click', (e) => {
    showLightbox();
})

lightboxContainer.addEventListener('click', () => {
    hideLightbox();
})

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); //stop container from also being clicked and therefore closed
        transitionSlideHandler(e.currentTarget.id);
        //console.log(e.currentTarget.id);
    })
})