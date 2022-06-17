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