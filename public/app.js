let button = document.querySelector('#Submit-Btn');
button.addEventListener('click', () => {
  const first_name = document.getElementById('First-Name').value;
  const last_name = document.getElementById('Last-Name').value;
  const phone_no = document.getElementById('Phone-No').value;
  const email = document.getElementById('Email').value;
  const description = document.getElementById('Description').value;

  const contactData = {
    first_name: first_name,
    last_name: last_name,
    phone_no: phone_no,
    email: email,
    description: description,
  };

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message); // Show success message
        document.getElementById('First-Name').value = '';
        document.getElementById('Last-Name').value = '';
        document.getElementById('Phone-No').value = '';
        document.getElementById('Email').value = '';
        document.getElementById('Description').value = '';

      } else {
        alert('An error occurred');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit the form');
    });
})