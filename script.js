
const teamMembers = [
  {
    id: 1,
    name: "Muti SOTY KMI",
    role: "Gretting Card",
    birthdate: "17102006", // Contoh tanggal lahir: 12 Mei 2000 (DDMMYYYY)
    avatar: "assets/muti.png",
    avatarPosition: "center 25%",
    colorTheme: {
      color1: "#FED2D6",
      color2: "#FFDFD3",
      btn1: "#E78895",
      btn2: "#F6A382"
    },
    teaser: "For Every Little Celebration.",
    paragraphs: [
      "Hai Mutiii! Makasih banyak ya udah mau pegang proker gretting cards selama ini.",
      "Aku tau proker ini mungkin kelihatannya kecil dibanding proker lainnya, tapi justru kamu yang bikin hal kecil itu tetap jalan dan terlaksana. Maaf selama kepengurusan aku kurang membersamai kamu sebagai kanit.",
      "Aku appreciate banget effort kamu selama ngurusin bagian ini. Kadang mungkin kerjaannya terliat sederhana, but it still matters, and you did your part really well.",
      "Seneng juga bisa liat kamu tanggung jawab selama di KMI. Semoga pengalaman selama di sini bisa jadi cerita baik yang nantinya kamu inget yaaw. Thank you for all the little things you’ve done, and thank you for being part of the my team! Jangan sombong kalau ketemu di lain waktu!!"
    ]
  },
  {
    id: 2,
    name: "Ganif Si Mas Fisip",
    role: "Pemegang Hari Besar",
    birthdate: "05092006", // Contoh tanggal lahir: 24 Oktober 1998 (DDMMYYYY)
    avatar: "assets/ganif.png",
    avatarPosition: "center 15%",
    colorTheme: {
      color1: "#E1DBF8",
      color2: "#DFE7FD",
      btn1: "#9B72CF",
      btn2: "#7887E8"
    },
    teaser: "For Every Story You Shared",
    paragraphs: [
      "Haiii Ganif! Makasih banyak ya udah mau pegang Hari Besar Nasional selama ini dan berbagai proker bidang lain yang kamu ikut handle. I really appreciate all the effort you put into it.",
      "Aku juga seneng kamu mau bergabung sama KMI. Maybe there were some ups and downs along the way, tapi kamu tetap mau tanggung jawab sama tugas kamu. Maaf selama kepengurusan aku kurang membersamai kamu sebagai kanit.",
      "Semoga apa yang kamu dapet selama di KMI bisa jadi pengalaman yang berguna buat kamu ke depannya yaaw. Thank you for all your hard work, and thank you for growing with us in KMI. Proud to have you in the team! Jangan sombong kalau ketemu di lain waktu!!"
    ]
  },
  {
    id: 3,
    name: "Naila Kakak SV Baik Hati",
    role: "Bu Manager Sosmed Kompas",
    birthdate: "08052006", // Contoh tanggal lahir: 05 Maret 2001 (DDMMYYYY)
    avatar: "assets/naila.png",
    avatarPosition: "center 20%",
    colorTheme: {
      color1: "#D8F1EE",
      color2: "#FFF1C5",
      btn1: "#5AA99E",
      btn2: "#E5A93B"
    },
    teaser: "For The One Behind The Screen.",
    paragraphs: [
      "Hai Nailaaa! Makasih banyak ya udah jadi orang yang selalu bisa aku andelin buat urusan social media Kompas. Aku tahu kadang ada aja hal-hal yang harus dikerjain di luar tupoksi kamu, tapi kamu tetap mau ngurusin di sela-sela ke hectic an sebagai anak teknik.",
      "Aku juga appreciate banget karena selama ini kamu mau diajak diskusi dan berproses bareng. I really appreciate all the effort you’ve put into KMI.",
      "Semoga setelah dari sini kamu bawa banyak pengalaman baik, bukan cuma tentang kerjaannya, tapi juga tentang proses dan orang-orang yang kamu temui. Thank you for being part of my team, and I'm really glad I got to work with you! Jangan lupa undang aku kalau sidang yakkkk"
    ]
  }
];

// State Management
let selectedMember = null;

// DOM Elements
const teamCardsContainer = document.getElementById("teamCardsContainer");
const passwordModal = document.getElementById("passwordModal");
const letterModal = document.getElementById("letterModal");

// Password Modal Elements
const modalMemberAvatar = document.getElementById("modalMemberAvatar");
const modalMemberName = document.getElementById("modalMemberName");
const modalMemberRole = document.getElementById("modalMemberRole");
const birthdateInput = document.getElementById("birthdateInput");
const errorMessage = document.getElementById("errorMessage");
const btnSubmitPassword = document.getElementById("btnSubmitPassword");
const btnToggleVis = document.getElementById("togglePasswordVisBtn");
const closePasswordModalBtn = document.getElementById("closePasswordModalBtn");

const letterRecipientName = document.getElementById("letterRecipientName");
const letterRecipientRole = document.getElementById("letterRecipientRole");
const letterBody = document.getElementById("letterBody");
const closeLetterModalBtn = document.getElementById("closeLetterModalBtn");

/**
 * Inisialisasi & Render 3 Kartu Anggota Tim
 */
