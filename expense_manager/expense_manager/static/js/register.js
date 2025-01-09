console.log("Register working")

const usernameField=document.querySelector('#usernameField');
const feedbackArea=document.querySelector('.invalid_feedback');
const emailField=document.querySelector('#emailField');
const emailfeedbackArea=document.querySelector('.invalid_email_feedback')

const showPasswordToggle=document.querySelector('.showPasswordToggle')
const passwordField=document.querySelector('#passwordField')
const submitBtn=document.querySelector(".submit-btn")

const handleToggleInput=(e)=>{

if(showPasswordToggle.textContent==='SHOW'){
    showPasswordToggle.textContent='HIDE';
    passwordField.setAttribute('type','text');
}else{
    showPasswordToggle.textContent='SHOW';
    passwordField.setAttribute('type','password')
}

}

showPasswordToggle.addEventListener('click',handleToggleInput);

emailField.addEventListener('keyup', (e) =>{

    const emailVal=e.target.value;

    console.log('email',emailVal)

    emailField.classList.remove('is-invalid');
    emailfeedbackArea.style.display="none";

    if(emailVal.length>0){
        fetch("/authentication/validate-email",{
            body: JSON.stringify({ email:emailVal }),
            method: "POST",
        })
        .then(res=>res.json())
        .then(data =>{
            console.log("data",data);
            if(data.email_error){
                submitBtn.disabled=true;
                emailField.classList.add('is-invalid');
                emailfeedbackArea.style.display="block";
                emailfeedbackArea.innerHTML= '<p> ' + data.email_error + '</p>';
            }else{
                submitBtn.removeAttribute("disabled")
            }
        });
    }

})

usernameField.addEventListener('keyup',(e)=> {

    const usernameVal=e.target.value;

    console.log('usernameVal',usernameVal)

    usernameField.classList.remove('is-invalid');
    feedbackArea.style.display="none";

    if(usernameVal.length>0){
        fetch("/authentication/validate-username",{
            body: JSON.stringify({ username:usernameVal }),
            method: "POST",
        })
        .then(res=>res.json())
        .then(data =>{
            console.log("data",data);
            if(data.Username_Error){
                submitBtn.disabled=true;
                usernameField.classList.add('is-invalid');
                feedbackArea.style.display="block";
                feedbackArea.innerHTML= '<p> ' + data.Username_Error + '</p>';
            }else{
                submitBtn.removeAttribute("disabled")
            }
        });
    }

})