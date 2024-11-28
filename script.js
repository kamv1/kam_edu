document.addEventListener("DOMContentLoaded", () => {
    const authSection = document.getElementById("auth-section");
    const videoSection = document.getElementById("video-section");
    const quizSection = document.getElementById("quiz-section");
    const resultSection = document.getElementById("result-section");
    const completeVideoButton = document.getElementById("complete-video-button");
    const certificateButton = document.getElementById("certificate-button");
    const retryButton = document.getElementById("retry-button");
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");

    const VIDEO_DURATION_SECONDS = 2 * 60; // 2 dakika
    let videoWatchTime = 0;
    let videoTimer;

    const correctAnswers = {
        "question-1": "c", "question-2": "b", "question-3": "b", "question-4": "b",
        "question-5": "b", "question-6": "b", "question-7": "c", "question-8": "b",
        "question-9": "a", "question-10": "b", "question-11": "b", "question-12": "b",
        "question-13": "b", "question-14": "c", "question-15": "b", "question-16": "b",
        "question-17": "a", "question-18": "b", "question-19": "b", "question-20": "c",
        "question-21": "c", "question-22": "a", "question-23": "a", "question-24": "b",
        "question-25": "b",
    };

    // Kullanıcı giriş işlemi
    loginButton.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Lütfen kullanıcı adı ve şifrenizi girin!");
            return;
        }

        alert("Giriş başarılı!");
        authSection.classList.add("hidden");
        videoSection.classList.remove("hidden");

        // Zamanlayıcı başlat
        startVideoTimer();
    });

    // Kullanıcı kayıt işlemi
    registerButton.addEventListener("click", () => {
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const username = document.getElementById("register-username").value.trim();
        const password = document.getElementById("register-password").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!firstName || !lastName || !username || !password || !email) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        if (!validateEmail(email)) {
            alert("Lütfen geçerli bir e-posta adresi girin!");
            return;
        }

        alert(`Tebrikler ${firstName} ${lastName}, kayıt işleminiz tamamlandı! Şimdi giriş yapabilirsiniz.`);
        document.getElementById("register-form").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
    });

    // Videoyu tamamladığını belirten buton
    completeVideoButton.addEventListener("click", () => {
        alert("Tebrikler, videoyu tamamladınız!");
        videoSection.classList.add("hidden");
        quizSection.classList.remove("hidden");
    });

    // Zamanlayıcıyı başlat
    function startVideoTimer() {
        videoTimer = setInterval(() => {
            videoWatchTime++;

            // Süre dolduğunda butonu etkinleştir
            if (videoWatchTime >= VIDEO_DURATION_SECONDS) {
                clearInterval(videoTimer);
                completeVideoButton.disabled = false; // Butonu etkinleştir
            }
        }, 1000); // Her saniye
    }

    // Şıkların seçilme görünürlüğü
    document.querySelectorAll("form label").forEach((label) => {
        label.addEventListener("click", () => {
            const parent = label.closest("li");
            parent.querySelectorAll("label").forEach((sibling) =>
                sibling.classList.remove("selected")
            );
            label.classList.add("selected");
        });
    });

    // Quiz değerlendirme
    document.getElementById("quiz-form").addEventListener("submit", (e) => {
        e.preventDefault();

        let correctCount = 0;
        let wrongCount = 0;

        Object.keys(correctAnswers).forEach((question) => {
            const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);

            if (selectedAnswer) {
                selectedAnswer.value === correctAnswers[question] ? correctCount++ : wrongCount++;
            } else {
                wrongCount++;
                markQuestionAsWrong(question);
            }
        });

        const totalScore = correctCount * 4;
        showResults(correctCount, wrongCount, totalScore);
    });

   // Sertifika görüntüleme
certificateButton.addEventListener("click", () => {
    window.open("https://topbrandawards.org/wp-content/uploads/2024/05/top-brand-certifikate-1024x724.png", "_blank");
});

    // Eğitimi tekrar etme
    retryButton.addEventListener("click", () => {
        resetQuiz();
        resultSection.classList.add("hidden");
        videoSection.classList.remove("hidden");
        videoWatchTime = 0; // Zamanlayıcıyı sıfırla
        startVideoTimer(); // Zamanlayıcıyı yeniden başlat
    });

    // E-posta doğrulama
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Yanlış işaretlenen soruları belirginleştirme
    function markQuestionAsWrong(question) {
        const questionLi = document.querySelector(`input[name="${question}"]`).closest("li");
        if (questionLi) {
            questionLi.style.border = "2px solid red";
        }
    }

    // Sonuçları gösterme
    function showResults(correctCount, wrongCount, totalScore) {
        quizSection.classList.add("hidden");
        resultSection.classList.remove("hidden");

        const resultTableBody = document.getElementById("result-table-body");
        resultTableBody.innerHTML = `
            <tr>
                <td>${correctCount}</td>
                <td>${wrongCount}</td>
                <td>${totalScore}</td>
                <td>${totalScore >= 70 ? "Başarılı" : "Başarısız"}</td>
            </tr>
        `;

        if (totalScore >= 70) {
            document.getElementById("certificate-message").classList.remove("hidden");
            certificateButton.classList.remove("hidden");
            retryButton.classList.add("hidden");
        } else {
            document.getElementById("certificate-message").classList.add("hidden");
            certificateButton.classList.add("hidden");
            retryButton.classList.remove("hidden");
        }
    }

    // Quiz sıfırlama
    function resetQuiz() {
        document.querySelectorAll("form label").forEach((label) => label.classList.remove("selected"));
        document.querySelectorAll("li").forEach((li) => (li.style.border = "none"));
        document.getElementById("quiz-form").reset();
    }
});
