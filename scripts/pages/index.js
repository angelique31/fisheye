
/**
 * Fonction pour récupérer les données
 * @returns 
 */
async function getPhotographers() {
    return fetch ('data/photographers.json')
        .then((res) => {
            return res.json();
        })
        .then((datas) => {
            return datas;
        });    
}

/**
 * Fonction pour afficher les données
 * @param {*} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        
        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    console.log(photographers);
    
    displayData(photographers);
}

init();

/**
 * Factory function (fonction des données des photographes)
 * @param {*} data 
 * @returns - getUserCardDOM
 */
function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    
    /**
     * Fonction de la création des cartes des photographes
     * @returns 
     */
    
    const getUserCardDOM = () => `
                <article>
                    <a href= "photographer.html?${id}">
                        <img src="${picture}" alt="Photo de ${name}">
                    </a>
                    <div class=info>
                        <h2>${name}</h2>
                        <h3>${city}, ${country}</h3>
                        <p>${tagline}</p>
                        <span>${price}€/jour</span>
                    </div>
                </article>`;
    
    return { name, id, picture, city, country, tagline, price, getUserCardDOM};
}


