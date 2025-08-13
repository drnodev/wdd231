export const miniCart = () =>{
    try {    
        const btnMiniCart = document.getElementById('floatingCart')
        const cartDialog  = document.getElementById('cartDialog')
        const closeBtn    = document.getElementById('closeCart')
        const cartCount   = document.getElementById('cartCount')
       


        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartCount.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0) ||cart.length;

        if(cart.length < 1){
            return 
        }

        btnMiniCart.style.display = 'flex'
        btnMiniCart.addEventListener('click', ()=>{
            refreshProductsOnMyCart()
            cartDialog.showModal();
        })

        closeBtn.addEventListener('click', ()=>{
            cartDialog.close();
        })
        
    } catch (error) {
        
    }
}


export const refreshProductsOnMyCart = () =>{

    const cart = document.getElementById('cart')
    cart.style.padding = "1rem"
    cart.innerHTML = ""
    const prod = loadCart()
    if(prod.length < 1) return
    prod.map(product => {
        const card = document.createElement('div')
        card.classList.add('event-card')
        card.innerHTML += `
            <div>${product.title}<div>
            <div class='cart-event-price'>
                <div>Qty: ${product.quantity}</div>
                <div>Unit Price: $${product.price}</div>
                <div>Total: $${product.quantity * product.price}</div>
                <div>
                    <button>Remove</button>
                </div>
            <div>
       `
        cart.appendChild(card)
    })
}


export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  miniCart()
}

export const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (err) {
    console.error('Error loading cart:', err);
    return [];
  }
}


export const addToCart = (item) => {
  const cart = loadCart();
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1
    });
  }

  saveCart(cart);
}
