// Countdown target is a UK local clock time (Europe/London), not UTC.
const countdownTimer = document.getElementById("countdown-timer");
const targetDateString = countdownTimer.getAttribute("data-target-date");

function ukLocalToUtcMillis(dateTimeString) {
    const match = String(dateTimeString).trim().match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
    );
    if (!match) {
        return Date.parse(dateTimeString);
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const minute = Number(match[5]);
    const second = Number(match[6] || 0);
    const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);

    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(new Date(utcGuess));

    const part = (type) => {
        const value = Number(parts.find((item) => item.type === type).value);
        return type === "hour" && value === 24 ? 0 : value;
    };

    const londonAsUtc = Date.UTC(
        part("year"),
        part("month") - 1,
        part("day"),
        part("hour"),
        part("minute"),
        part("second")
    );

    return utcGuess - (londonAsUtc - utcGuess);
}

const countdownDate = ukLocalToUtcMillis(targetDateString);

let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        clearInterval(countdownInterval);
    }
}

countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
