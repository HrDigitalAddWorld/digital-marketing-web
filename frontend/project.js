document.addEventListener('DOMContentLoaded', () => {
  const readMoreBtns = document.querySelectorAll('.read-more');

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const content = card.querySelector('.more-content');

      if(card.classList.contains('expanded')){
        card.classList.remove('expanded');
        btn.textContent = "Read More";
      } else {
        card.classList.add('expanded');
        btn.textContent = "Read Less";
      }
    });
  });
});
// # MONGODB_URI=mongodb+srv://ankitias:AnkitEcom@ecommercecluster.u2h8h.mongodb.net/digital_addworld?retryWrites=true&w=majority&appName=ecommerceCluster 
// # mongodb+srv://digitaladdworldin:digitalCeo5936@digitaladdworldin.begmwnx.mongodb.net/?appName=digitaladdworldin
