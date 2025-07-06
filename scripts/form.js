const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];




document.addEventListener('DOMContentLoaded',()=>{
  const select = document.getElementById('product');
  const form = document.querySelector('form');

   const showProduct = (productsArray) => {
      productsArray.forEach(product => {
          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.name;
          select.appendChild(option);
      });
  }

  form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let count = localStorage.getItem('count');
        if (count) {
            count = parseInt(count) + 1;
        } else {
            count = 1;
        }
        localStorage.setItem('count', count);

        const formData = {
            product:            select.value,
            rating:             document.querySelector('input[name="starts"]:checked')?.value || '',
            installationDate:   document.getElementById('install').value,
            features:           Array.from(document.querySelectorAll('input[name="feature[]"]:checked')).map(cb => cb.value),
            reviewText:         document.getElementById('reviewText').value,
            userName:           document.getElementById('name').value,
            submissionTimestamp:new Date().toISOString() 
        };

        let data = JSON.parse(localStorage.getItem('data') || '[]');
        data.push(formData);
        localStorage.setItem('data', JSON.stringify(data));


        window.location.href = form.action;
    });

  showProduct(products)

})





document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


