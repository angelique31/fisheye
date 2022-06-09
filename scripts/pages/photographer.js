
/**
 * Fonction pour récupérer les données des photographes
 * @returns 
 */
async function getPhotographers() {
    return fetch ('data/photographers.json')
        .then((res) => {
            return res.json();
        })
        .then((datas) => {
            // console.log(datas);
            return datas;
        }); 

}

/**
 * Fonction pour afficher les données des photographes
 * @param {*} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photograph-header');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        
        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    //  console.log(photographers);
    const idRequest = window.location.href.split('?')[1];
    const photographer = await photographers.filter(photographer => photographer.id == idRequest);

    displayData(photographer);
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

    const priceDay = document.querySelector('.price-day');
    priceDay.innerHTML = `${price} €/jour`;

    const contact = document.querySelector('.contact');
    contact.innerHTML = `Contactez moi ${name}`;

    
    /**
     * Fonction de la création des cartes des photographes
     * @returns 
     */
    
    const getUserCardDOM = () => `
                <article>
                <div class=info>
                    <h2>${name}</h2>
                    <h3>${city}, ${country}</h3>
                    <p>${tagline}</p>
                    
                </div>
                <a href= "photographer.html?${id}">
                    <img src="${picture}" alt="Photo de ${name}">
                <a/>
                    
                </article>`;

    return { name, id, picture, city, country, tagline, price, getUserCardDOM};
}


/**
 * Fonction pour récupérer les données des medias
 * @returns media
 */
 async function getMedias() {
    return fetch ('data/photographers.json')
        .then((res) => {
            return res.json();
        })
        .then((datas) => {
            //  console.log(datas.media);
            return datas.media;
        }); 
}
/***************************************************/ 
/**
 * Fonction pour afficher les données des medias
 * @param {*} medias 
 */
async function displayMedia(medias) {
    const photographersSection = document.querySelector('.galleryPhotos');
    const lightbox = document.querySelector('.lightbox')
    
    medias.forEach((media) => {
        const photographerModel = mediaFactory(media);
        // console.log(photographerModel)
        const userCardDOM = photographerModel.getUserCardDOM();
        const userCardDOM1 = photographerModel.getUserCardLightbox();
        // console.log(userCardDOM)
        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);

        lightbox.insertAdjacentHTML('beforeEnd', userCardDOM1);
    });
}



async function initMedias() {
    // Récupère les datas des medias
    const  medias  = await getMedias();
    // console.log(medias);
    
    const idRequest = window.location.href.split('?')[1];
    const media =  await medias.filter(media => media.photographerId == idRequest);

    displayMedia(media);
}
initMedias();


/**
 * Factory function (fonction des données des medias)
 * @param {*} data 
 * @returns - getUserCardDOM
 */
function mediaFactory(data) {
    const { id, photographerId, title, image,video, likes, date, price } = data;
    
    const picture = `assets/medias/${photographerId}/${image} `;
   
    const videos = `assets/medias/${photographerId}/${video} `;
        
    
    /**
     * Fonction de la création des cartes des photographes
     * @returns 
     */
    const getUserCardDOM = () => `
                <article>
                    <a href= "photographer.html?${photographerId}">
                    ${video? `<video controls="controls" src="${videos}"></video>` 
                    :
                        `<img src="${picture}" alt="Photo de ${title}" id=${id}>` }
 
                    </a>
                    <div class=title-likes>
                        <h2>${title}</h2>
                        <div class=heart>
                            <span>${likes}</span>
                            <i class="fas fa-heart heart-fas"></i>
                        </div>
                    </div>
                </article>`

                
    const getUserCardLightbox = () => `
                    <a href= "photographer.html?${photographerId}">
                    ${video? `<video controls="controls" src="${videos}"></video>` 
                    :
                        `<img src="${picture}" alt="Photo de ${title}" id=${id}>` }

                    </a>
                    <h2>${title}</h2>
    `


    return { id, photographerId, title, image, video, likes, date, price, getUserCardDOM, getUserCardLightbox };
}






