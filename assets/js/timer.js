// Get the countdown target date from the HTML
const countdownTimer = document.getElementById("countdown-timer");
const targetDateString = countdownTimer.getAttribute("data-target-date");

const targetDateInUK = new Date(
    new Date(targetDateString).toLocaleString("en-US", { timeZone: "Europe/London" })
);
const countdownDate = targetDateInUK.getTime();

let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the timer elements
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // If the countdown is over, display "00" in all fields
    if (distance < 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        clearInterval(countdownInterval);
    }
}

// Update the countdown every second
countdownInterval =  setInterval(updateCountdown, 1000);
