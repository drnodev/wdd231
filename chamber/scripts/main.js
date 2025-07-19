document.addEventListener('DOMContentLoaded', async () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');
    const result = document.getElementById('data-result');
    const searchInput = document.getElementById('search');
    const levelSelect = document.getElementById('member-level');


    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

    const btnGrid = document.getElementById('v-grid')
    btnGrid.addEventListener('click', () => {
        handleTogleView('v-grid')
    })
    const btnList = document.getElementById('v-list')
    btnList.addEventListener('click', () => {
        handleTogleView('v-list')
    })

    const displayCard = (item) => {
        const getLevel = (level) =>{
            switch (level) {
                case 1: return "Member"
                case 2: return "Silver"
                case 3: return "Gold"
            }
        }

        const div = document.createElement('div');
        div.classList.add('item');

        const image = document.createElement('img');
        image.width = 100
        image.src = item.image;
        image.alt = item.name;
        image.loading = 'lazy';
        image.classList.add(item.color || 'none');
        image.classList.add('no320')

        const name = document.createElement('div')
        name.innerHTML = `<small>${item.name}</small>`

        const addr = document.createElement('div')
        addr.innerHTML = `<small>${item.address}</small>`

        const phone = document.createElement('div')
        phone.innerHTML = `<small>${item.phone}</small>`

        const level = document.createElement('div')
        level.innerHTML = `<small>${getLevel(item.membership)}</small>`

        const website = document.createElement('div')
        website.innerHTML = `<small><a href='${item.website}' target='_blank'  >Website</a></small>`

        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(level)
        div.appendChild(phone)
        div.appendChild(addr)
        div.appendChild(website)
        result.appendChild(div);
    }

    const showData = async (name = '', level = 0) => {
        const request = await fetch('./data/members.json');
        const json = await request.json();

        result.innerHTML = '';
        json.filter(item => {
            const matchesLevel = level == 0 || item.membership == level;
            const matchesName = name.trim() === '' || item.name.toLowerCase().includes(name.trim().toLowerCase());
            return matchesLevel && matchesName;
        }).map(item => {
            displayCard(item)
        });
    };





    const handleTogleView = async (kind) => {
        btnGrid.classList.remove('active')
        btnList.classList.remove('active')
        result.classList.remove('grid')
        result.classList.remove('list')
        if (kind == 'v-list') {
            btnList.classList.add('active')
            result.classList.add('list')
        } else {
            btnGrid.classList.add('active')
            result.classList.add('grid')
        }
    }


    showData()


    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


    document.getElementById('btn-filter').addEventListener('click', () => {
        showData(searchInput.value, levelSelect.value)
    })

})