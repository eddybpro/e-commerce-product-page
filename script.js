const menuBtn = document.querySelector('.menu'),
closeBtn = document.querySelector('.close'),
navLinksBox = document.querySelector('.nav-links'),
links = document.querySelectorAll('.link'),
prevBtn = document.querySelector('.prev-btn'),
nextBtn = document.querySelector('.next-btn'),
productImages = document.querySelectorAll('.img-slider img'),
plusBtn = document.querySelector('.plus'),
minusBtn = document.querySelector('.minus'),
productQuantity = document.querySelector('.product-num'),
addToCartBtn = document.querySelector('.add-to-cart-btn'),
popup = document.querySelector('.popup'),
cartBtn = document.querySelector('.cart'),
cartBox = document.querySelector('.cart-box'),
cartBoxWrapper = document.querySelector('.cart-info-wrapper'),
msgP = document.querySelector('.msg'),
desktopImg = document.querySelector('.desktop-img'),
thumbnailImg = document.querySelectorAll('.thumbnail-img'),
mainImgWrapper = document.querySelector('.img-wrapper'),
mainTxtWrapper = document.querySelector('.txt-container'),
absoluteWrapper = document.querySelector('.absolute-wrapper'),
desktopImagesSlider = document.querySelectorAll('.img-slider-desktop img'),
nextBtnDesktop = document.querySelector('.next-btn-desktop'),
prevBtnDesktop = document.querySelector('.prev-btn-desktop'),
thumbnailImgDesktop = document.querySelectorAll('.thumbnail-img-desktop'),
closeImgBtn = document.querySelector('.close-imgs');


let index = 0,
indexDesktop = 0,
quantNum = localStorage.getItem('quantNum') || 0;

closeImgBtn.addEventListener('click', ()=>{
    absoluteWrapper.classList.toggle('none');
    document.querySelector('body').classList.toggle('body-bg');
    mainImgWrapper.classList.toggle('filter');
    mainTxtWrapper.classList.toggle('filter');
});

desktopImg.addEventListener('click', ()=>{
    absoluteWrapper.classList.toggle('none');
    document.querySelector('body').classList.toggle('body-bg');
    mainImgWrapper.classList.toggle('filter');
    mainTxtWrapper.classList.toggle('filter');
})

desktopImagesSlider.forEach((img, idx)=>{
    img.style.left = `${idx * 100}%`;
})

nextBtnDesktop.addEventListener('click', ()=>{
    indexDesktop++;
    if(indexDesktop > desktopImagesSlider.length -1){
        indexDesktop = 0;
    }
    thumbnailImgDesktop.forEach(el=>{
        el.style.borderColor = 'hsl(0, 0%, 100%)';
        el.style.opacity = '1';
    })
    thumbnailImgDesktop[indexDesktop].style.borderColor = 'hsl(26, 100%, 55%)';
    thumbnailImgDesktop[indexDesktop].style.opacity = '0.5';
    sliderFn(desktopImagesSlider, indexDesktop);
    sliderFn(desktopImagesSlider, indexDesktop);
})

prevBtnDesktop.addEventListener('click', ()=>{
    indexDesktop--;
    if(indexDesktop < 0){
        indexDesktop = desktopImagesSlider.length -1;
    }
    thumbnailImgDesktop.forEach(el=>{
        el.style.borderColor = 'hsl(0, 0%, 100%)';
        el.style.opacity = '1';
    })
    thumbnailImgDesktop[indexDesktop].style.borderColor = 'hsl(26, 100%, 55%)';
    thumbnailImgDesktop[indexDesktop].style.opacity = '0.5';
    sliderFn(desktopImagesSlider, indexDesktop);
})

thumbnailImgDesktop.forEach((img, idx)=>{
    img.addEventListener('click',()=>{
        indexDesktop = idx;
        sliderFn(desktopImagesSlider, indexDesktop);
        thumbnailImgDesktop.forEach(el=>{
            el.style.borderColor = 'hsl(0, 0%, 100%)';
            el.style.opacity = '1';
        })
        img.style.borderColor = 'hsl(26, 100%, 55%)';
        img.style.opacity = '0.5';
    })
})

