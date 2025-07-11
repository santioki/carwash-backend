document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch bookings
    const bookingsRes = await fetch("https://carwash-backend-1-2urg.onrender.com/api/admin/bookings");
    if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");

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
    const contactsRes = await fetch("https://carwash-backend-1-2urg.onrender.com/api/admin/contacts");
    if (!contactsRes.ok) throw new Error("Failed to fetch contacts");

    const contacts = await contactsRes.json();
    const contactsContainer = document.getElementById("contact-messages");

    if (contacts.length === 0) {
      contactsContainer.innerHTML = "<p>No contact messages yet.</p>";
    } else {
      contacts.forEach(contact => {
        const contactEl = document.createElement("div");
        contactEl.className = "contact-entry";
        contactEl.id = `contact-${contact._id}`;
        contactEl.innerHTML = `
          <strong>Name:</strong> ${contact.name}<br>
          <strong>Email:</strong> ${contact.email}<br>
          <strong>Message:</strong> ${contact.message}<br>
          <button onclick="deleteContact('${contact._id}')">Delete</button>
          <hr>
        `;
        contactsContainer.appendChild(contactEl);
      });
    }

  } catch (err) {
    console.error("Failed to load data:", err);
    alert("Error loading data. Check server or response format.");
  }
});


// Delete a booking
async function deleteBooking(id) {
  const confirmDelete = confirm("Are you sure you want to delete this booking?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`https://carwash-backend-1-2urg.onrender.com/api/admin/bookings/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Booking deleted.");
      location.reload(); // reload to reflect change
    } else {
      alert("Failed to delete booking.");
    }
  } catch (err) {
    console.error("Error deleting booking:", err);
    alert("Error deleting booking.");
  }
}


// Delete a contact message
async function deleteContact(id) {
  if (!confirm("Are you sure you want to delete this message?")) return;

  try {
    const res = await fetch(`https://carwash-backend-1-2urg.onrender.com/api/admin/contacts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Message deleted.");
      document.getElementById(`contact-${id}`)?.remove(); // remove row by ID
    } else {
      alert("Failed to delete message.");
    }
  } catch (err) {
    console.error("Error deleting message:", err);
    alert("Error deleting message.");
  }
}
