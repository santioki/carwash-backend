document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch bookings
    const bookingsRes = await fetch("https://carwash-backend-1-2urg.onrender.com/api/admin/bookings");
    const bookings = await bookingsRes.json();

    const bookingsContainer = document.getElementById("bookings-list");
    if (bookings.length === 0) {
      bookingsContainer.innerHTML = "<p>No bookings yet.</p>";
    } else {
      bookings.forEach(booking => {
        const bookingEl = document.createElement("div");
        bookingEl.className = "booking-entry";
       bookingEl.innerHTML = `
       <strong>Name:</strong> ${booking.fullName}<br>
       <strong>Phone:</strong> ${booking.phone}<br>
       <strong>Location:</strong> ${booking.location}<br>
        <strong>Service:</strong> ${booking.service}<br>
         <strong>Car Size:</strong> ${booking.carSize}<br>
        <button onclick="deleteBooking('${booking._id}')">Delete</button>
        <hr>
          `;

        bookingsContainer.appendChild(bookingEl);
      });
    }

    // Fetch contacts
    const contactsRes = await fetch("/api/admin/contacts");
    const contacts = await contactsRes.json();

    const contactsContainer = document.getElementById("contact-messages");
    if (contacts.length === 0) {
      contactsContainer.innerHTML = "<p>No contact messages yet.</p>";
    } else {
      contacts.forEach(contact => {
        const contactEl = document.createElement("div");
        contactEl.className = "contact-entry";
        contactEl.innerHTML = `
          <strong>Name:</strong> ${contact.name}<br>
          <strong>Email:</strong> ${contact.email}<br>
          <strong>Message:</strong> ${contact.message}<br>
          <hr>
        `;
        contactsContainer.appendChild(contactEl);
      });
    }

  } catch (err) {
    console.error("Failed to load data", err);
    alert("Error loading data");
  }
});


// Delete a booking
async function loadDashboardData() {
  try {
    // Fetch bookings
    const bookingsRes = await fetch('https://carwash-backend-1-2urg.onrender.com/api/admin/bookings');
    const bookings = await bookingsRes.json();

    const bookingsDiv = document.getElementById('bookings-list');
    bookingsDiv.innerHTML = `
      <table border="1">
        <tr>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Service</th>
          <th>Car Size</th>
          <th>Action</th>
        </tr>
        ${bookings.map(b => `
          <tr>
            <td>${b.fullName}</td>
            <td>${b.phone}</td>
            <td>${b.location}</td>
            <td>${b.service}</td>
            <td>${b.carSize}</td>
            <td><button onclick="deleteBooking('${b._id}')">Delete</button></td>
          </tr>
        `).join('')}
      </table>
    `;

    // Fetch contact messages (optional - same fix here if needed)
  } catch (err) {
    console.error("Error loading dashboard data:", err);
    // Optional: Only alert if it's a real failure, or remove this line
    alert("Error loading dashboard.");
  }
}

