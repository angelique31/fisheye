

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
    contact.innerHTML = `Contactez-moi ${name}`;

    
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
    const lightbox = document.querySelector('.lightbox_container')
    let totalLikes = 0;

    // const menuSelect = document.querySelector(".intro");
    // switch (
    //     menuSelect.value // MISE EN PLACE DU TRIE
    //   ) {
    //     case "intro":
    //       medias.sort(function (a, b) {
    //         return b.likes - a.likes;
    //       });
    //       break;
    
    //     case "test1":
    //       medias.sort(function (a, b) {
    //         return new Date(b.date) - new Date(a.date);
    //       });
    //       break;
    
    //     case "test2":
    //       medias.sort(function (a, b) {
    //         return a.title.localeCompare(b.title);
    //       });
    //       break;
    //   }

    medias.forEach((media) => {
        const photographerModel = mediaFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        const userCardLightbox = photographerModel.getUserCardLightbox();

        photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);

        lightbox.insertAdjacentHTML('beforeEnd', userCardLightbox);

        totalLikes += media.likes;

        const  total_likes = document.querySelector('#total_likes')
        total_likes.innerHTML = totalLikes;
    });
    ajoutLikes();
}



async function initMedias() {
    // Récupère les datas des medias
    const  medias  = await getMedias();
    // console.log(medias);
    
    const idRequest = window.location.href.split('?')[1];
    const media =  await medias.filter(media => media.photographerId == idRequest);

    displayMedia(media);

    // const menuSelect = document.querySelector(".intro");
    // menuSelect.onchange = function () {
    //     displayMedia(media);
    // };
}
initMedias();


/**
 * Factory function (fonction des données des medias)
 * @param {*} data 
 * @returns - getUserCardDOM
 */
function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    
    const picture = `assets/medias/${photographerId}/${image} `;
   
    const videos = `assets/medias/${photographerId}/${video} `;
    
    // const boutonPlus = document.querySelector('#bouton_plus');
    
    
    /**
     * Fonction de la création des cartes des photographes
     * @returns 
     */
    const getUserCardDOM = () => `
                <article>
                    <a href= "photographer.html?${photographerId}">
                    ${video? `<video src="${videos}"></video>` 
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


function ajoutLikes() {
    const likes = document.querySelectorAll(".fa-heart"); 
    // console.log(likes);
    likes.forEach((e) => {
      e.addEventListener("click", function () {
        // const nbreLike = e.parentElement.children[1];
        const nbreLike = 0
        nbreLike.textContent++;
        total_likes.innerHTML++; // j'ajoute 1 au total des totalLikes du footer
        
      });
    })
}
/*********************Lightbox********************************* */
    window.onload = () => { 
        const images = document.querySelectorAll('.lightbox_container img ');
        console.log(images)
        // let imagesActives = 0;

        for (let i = 1; i < images.length; i+=1) {
            images [i].classList.add('hidden')
        }
        
        // lightboxClose.addEventListener('click', function () {
        //     images[imagesActives].classList.add('hidden');
        //     imagesActives += 1;

        //     images[imagesActives].classList.remove('hidden');
        // })
    }
 
    /**********Méthode de tri****** */

const modal = document.querySelector(".menucache")
const triage1 = document.querySelector(".test1")
const triage2 = document.querySelector(".test2")
const chevronUp = document.querySelector('.fa-chevron-up')
const chevronDown = document.querySelector('.fa-chevron-down')

function closed() {
    modal.style.display = "none";
}


function displayModal() {
    if (modal.style.display == "flex") {
        modal.style.animationName = "closeModale";
        triage1.style.animationName = "closeModale2";
        triage2.style.animationName = "closeModale2";
        setTimeout(closed, 500) 
        chevronUp.style.display = 'none';
        chevronDown.style.display = 'flex';
                     
    } else {
        modal.style.display = "flex";
        // console.log("ouverture")
        modal.style.animationName = "modale";
        triage1.style.animationName = "modaleX";
        triage2.style.animationName = "modaleX";
        chevronUp.style.display = 'flex';
        chevronDown.style.display = 'none';
    }
}


