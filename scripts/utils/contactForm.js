const contactBtn = document.querySelector('.contact_button');
const closeBtn = document.querySelector('.close');
const modalbg = document.querySelector('#contact_modal');

// 
/**
 * open modale
 */
function launchModal() {
    modalbg.style.display = 'block'; 
}
  
contactBtn.addEventListener('click', launchModal);

  
/**
   * close modale
   */
function closeModal() {
    modalbg.style.display = 'none'; 
}
  
closeBtn.addEventListener('click', closeModal);
  

// Les messages d'erreurs

const form = document.querySelector('form');

// const submitInput = document.querySelector('.contact_button_form');
const submitInput = form[form.length - 1];
/**
 * On point les inputs par leur id
 */
const inputs = document.querySelectorAll(
    '#first, #last, #email, #message'
);

/**
 * Fonction qui permet d'évoluer dans chacun des inputs
 * @param {*} e - object event
 * @param {*} e.target.value - value de l'input
 */
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        // console.log(e.target.value);
        switch (e.target.id) {
        case 'first':
            firstChecker(e.target.value);
            break;
        case 'last':
            lastChecker(e.target.value);
            break;
        case 'email':
            emailChecker(e.target.value);
            break;
        case 'message':
            messageChecker(e.target.value);
            break;
        default:
            null;
        }
    });
});


/**
 * function firstname (first)
 * @param {*} value
 * @returns - true pour la soumission du formulaire
 */
const firstChecker = (value) => {
    const firstContainer = document.querySelector('.first-container');
    const errorDisplay = document.querySelector('.first-container > span');
    let isValid = false;
  
    if (value.length < 2) {
        firstContainer.classList.add('error');
        errorDisplay.textContent =
        'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    } else {
        errorDisplay.textContent = '';
        isValid = true;
    }
    return isValid;
};

/**
 * function name (last)
 * @param {*} value
 * @returns - true pour la soumission du formulaire
 */
const lastChecker = (value) => {
    const lastContainer = document.querySelector('.last-container');
    const errorDisplay = document.querySelector('.last-container > span');
    let isValid = false;
  
    if (value.length < 2) {
        lastContainer.classList.add('error');
        errorDisplay.textContent =
        'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    } else {
        lastContainer.classList.remove('error');
        errorDisplay.textContent = '';
        isValid = true;
    }
    return isValid;
};
  
/**
   * function email
   * @param {*} value
   * @returns - true pour la soumission du formulaire
   */
const emailChecker = (value) => {
    const emailContainer = document.querySelector('.email-container');
    const errorDisplay = document.querySelector('.email-container > span');
    let isValid = false;
  
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        emailContainer.classList.add('error');
        errorDisplay.textContent = 'Veuillez entrer une adresse mail valide.';
    } else {
        errorDisplay.textContent = '';
        isValid = true;
    }
    return isValid;
};

/**
 * function firstname (first)
 * @param {*} value
 * @returns - true pour la soumission du formulaire
 */
const messageChecker = (value) => {
    const firstContainer = document.querySelector('.message-container');
    const errorDisplay = document.querySelector('.message-container > span');
    let isValid = false;
  
    if (value.length < 10) {
        firstContainer.classList.add('error');
        errorDisplay.textContent =
        'Veuillez entrer un message avec un minimum de 10 caractères.';
    } else {
        errorDisplay.textContent = '';
        isValid = true;
    }
    return isValid;
};

/**
 * Vérifier les inputs du formulaire avant sa soumission
 * @param {*} e - object event
 */
const onSubmit = (e) => {
    e.preventDefault();
  
    /**
     * Récupérer les valeurs des inputs du formulaire
     * @param {*} inputs - array: les tags du query selector
     * @returns - array: les données du query selector
     */
    const formValues = (inputs) => {
        let data = [];
    
        for (let i = 0; i < inputs.length; i++) {
            if (
                inputs[i].type === 'text' ||
                inputs[i].type === 'email' ||
                inputs[i].type === 'textarea'
            ) {
                data.push(inputs[i].value);
                // console.log(data);
            }
            
        }
        return data;
    };
  
    /**
     * Vérifie la valeur de chacun des inputs
     * @param {*} values - array: les données du query selector
     * @returns - boolean: true si valid
     */
    const formIsValid = (values) => {
        /**
       * Teste la validité de chaque input
       * @type boolean
       */
        let validInputs = [];
       
        validInputs.push(firstChecker(values[0]));
        validInputs.push(lastChecker(values[1]));
        validInputs.push(emailChecker(values[2]));
        validInputs.push(messageChecker(values[3]));
        
        let isValid = true;
  
        for (let i = 0; i < validInputs.length; i++) {
            if (validInputs[i] === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };
    
    // si Valid
    if (formIsValid(formValues(inputs))) {
        closeModal();
        window.location.reload();
      
    } else {
        launchModal();
    }
};
  
submitInput.addEventListener('click', (e) => onSubmit(e));
  


