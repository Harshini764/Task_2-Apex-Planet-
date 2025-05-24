const predefinedImages = [
  {
    url: "https://static.toiimg.com/thumb/imgsize-23456,msid-114171738,width-600,resizemode-4/114171738.jpg",
    caption: "Mona Lisa by Leonardo da Vinci (1503)"
  },
  {
    url: "https://static.toiimg.com/thumb/imgsize-23456,msid-114171747,width-600,resizemode-4/114171747.jpg",
    caption: "The Starry Night by Vincent van Gogh (1889)"
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/WLA_metmuseum_Water_Lilies_by_Claude_Monet.jpg/250px-WLA_metmuseum_Water_Lilies_by_Claude_Monet.jpg",
    caption: "Water Lilies by Claude Monet (1916)"
  },
  {
    url: "https://static.toiimg.com/thumb/imgsize-23456,msid-114171804,width-600,resizemode-4/114171804.jpg",
    caption: "The Scream by Edvard Munch (1893)"
  },
  {
    url: "https://static.toiimg.com/thumb/imgsize-23456,msid-114171771,width-600,resizemode-4/114171771.jpg",
    caption: "Girl with a Pearl Earring by Johannes Vermeer (1665)"
  },
  {
    url: "https://www.inspicanvas.com/cdn/shop/products/11_1024x1024.jpg?v=1586201357",
    caption: "Radha In The Moonlight by Raja Ravi Varma (1890)"
  }
];

// Load images from localStorage or use predefined on first load
document.addEventListener('DOMContentLoaded', () => {
  let images = JSON.parse(localStorage.getItem('galleryImages') || 'null');
  if (!Array.isArray(images) || images.length === 0) {
    images = predefinedImages;
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }
  images.forEach(img => addImageToDOM(img.url, img.caption));
});

function addImage() {
  const url = document.getElementById('imageUrl').value.trim();
  const caption = document.getElementById('imageCaption').value.trim();
  if (!url) {
    alert('Please enter an image URL.');
    return;
  }
  addImageToDOM(url, caption);
  saveImage(url, caption);
  document.getElementById('imageUrl').value = '';
  document.getElementById('imageCaption').value = '';
}

function addImageToDOM(url, caption) {
  const gallery = document.getElementById('gallery');
  const wrapper = document.createElement('div');
  wrapper.className = 'img-wrapper';

  const img = document.createElement('img');
  img.src = url;
  img.alt = caption || 'Gallery Image';
  img.onerror = function() {
    this.src = 'https://via.placeholder.com/200x180?text=Image+Not+Found';
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.onclick = function() {
    wrapper.remove();
    removeImage(url, caption);
  };

  wrapper.appendChild(img);

  if (caption) {
    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.textContent = caption;
    wrapper.appendChild(cap);
  }

  wrapper.appendChild(removeBtn);
  gallery.appendChild(wrapper);
}

function saveImage(url, caption) {
  let images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
  images.push({ url, caption });
  localStorage.setItem('galleryImages', JSON.stringify(images));
}

function removeImage(url, caption) {
  let images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
  images = images.filter(img => !(img.url === url && img.caption === caption));
  localStorage.setItem('galleryImages', JSON.stringify(images));
}

function clearGallery() {
  if (confirm('Clear all images from the gallery?')) {
    localStorage.removeItem('galleryImages');
    document.getElementById('gallery').innerHTML = '';
    // Reload predefined images after clear:
    predefinedImages.forEach(img => addImageToDOM(img.url, img.caption));
    localStorage.setItem('galleryImages', JSON.stringify(predefinedImages));
  }
}