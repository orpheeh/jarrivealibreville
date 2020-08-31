const _slides = document.querySelectorAll('.proposition-valeur');
let _currentSlide = 0;

AOS.init({ duration: 2000 });


update();

function plusSlide(){
    _currentSlide++;
    if(_currentSlide >= _slides.length){
        _currentSlide = 0;
    } 
    hideAllSlide();
    _slides[_currentSlide].classList.add('current-pv');
    update();
}

function minusSlide(){
    _currentSlide--;
    if(_currentSlide < 0){  
        _currentSlide = _slides.length-1;
    }
    hideAllSlide();
    _slides[_currentSlide].classList.add('current-pv'); 
}

function hideAllSlide(){
    _slides.forEach(slide => {
        slide.classList.remove('current-pv');
    })
}

function update(){
    setTimeout(() => {
        plusSlide();
    }, 5000);
}