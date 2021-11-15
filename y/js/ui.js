const recipes = document.querySelector('.recipes');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

const renderReceipe = (data, id) => {

  const html = `
  <div class="card-panel recipe white row" data-id=${id}>
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons " data-id=${id}>delete_outline</i>
      </div>
    </div>
    `;
  recipes.innerHTML += html;
}

const removeReceipe = id => {
  const receipe = document.querySelector(`.recipe[data-id=${id}]`);
  receipe.remove();
}


form.addEventListener('submit', event => {
  event.preventDefault();
  const receipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  }
  db.collection('receipes').add(receipe)
    .catch(err => {
      console.log("something wnet wrong")
    })

  form.title.value = '';
  form.ingredients.value = '';
})

recipes.addEventListener('click', event => {
  console.log(event);
  if (event.target.tagName === 'I') {
    const id = event.target.getAttribute('data-id');
    db.collection('receipes').doc(id).delete();

  }
})