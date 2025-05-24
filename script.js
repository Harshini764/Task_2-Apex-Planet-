document.getElementById('contactForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name) {
    alert("Please enter your name.");
    e.preventDefault();
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
    return;
  }

  alert("Form submitted successfully!");
});
