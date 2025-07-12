document.addEventListener('DOMContentLoaded', async ()=>{
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');
    const result = document.getElementById('data-result');
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    const btnGrid  = document.getElementById('v-grid')
    btnGrid.addEventListener('click',()=>{
        handleTogleView('v-grid')
    })
    const btnList  = document.getElementById('v-list')
    btnList.addEventListener('click', ()=>{
        handleTogleView('v-list')
    })

  const showData = async () => {
  const request = await fetch('./data/members.json');
  const json = await request.json();
  
  
  result.innerHTML = '';

  json.map(item => {
    const div = document.createElement('div');
    div.classList.add('item');

    const image = document.createElement('img');
    image.width = 100
    image.src = item.image;
    image.alt = item.name;
    image.loading = 'lazy';
    image.classList.add(item.color || 'none');

    const name = document.createElement('div')
    name.innerHTML = `<small>${item.name}</small>`

    const phone = document.createElement('div')
    phone.classList.add('no320')
    phone.innerHTML = `<small>${item.phone}</small>`

    const website = document.createElement('div')
    website.innerHTML = `<small><a href='${item.website}' target='_blank'  >Website</a></small>`
    
    div.appendChild(image);
    div.appendChild(name)
    div.appendChild(phone)
    div.appendChild(website)
    result.appendChild(div);
  });
};


    const handleTogleView = async (kind) =>{
        btnGrid.classList.remove('active')
        btnList.classList.remove('active')
        result.classList.remove('grid')
        result.classList.remove('list')
        if(kind == 'v-list'){
            btnList.classList.add('active')
            result.classList.add('list')
        }else{
            btnGrid.classList.add('active')
            result.classList.add('grid')
        }
    }


    showData()


    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

})