// /**
//  * Factory function (fonction des données des photographes)
//  * @param {*} data 
//  * @returns - getUserCardDOM
//  */
// function photographerFactory(data) {
//     const { name, id, portrait, city, country, tagline, price } = data;

//     const picture = `assets/photographers/${portrait}`;
    
//     /**
//      * Fonction de la création des cartes des photographes
//      * @returns 
//      */
    
//     const getUserCardDOM = () => `
//                 <article>
//                     <a href= "photographer.html?${id}">
//                         <img src="${picture}" alt="Photo de ${name}">
//                     <a/>
//                     <h2>${name}</h2>
//                     <h3>${city}, ${country}</h3>
//                     <p>${tagline}</p>
//                     <span>${price}€/jour</span>
                    
//                 </article>`;
    
//     return { name, id, picture, city, country, tagline, price, getUserCardDOM};
// }