function renderTeamCards() {
  teamCardsContainer.innerHTML = "";

  teamMembers.forEach((member) => {
    const cardEl = document.createElement("div");
    cardEl.className = "member-card";
    
    // Dynamic Custom CSS Variables for Pastel Themes
    cardEl.style.setProperty("--card-color-1", member.colorTheme.color1);
    cardEl.style.setProperty("--card-color-2", member.colorTheme.color2);
    cardEl.style.setProperty("--btn-grad-1", member.colorTheme.btn1);
    cardEl.style.setProperty("--btn-grad-2", member.colorTheme.btn2);

    cardEl.innerHTML = `
      <div class="avatar-container">
        <img 
          src="${member.avatar}" 
          alt="${member.name}" 
          class="avatar-image"
          style="object-position: ${member.avatarPosition || 'center top'};"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=FDE2E4&color=3D3A45&size=150'"
        >
        <span class="lock-badge" title="Terkunci dengan tanggal lahir">🔒</span>
      </div>

      <h2 class="member-name">${member.name}</h2>
      <span class="role-badge">${member.role}</span>
      
      <p class="card-teaser">${member.teaser}</p>

      <button class="btn-unlock-card" onclick="openPasswordModal(${member.id})">
        <span>Buka Surat</span>
        <span>💌</span>
      </button>
    `;

    teamCardsContainer.appendChild(cardEl);
  });
}

/**
 * Buka Dialog Password Tanggal Lahir
 */
window.openPasswordModal = function (memberId) {
  selectedMember = teamMembers.find((m) => m.id === memberId);
  if (!selectedMember) return;

  // Set Info di Modal
  modalMemberAvatar.src = selectedMember.avatar;
  modalMemberAvatar.style.objectPosition = selectedMember.avatarPosition || "center top";
  modalMemberAvatar.onerror = () => {
    modalMemberAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=FDE2E4&color=3D3A45&size=100`;
  };
  modalMemberName.textContent = selectedMember.name;
  modalMemberRole.textContent = selectedMember.role;

  // Reset Input & Pesan Error
  birthdateInput.value = "";
  birthdateInput.type = "password";
  btnToggleVis.textContent = "👁️";
  errorMessage.style.display = "none";

  // Tampilkan Modal
  passwordModal.classList.add("active");
  passwordModal.setAttribute("aria-hidden", "false");
  
  setTimeout(() => {
    birthdateInput.focus();
  }, 100);
};

/**
 * Tutup Modal Password
 */
function closePasswordModal() {
  passwordModal.classList.remove("active");
  passwordModal.setAttribute("aria-hidden", "true");
  selectedMember = null;
}

closePasswordModalBtn.addEventListener("click", closePasswordModal);
passwordModal.addEventListener("click", (e) => {
  if (e.target === passwordModal) closePasswordModal();
});

/**
 * Toggle Lihat / Sembunyikan Password
 */
btnToggleVis.addEventListener("click", () => {
  if (birthdateInput.type === "password") {
    birthdateInput.type = "text";
    btnToggleVis.textContent = "🙈";
  } else {
    birthdateInput.type = "password";
    btnToggleVis.textContent = "👁️";
  }
});

/**
 * Suara Lembut Web Audio API (Tanpa butuh file MP3 eksternal)
 */
function playCelebrationChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (chord manis)
    
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.value = freq;
      
      const startTime = audioCtx.currentTime + idx * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.95);
    });
  } catch (err) {
    // Ignore audio errors if blocked by browser policy
  }
}

/**
 * Efek Confetti Bintang & Kertas Pastel
 */
function fireCelebrationConfetti() {
  if (typeof confetti === "function") {
    // Ledakan pertama di tengah
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FED2D6", "#E1DBF8", "#DFE7FD", "#FFF1C5", "#E78895", "#9B72CF"]
    });

    // Sedikit semburan samping kanan-kiri
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFDFD3", "#D8F1EE", "#E78895"]
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#E1DBF8", "#FFF1C5", "#9B72CF"]
      });
    }, 250);
  }
}

/**
 * Validasi Password Tanggal Lahir
 */
function handlePasswordSubmit() {
  if (!selectedMember) return;

  const rawInput = birthdateInput.value.trim().replace(/[^0-9]/g, ""); // Ambil hanya angka
  const expectedPassword = selectedMember.birthdate.replace(/[^0-9]/g, "");

  if (rawInput === expectedPassword) {
    // Sukses!
    errorMessage.style.display = "none";
    const currentMember = selectedMember;
    
    // Suara manis & konfeti
    playCelebrationChime();
    fireCelebrationConfetti();
    
    // Tutup modal password, buka modal surat
    closePasswordModal();
    setTimeout(() => {
      openLetterModal(currentMember);
    }, 250);
  } else {
    // Password salah
    errorMessage.style.display = "block";
    birthdateInput.focus();
    birthdateInput.classList.remove("shake-effect");
    // Trigger re-flow for animation
    void birthdateInput.offsetWidth;
    birthdateInput.classList.add("shake-effect");
  }
}

btnSubmitPassword.addEventListener("click", handlePasswordSubmit);
birthdateInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handlePasswordSubmit();
  }
});

/**
 * Buka Surat Apresiasi
 */
function openLetterModal(member) {
  letterRecipientName.textContent = member.name || "";
  letterRecipientRole.textContent = member.role || "";

  // Render Paragraf Surat & Kutipan
  let contentHtml = "";
  if (Array.isArray(member.paragraphs)) {
    member.paragraphs.forEach((p) => {
      contentHtml += `<p>${p}</p>`;
    });
  }

  if (member.quote) {
    contentHtml += `<blockquote class="letter-highlight-quote">${member.quote}</blockquote>`;
  }

  letterBody.innerHTML = contentHtml;

  // Buka Modal
  letterModal.classList.add("active");
  letterModal.setAttribute("aria-hidden", "false");
}

/**
 * Tutup Modal Surat
 */
function closeLetterModal() {
  letterModal.classList.remove("active");
  letterModal.setAttribute("aria-hidden", "true");
}

closeLetterModalBtn.addEventListener("click", closeLetterModal);
letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) closeLetterModal();
});

// Jalankan Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  renderTeamCards();
});
