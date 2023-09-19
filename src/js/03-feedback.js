import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');


function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

function onSubmit(event) {
  event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.message.value;
  
    if (email === "" || password === "") {
        alert("Please fill in all the fields!");
        return
    } else {
        const enteredForm = {
            Email: email,
            Password: password
        };
        form.reset();
        console.log(enteredForm)
    }
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
}

emailInput.addEventListener('input', throttle(saveFormData, 500));
messageInput.addEventListener('input', throttle(saveFormData, 500));
form.addEventListener('submit', onSubmit);

window.addEventListener('load', loadFormData);


