document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");

  if (!form) {
    console.error("Booking form not found");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      fullName: document.getElementById("full-name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      service: document.getElementById("service").value,
      carSize: document.getElementById("car-size").value,
    };

    const bookingStatus = document.getElementById("bookingStatus");
    bookingStatus.textContent = "Submitting booking...";

    try {
      const response = await fetch("https://carwash-backend-1-2urg.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Raw response:", response);

      const result = await response.json();

      if (response.ok) {
        alert("Booking submitted successfully!");
        bookingStatus.textContent = "✅ Booking submitted successfully!";
        form.reset();
      } else {
        bookingStatus.textContent = "❌ Booking failed: " + (result.error || result.message || "Unknown error");
        alert("Booking failed: " + (result.error || result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      bookingStatus.textContent = "❌ Server error: " + error.message;
      alert("Server error: " + error.message);
    }
  });
});


