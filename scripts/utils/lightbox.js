// const article = document.querySelector('img');
// console.log(article)
const lightboxClose = document.querySelector('.lightbox_close');
const lightboxAppear = document.querySelector('.lightbox');

 
/**
 * open modale
 */
// function launchModal() {
//     article.style.display = 'block'; 
// }
  
// article.addEventListener('click', launchModal);

  
/**
   * close modale
   */
function closeModal() {
    lightboxAppear.style.display = 'none'; 
}
  
lightboxClose.addEventListener('click', closeModal);
  




