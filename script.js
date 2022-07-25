//adding functionality to quantity button
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const num = document.querySelector(".num");

let n = 0;

plus.addEventListener("click", () => {
  n++;
  num.innerHTML = n;
  cartBadge.innerHTML = n;
  updateCartTotal();
});

minus.addEventListener("click", () => {
  if (n > 0) {
    n--;
    num.innerHTML = n;
    cartBadge.innerHTML = n;
    updateCartTotal();
  }

  if(!cartItem.classList.contains("inactive") && n === 0){
    switchCart();
    cartBadge.style.opacity = 0;
  }
});

//Switch the large product image by clicking on the small thumbnail images
const mainImg = document.getElementById("mainImg"); //big image on normal page
const thumbnails = document.querySelectorAll(".thumbnailImg"); //thumbnails
const thumbnailArray = Array.from(thumbnails); //array of thumbnails
const thumbnailDivs = document.querySelectorAll(".photo.mini");

const lastImage = thumbnailArray.length - 1;
const lightboxMainImg = document.querySelector(".lightbox-img"); //big image in lightbox
const lightboxThumbnailDivs = document.querySelectorAll(".thumbnail-container");

let activeImage = 0; //starts off with 1st image

const setActiveImage = (image) => {
  mainImg.src = image.src.replace("-thumbnail", ""); //change main photo when thumbnail clicked
  lightboxMainImg.src = image.src.replace("-thumbnail", ""); //change lightbox main photo
  activeImage = thumbnailArray.indexOf(image); //record index of active image
};

thumbnails.forEach((image) => {
  image.addEventListener("click", (e) => {
    //change main photo
    setActiveImage(image);
    //remove 'selected' thumbnail
    thumbnailDivs.forEach((div) => {
      div.classList.remove("active");
    });
    //change active thumbnail
    image.parentElement.classList.add("active");
  });
});

//Making lightbox appear
//Variables
const lightboxEnabled = document.querySelector(".photo.main");
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxBtns = document.querySelectorAll(".lightbox-btn");
const lightboxBtnLeft = document.getElementById("left");
const lightboxBtnRight = document.getElementById("right");
const lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnail-img");
const lightboxThumbnailArray = Array.from(lightboxThumbnails);

//Functions of lightbox
const changeLightboxThumbnail = () => {
  lightboxThumbnailDivs.forEach((div) => {
    div.classList.remove("active");
  });
  lightboxThumbnailArray[activeImage].parentElement.classList.add("active");
};

const showLightbox = () => {
  lightboxContainer.classList.add("active");
  changeLightboxThumbnail();
};

const hideLightbox = () => {
  lightboxContainer.classList.remove("active");
};

const transitionSlideLeft = () => {
  activeImage === 0
    ? setActiveImage(thumbnailArray[lastImage])
    : setActiveImage(thumbnailArray[activeImage - 1]);
  changeLightboxThumbnail();
};

const transitionSlideRight = () => {
  activeImage === lastImage
    ? setActiveImage(thumbnailArray[0])
    : setActiveImage(thumbnailArray[activeImage + 1]);
  changeLightboxThumbnail();
};

const transitionSlideHandler = (moveItem) => {
  moveItem.includes("left") ? transitionSlideLeft() : transitionSlideRight();
};

//Event listeners for lightbox
lightboxEnabled.addEventListener("click", () => {
  showLightbox();
});

lightboxContainer.addEventListener("click", () => {
  hideLightbox();
});

lightboxBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); //stop container from also being clicked and therefore closed
    transitionSlideHandler(e.currentTarget.id); //prints left or right
  });
});

lightboxThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    e.stopPropagation();
    setActiveImage(thumbnail);
    lightboxThumbnailDivs.forEach((div) => {
      div.classList.remove("active");
    });
    thumbnail.parentElement.classList.add("active");
    activeImage = lightboxThumbnailArray.indexOf(thumbnail);
  });
});

//Event listener to show cart
const cart = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");

cart.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

//Cart variables
const deleteButton = document.getElementsByClassName("delete")[0];
const checkoutButton = document.querySelector(".button-add.checkout");
const emptyBasket = document.getElementsByClassName("cart-empty")[0];
const cartItem = document.getElementsByClassName("cart-item")[0];
const addToCartButton = document.getElementById("addToCart");
const cartBadge = document.querySelector('.cart-counter');

//Start with empty basket
if (n === 0) {
  emptyBasket.style.display = "block";
  cartItem.classList.toggle("inactive");
  checkoutButton.style.display = "none";
}

//add to cart
addToCartButton.addEventListener("click", () => {
  if (cartItem.classList.contains("inactive") === true && n !== 0) {
    switchCart();
    cartContainer.classList.toggle("active");
    cartBadge.style.opacity = "1";
    cartBadge.innerHTML = n;
  }
});

//Delete item from cart
deleteButton.addEventListener("click", () => {
  switchCart();
  cartBadge.style.opacity = 0;
});

const changeDisplay = (item) => {
  if (item.style.display === "none") {
    item.style.display = "block";
  } else {
    item.style.display = "none";
  }
};

const switchCart = () => {
    cartItem.classList.toggle("inactive");
    changeDisplay(checkoutButton);
    changeDisplay(emptyBasket);
}

//Update cart quantity and total
//n is the qty selected on the page
const qtyElement = document.querySelector(".qty");
qtyElement.innerHTML = n;
const price = 125;
const totalElement = document.querySelector(".total");
totalElement.innerHTML = `$${(n * price).toFixed(2)}`;
//const total = parseFloat(totalElement.innerHTML.replace('$', ''));

const updateCartTotal = () => {
  qtyElement.innerHTML = n;
  totalElement.innerHTML = `$${(n * price).toFixed(2)}`;
};

//alert if click checkout button
checkoutButton.addEventListener('click', () => {
    alert('Thank you for checking out!');
    switchCart();
    n = 0;
    num.innerHTML = n;
    cartBadge.style.opacity = 0;
})