thumbnailImg.forEach((img, idx)=>{
    img.addEventListener('click', ()=>{
        thumbnailSliderFn(img, thumbnailImg, desktopImg, idx);
    })
})

function thumbnailSliderFn(curr, thumsImg, targetImg, idx){
    thumsImg.forEach(el=>{
        el.style.borderColor = 'hsl(0, 0%, 100%)';
        el.style.opacity = '1';
    })
    targetImg.src = `./images/image-product-${idx +1}.jpg`;
    curr.style.borderColor = 'hsl(26, 100%, 55%)';
    curr.style.opacity = '0.5';
}

if(quantNum == 0){
    popup.classList.add('none');
}else{
    popup.classList.remove('none');
    popup.textContent = quantNum;
    msgP.classList.add('none');
    createDiv();
    productQuantity.textContent = quantNum;
}

cartBtn.addEventListener('click',()=>{
    cartBox.classList.toggle('none');
})

cartBoxWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('checkout-btn')){
        cartBox.classList.toggle('none');
    }
})

cartBoxWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-btn') || e.target.classList.contains('delete')){
        quantNum=0;
        popup.textContent = quantNum;
        popup.classList.add('none');
        productQuantity.textContent = quantNum;
        cartBox.classList.toggle('none');
        cartBoxWrapper.removeChild(cartBoxWrapper.lastElementChild);
        msgP.classList.remove('none');

        localStorage.setItem('quantNum', `${quantNum}`);
        }
})

menuBtn.addEventListener('click', navFn);
closeBtn.addEventListener('click', navFn);
links.forEach(link=>{
link.addEventListener('click', navFn);
});

function navFn(){
    menuBtn.classList.toggle('none');
    closeBtn.classList.toggle('none');
    navLinksBox.classList.toggle('none-links');
}

productImages.forEach((img, idx)=>{
    img.style.left = `${idx * 100}%`;
})


nextBtn.addEventListener('click', ()=>{
    index++;
    if(index > productImages.length-1){
        index = 0;
    }
    sliderFn(productImages, index)
});

prevBtn.addEventListener('click', ()=>{
    index--;
    if(index < 0){
        index = productImages.length -1;
    }
    sliderFn(productImages, index);
})

function sliderFn(divContainer, idx){
    divContainer.forEach(img=>{
        img.style.transform = `translateX(-${idx * 100}%)`;
    })
}

plusBtn.addEventListener('click', ()=>{
    quantNum++;
    productQuantity.textContent = quantNum;
})

minusBtn.addEventListener('click', ()=>{
    quantNum--;
    if(quantNum<0)quantNum=0;
    productQuantity.textContent = quantNum;

})

addToCartBtn.addEventListener('click', ()=>{
    if(quantNum < 0)return;
    popup.classList.remove('none');
    popup.textContent = quantNum;
    msgP.classList.add('none');
    if(quantNum == 0){
        popup.classList.add('none');
    }
    localStorage.setItem('quantNum', `${quantNum}`);

    if(cartBoxWrapper.children.length>1){
        document.querySelector('.cart-num').textContent = quantNum;
        document.querySelector('.cart-amount').textContent = '$' + (quantNum * 125).toFixed(2);
    }else{
        createDiv();
    }

    if(quantNum == 0){
        cartBoxWrapper.removeChild(cartBoxWrapper.lastElementChild);
        msgP.classList.remove('none');
    };
    
})

function createDiv(){
    const div = document.createElement('div');
    div.innerHTML=`
        <div class="cart-sub-box">
        <img src="images/image-product-1-thumbnail.jpg" alt="" class="cart-thumbnail">
        <div class="txt-cart-box">
            <h4 class="txt-cart-title">
            Fall Limited Edition Sneakers
            </h4>
            <p class="txt-cart-info">
            $125.00 x 
            <span class="cart-num">
            ${quantNum}
            </span>
            <span class="cart-amount">$
            ${(quantNum * 125).toFixed(2)}
            </span>
            </p>
        </div>
        <button class="delete-btn">
            <img src="images/icon-delete.svg" alt="delete" class="delete">
        </button>
        </div>
    <button class="checkout-btn">
        checkout
    </button>
    `;
    cartBoxWrapper.append(div)
}