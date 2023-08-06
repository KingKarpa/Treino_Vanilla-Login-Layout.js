// ALL LAYOUTS FUNCTION: Verify input value
const page_forms = document.querySelectorAll("form");
page_forms.forEach(form => form.addEventListener('submit', (e) => {e.preventDefault()}));

const btn_Form = document.querySelectorAll(".c-form__btn");
let intervals = [];

function verifyForm(btnTrigger){
    let form_Inputs = btnTrigger.target.form.elements;
    
    for (let input of form_Inputs){

        if (input.type == "text" || input.type == "password"){
            
            let input_icon = input.parentElement.lastElementChild.firstChild;

            input_icon.classList.toggle("fa-shake", input.value.length < 8);

            if (input.classList.contains("js-input__email") && !input.classList.contains("fa-shake")){
                input_icon.classList.toggle("fa-shake", !input.value.includes("@"));
            }
        }
    }

    if (document.querySelector(".fa-shake")){
        notifyVerification(false, btnTrigger);
    } else {
        notifyVerification(true, btnTrigger);
    }
}

function notifyVerification(isValid, btnTrigger){
    let width = 100;
    let box_Notification;
    
    if (intervals[0]){
        clearInterval(intervals[0]);
        intervals.pop();
        const notification_boxes = document.querySelectorAll(".c-notification-box");
        notification_boxes.forEach(box => {
            box.style.opacity = 0;
            box.firstElementChild.style.width = "100%";
        });
    }

    if (isValid){
        box_Notification = document.querySelector(".js-notf__correct");
        box_Notification.style.opacity = 0;
        box_Notification.style.opacity = 1;

    } else {
        box_Notification = document.querySelector(".js-notf__incorrect");
        box_Notification.style.opacity = 0;
        box_Notification.style.opacity = 1;
    }

    const nofication_Interval = setInterval(() => {
        if (width > 0){
            width -= 1;
            box_Notification.firstElementChild.style.width = width + "%";
        } else {
            box_Notification.style.opacity = 0;
            box_Notification.firstElementChild.style.width = "100%";
            clearInterval(nofication_Interval);
        }
    }, 250);
    intervals.push(nofication_Interval);

    btnTrigger.target.removeEventListener('click', verifyForm);
    setTimeout(() => {
        let shaked_Icons = document.querySelectorAll(".fa-shake");
        shaked_Icons.forEach(icon => icon.classList.remove("fa-shake"));
        btnTrigger.target.addEventListener('click', verifyForm);
    }, 3000);
}

btn_Form.forEach(btn => btn.addEventListener('click', verifyForm));

// ALL LAYOUTS FUNCTION: Show/Hide form-box
const btn_Login = document.querySelector("#js-header__login-btn");
const btn_Hide = document.querySelectorAll(".js-btn__hide-form");
const link__Register = document.querySelector("#js-link__register");
const link__Reset = document.querySelector("#js-link__reset");

function hideForm(){
    let formBox_visible = document.querySelector(".u-form-box--show");
    
    if (formBox_visible){
        formBox_visible.classList.remove("u-form-box--show");
    } else {
        return
    }
}

btn_Hide.forEach(btn => btn.addEventListener('click', hideForm));

btn_Login.addEventListener('click', () => {
    hideForm();
    const formBox_Login = document.querySelector('#js-form-box__login');
    let isVisible = formBox_Login.classList.contains("u-form-box--show");

    if (!isVisible){
        formBox_Login.classList.add("u-form-box--show");
    } else {
        return
    }
});

link__Register.addEventListener('click', () => {
    const formBox_Register = document.querySelector("#js-form-box__register");
    let isVisible = formBox_Register.classList.contains("u-form-box--show");

    if (!isVisible){
        hideForm();
        formBox_Register.classList.add("u-form-box--show");
    } else {
        return
    }
});

link__Reset.addEventListener('click', () => {
    hideForm();
    const formBox_Reset = document.querySelector("#js-form-box__reset");
    let isVisible = formBox_Reset.classList.contains("u-form-box--show");

    if (!isVisible){
        formBox_Reset.classList.add("u-form-box--show");
    } else {
        return
    }
});

// MOBILE LAYOUT (max-width: 991px): Collapse Nav
const btn_Collapse = document.querySelector("#js-nav__collapse");

btn_Collapse.addEventListener('click', (e) => {
    const trigger = e.currentTarget;
    const nav_List = trigger.nextElementSibling;
    let list_isShow = nav_List.classList.contains("u-nav__list--show");

    if (!list_isShow){

        nav_List.classList.add("u-nav__list--show");
        trigger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        // NAV HIDE EVENT
        e.stopPropagation();
        document.addEventListener('click', hideNav);
    } 
});

// MOBILE LAYOUT (max-width: 991px): Hide nav
function hideNav(event){
    const nav_List = document.querySelector(".c-nav__list");
    let isList = event.target.classList.contains("c-nav__list");
    let isLink = event.target.classList.contains("s-nav__link");

    if (!isList && !isLink){
        nav_List.classList.remove("u-nav__list--show");
        nav_List.previousElementSibling.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.removeEventListener('click', hideNav);
    } else {
        return
    }
}