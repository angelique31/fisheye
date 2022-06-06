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
            // console.log(datas.media);
            return datas.media;
        }); 
}

/**
 * Fonction pour afficher les données des medias
 * @param {*} medias 
 */
async function displayMedia(medias) {
    const photographersSection = document.querySelector('.galleryPhotos');

    medias.forEach((media) => {
        const photographerModel = mediaFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);

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
    // console.log(videos)
    const priceDay = document.querySelector('.price-day');
    priceDay.innerHTML =  `${price} €/jour`;
    
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

    return { id, photographerId, title, image, video, likes, date, price, getUserCardDOM };
}






