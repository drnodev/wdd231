

export const randMembers = async() => {
    
    const res = await fetch('./data/members.json'); 
    const data = await res.json();

    const filtered = data.filter(m => m.membership === 2 || m.membership === 3);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const members  = shuffled.slice(0, 3);


    const container = document.getElementById("spotlight-members");
    container.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("div");
      const color = member.color 
      card.classList.add("member-card"); 

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" class="${color}" loading="lazy" width="100" >
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;

      container.appendChild(card);
    });
}