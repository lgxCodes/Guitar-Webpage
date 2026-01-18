let cart = [];
let quantity = 1;
let currentImageIndex = 0;
const images = ['G1.png', 'G2.png', 'G3.png', 'G4.png', 'G5.png', 'G6.png'];

const product = {
    name: 'Fender FA-135CE',
    price: 319.99
};

function initGallery() {
    updateImageCounter();
}

function selectImage(index) {
    currentImageIndex = index;
    updateMainImage();
    updateThumbnails();
    updateImageCounter();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateMainImage();
    updateThumbnails();
    updateImageCounter();
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateMainImage();
    updateThumbnails();
    updateImageCounter();
}

function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    const img = mainImage.querySelector('img');
    
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        img.src = images[currentImageIndex];
        img.alt = `Fender FA-135CE Guitar - View ${currentImageIndex + 1}`;
        mainImage.style.opacity = '1';
    }, 150);
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function updateImageCounter() {
    document.getElementById('currentImage').textContent = currentImageIndex + 1;
    document.getElementById('totalImages').textContent = images.length;
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    if (quantity < 10) {
        quantity++;
        input.value = quantity;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (quantity > 1) {
        quantity--;
        input.value = quantity;
    }
}

function addToCart() {
    for (let i = 0; i < quantity; i++) {
        cart.push({
            name: product.name,
            price: product.price
        });
    }
    
    updateCartCount();
    alert(`${quantity} x ${product.name} added to your cart!`);
    
    quantity = 1;
    document.getElementById('quantity').value = 1;
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    const count = cart.length;
    
    if (count > 0) {
        cartCountElement.textContent = count;
        cartCountElement.classList.remove('hidden');
    } else {
        cartCountElement.classList.add('hidden');
    }
}

function viewCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let cartMessage = 'Your Cart:\n\n';
    let total = 0;
    
    cart.forEach((item, index) => {
        cartMessage += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
        total += item.price;
    });
    
    cartMessage += `\nTotal: $${total.toFixed(2)}`;
    alert(cartMessage);
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

window.addEventListener('load', initGallery);