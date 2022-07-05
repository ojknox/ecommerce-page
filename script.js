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
const mainImg = document.getElementById('mainImg'); //big image on normal page
const thumbnails = document.querySelectorAll('.thumbnailImg'); //thumbnails
const thumbnailArray = Array.from(thumbnails); //array of thumbnails
const thumbnailDivs = document.querySelectorAll('.photo.mini');

const lastImage = thumbnailArray.length - 1; 
const lightboxMainImg = document.querySelector('.lightbox-img'); //big image in lightbox
const lightboxThumbnailDivs = document.querySelectorAll('.thumbnail-container');

let activeImage = 0; //starts off with 1st image

const setActiveImage = (image) => {
    mainImg.src = image.src.replace('-thumbnail', ''); //change main photo when thumbnail clicked
    lightboxMainImg.src = image.src.replace('-thumbnail', ''); //change lightbox main photo
    activeImage = thumbnailArray.indexOf(image); //record index of active image
}

thumbnails.forEach(image => {
    image.addEventListener('click', (e) => { 
        //change main photo
        setActiveImage(image);
        //remove 'selected' thumbnail
        thumbnailDivs.forEach(div => {
            div.classList.remove('active');
        })
        //change active thumbnail
        image.parentElement.classList.add('active');
    })
})

//Making lightbox appear
//Variables
const lightboxEnabled = document.querySelector('.photo.main'); 
const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnLeft = document.getElementById('left');
const lightboxBtnRight = document.getElementById('right');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail-img');
const lightboxThumbnailArray = Array.from(lightboxThumbnails);

//Functions of lightbox
const changeLightboxThumbnail = () => {
    lightboxThumbnailDivs.forEach(div => {
        div.classList.remove('active');
    })
    lightboxThumbnailArray[activeImage].parentElement.classList.add('active');
}

const showLightbox = () => {
    lightboxContainer.classList.add('active');
    changeLightboxThumbnail();
};

const hideLightbox = () => {lightboxContainer.classList.remove('active')};

const transitionSlideLeft = () => {
    activeImage === 0 ? setActiveImage(thumbnailArray[lastImage]) : setActiveImage(thumbnailArray[activeImage -1]);
    changeLightboxThumbnail();
}

const transitionSlideRight = () => {
    activeImage === lastImage ? setActiveImage(thumbnailArray[0]) : setActiveImage(thumbnailArray[activeImage +1]);
    changeLightboxThumbnail();
}

const transitionSlideHandler = (moveItem) => {
    moveItem.includes('left') ? transitionSlideLeft() : transitionSlideRight();
}

//Event listeners for lightbox
lightboxEnabled.addEventListener('click', () => {
    showLightbox();
})

lightboxContainer.addEventListener('click', () => {
    hideLightbox();
})

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); //stop container from also being clicked and therefore closed
        transitionSlideHandler(e.currentTarget.id); //prints left or right
    })
})

lightboxThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveImage(thumbnail);
        lightboxThumbnailDivs.forEach(div => {
            div.classList.remove('active');
        })
        thumbnail.parentElement.classList.add('active');
        activeImage = lightboxThumbnailArray.indexOf(thumbnail);
    })
})