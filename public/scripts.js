// const modalOverlay = document.querySelector('.modal-overlay');
// const cards = document.querySelectorAll('.card');

// for(let card of cards){
//   card.addEventListener("click", function(e){
//     const videoId = card.getAttribute('id')
//     window.location.href= `/video?id=${videoId}`
//   })
// }
const currentPage = location.pathname
// console.log(currentPage)
const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}
console.log("/instructors/2".includes("3"))