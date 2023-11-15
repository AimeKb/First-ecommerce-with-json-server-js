const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector('.details');


const renderDetails = async () => {
    const res = await fetch('http://localhost:3000/posts/' + id)
    const post = await res.json();

    const template = `
    <h1>${post.title}</h1>
    <p>${post.body.slice(0, 200)} </p>
    <p>${post.price}</p>
    <a href="/order.html?id=${post.id}">Order here</a>
    `

    container.innerHTML = template;


}

window.addEventListener('DOMContentLoaded', () => renderDetails() );