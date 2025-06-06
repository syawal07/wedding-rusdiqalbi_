document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openBtn");
  const soundToggle = document.getElementById("soundToggle");
  const bgMusic = document.getElementById("bgMusic");

  const isMuted = localStorage.getItem("muted") === "true";

  if (bgMusic) {
    bgMusic.muted = true; // autoplay tanpa blokir
    bgMusic
      .play()
      .then(() => {
        // Setelah berhasil autoplay, kita atur sesuai preferensi user
        bgMusic.muted = false;
        bgMusic.volume = isMuted ? 0 : 1;
        if (isMuted) {
          bgMusic.pause();
        }
      })
      .catch((e) => {
        console.warn("Autoplay gagal", e);
      });
  }

  if (soundToggle && bgMusic) {
    soundToggle.textContent = isMuted ? "🔇" : "🔊";

    soundToggle.addEventListener("click", () => {
      const currentlyMuted = localStorage.getItem("muted") === "true";
      if (currentlyMuted) {
        bgMusic.muted = false;
        bgMusic.play();
        bgMusic.volume = 1;
        localStorage.setItem("muted", "false");
        soundToggle.textContent = "🔊";
      } else {
        bgMusic.pause();
        bgMusic.volume = 0;
        localStorage.setItem("muted", "true");
        soundToggle.textContent = "🔇";
      }
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", function () {
      window.open("invitation.html", "_blank");
    });
  }

  // COUNTDOWN
  const countdown = () => {
    const countDate = new Date("Juni 19, 2025 10:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById("days").innerText = textDay;
    document.getElementById("hours").innerText = textHour;
    document.getElementById("minutes").innerText = textMinute;
    document.getElementById("seconds").innerText = textSecond;
  };

  setInterval(countdown, 1000);
  countdown();
});
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || message === "") {
    alert("Mohon isi nama dan pesan terlebih dahulu.");
    return;
  }

  const fullMessage = `Halo! Saya ${name} ingin mengucapkan:\n\n"${message}"\n\nSelamat atas pernikahannya! 🥳💍`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const waNumber = "6285343978656"; // Ganti dengan nomor WA tujuan

  const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

  // Arahkan ke WhatsApp
  window.open(waURL, "_blank");
});

function copyRekening(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin!");
  });
}

// Set href untuk tombol download QR
window.onload = () => {
  const qrImage = document.getElementById("qrImage");
  const downloadBtn = document.getElementById("downloadQR");

  // Tunggu gambar QR ter-load
  qrImage.onload = () => {
    fetch(qrImage.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        downloadBtn.href = url;
      });
  };
};

// Fungsi ambil parameter URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Jalankan setelah halaman siap
document.addEventListener("DOMContentLoaded", function () {
  const namaTamu = getQueryParam("to");
  const elemenNama = document.getElementById("guestName");
  if (namaTamu && elemenNama) {
    const namaFormatted = decodeURIComponent(namaTamu.replace(/\+/g, " "));
    elemenNama.textContent = namaFormatted;
  } else if (elemenNama) {
    elemenNama.textContent = "Tamu Undangan";
  }
});
