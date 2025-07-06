


document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;




document.addEventListener('DOMContentLoaded',()=>{
    const count         = localStorage.getItem('count');
    const countElement  = document.querySelector('.count span')
    countElement.innerHTML = `${count}`



    const data  = JSON.parse(localStorage.getItem('data'))
    const dataELement = document.querySelector('.data')
    dataELement.innerHTML = ""
    data.forEach(element => {
        const html = `
            <div class="item">
            <div><strong>Product:</strong> ${element.product}</div>
            <div><strong>Rating:</strong> ${element.rating} stars</div>
            <div><strong>Installation Date:</strong> ${element.installationDate}</div>
            <div><strong>Useful Features:</strong> ${element.features.join(', ')}</div>
            <div><strong>Review Text:</strong> ${element.reviewText || 'N/A'}</div>
            <div><strong>Reviewer Name:</strong> ${element.userName || 'Anonymous'}</div></div>`
        dataELement.innerHTML+= html
    });
})
