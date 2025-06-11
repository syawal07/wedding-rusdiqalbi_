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
const animatedSections = document.querySelectorAll(".animated-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1, // Munculkan animasi saat 10% bagian terlihat
  }
);

animatedSections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  // --- FUNGSI COUNTDOWN ---
  const countdown = () => {
    const countDate = new Date("June 19, 2025 10:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    if (gap > 0) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      document.getElementById("days").innerText = d < 10 ? "0" + d : d;
      document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
      document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
      document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    } else {
      // Jika waktu sudah lewat
      document.getElementById("countdown").innerHTML =
        "<p>Acara Telah Berlangsung</p>";
    }
  };
  setInterval(countdown, 1000);

  // --- FUNGSI TOMBOL MUSIK ---
  const bgMusic = document.getElementById("bgMusic");
  const soundToggle = document.getElementById("soundToggle");
  let isPlaying = false;

  // Autoplay setelah interaksi pertama
  document.body.addEventListener(
    "click",
    () => {
      if (!isPlaying) {
        bgMusic.play();
        soundToggle.innerHTML = "🔊";
        isPlaying = true;
      }
    },
    { once: true }
  );

  soundToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      soundToggle.innerHTML = "🔇";
    } else {
      bgMusic.play();
      soundToggle.innerHTML = "🔊";
    }
    isPlaying = !isPlaying;
  });

  // --- FUNGSI FORMULIR RSVP ---
  const rsvpForm = document.getElementById("rsvpForm");
  rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const guestName = document.getElementById("guestName").value;
    const guestMessage = document.getElementById("guestMessage").value;
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Anda

    const message = `Halo, saya ${guestName}. Selamat atas pernikahannya! ${guestMessage}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  });

  // --- FUNGSI ANIMASI SAAT SCROLL ---
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1, // elemen akan muncul saat 10% terlihat
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// --- FUNGSI SALIN NO. REKENING (ditempatkan di luar karena dipanggil oleh onclick) ---
function copyToClipboard(elementId) {
  const rekElement = document.getElementById(elementId);
  const textToCopy = rekElement.innerText;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Nomor rekening berhasil disalin!");
    })
    .catch((err) => {
      console.error("Gagal menyalin: ", err);
      alert("Gagal menyalin nomor rekening.");
    });
}
