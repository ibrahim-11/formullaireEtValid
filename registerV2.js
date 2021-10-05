
const validateFormData = (plainFormData) => {
    const errorMessages = {};
    for(const key in plainFormData){
        let currentValue = plainFormData[key];
        if(key === 'firstName' || key === 'lastName'){   
            const regex = /^([^0-9]*)$/;
            errorMessages[key] = currentValue.length < 1 || 
                            currentValue.trim() === '' ||
                            !currentValue.match(regex)  ? 'Saisie invalide !' : '';
        }
        if(key == 'email'){
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            errorMessages[key] = !currentValue.match(regex) ? 'Saisie invalide !' : '';
        }
        if(key === 'password'){
            errorMessages[key] = currentValue.length < 6 || currentValue.trim() === '' ? 'Saisie invalide !' : '';
            validateFormData({'pwConfirm':document.querySelector('#registrationForm input#pwConfirm').value})
        }
        if(key === 'pwConfirm'){   
            const passwordInputValue = document.querySelector('#registrationForm input#password').value;
            errorMessages[key] = currentValue !== (plainFormData['password'] || passwordInputValue) || currentValue.trim() === '' ? 'Saisie invalide !' : '';
        }
        if(key === 'tosCheck'){ 
            const tosCheckInputValue = document.querySelector('#registrationForm input#tosCheck').checked;
            errorMessages[key] = !tosCheckInputValue ? 'Agree ToS please !' : '';
        }
    }
    for(const errorsKey in errorMessages){
        const errorMsgElt = document.getElementById(`${errorsKey}ErrorMsg`);
        const errorMsg = errorMessages[errorsKey]
        errorMsgElt.innerText = errorMsg;
        allInputsValues[errorsKey] = errorMsg === '';
    }
    let isValid = Object.values(allInputsValues).every(item => {return item});
    if(isValid) {
        document.querySelector("#registrationForm #submitBtn").removeAttribute("disabled");
    }
    else{
        document.querySelector("#registrationForm #submitBtn").setAttribute("disabled",true);
    }
    return isValid;
}


const handleRegistrationFormSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    let plainFormData = Object.fromEntries(formData.entries());
    plainFormData.tosCheck = plainFormData.tosCheck ? true : false;
    if(validateFormData(plainFormData)){
        const formDataJsonString = JSON.stringify(plainFormData);
        const options = {
            method : 'post',
            body: formDataJsonString
        }
        fetch("/rest/register.php", options).then(resp => resp.text())
                                    .then(json => {
                                        console.log(json);
                                    });
    }
}
document.getElementById("registrationForm").addEventListener('submit',handleRegistrationFormSubmit);


const handleInputChange = (evt) => {
    //console.log(evt.currentTarget);
    const obj = {}
    obj[evt.currentTarget.id] = evt.currentTarget.value;
    //console.log(obj);
    validateFormData(obj);
}
const allInputsValues = {};
//document.querySelector("#registrationForm #submitBtn").setAttribute("disabled",true);
document.querySelectorAll('#registrationForm input').forEach(inputElement => {
    inputElement.addEventListener('change', handleInputChange);
    allInputsValues[inputElement.id] = false;
})
