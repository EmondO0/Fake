document.addEventListener("DOMContentLoaded", function () {
    let textContainer = document.getElementById("text-container");
    let glitchContainer = document.getElementById("glitch-container");
    let gifContainer = document.getElementById("gif-container");
    let staticGif = document.getElementById("static-gif");
    let bgMusic = document.getElementById("bg-music");

    let gifList = [
        "https://media4.giphy.com/media/l0Iy6fCmhY3hVGrzW/giphy.gif",
        "https://media1.giphy.com/media/l0Iy8UHZ0T5I0EaR2/giphy.gif",
        "https://media2.giphy.com/media/xUA7aLpbS0S3kr3s76/giphy.gif"
    ];

    let message = "تم تلاعب فيك";
    let index = 0;

    function typeText() {
        if (index < message.length) {
            textContainer.innerHTML += message[index];
            index++;
            setTimeout(typeText, 200);
        } else {
            startGlitch();
        }
    }

    function startGlitch() {
        setTimeout(() => {
            textContainer.style.display = "none";
            glitchContainer.style.opacity = 1;

            // تشغيل صوت التشويش
            bgMusic.src = "https://a.top4top.io/m_3362mlujq1.mp3";
            bgMusic.play();
        }, 2000);

        // بعد 2.5 ثانية، يتم استبدال التشويش بـ GIFs
        setTimeout(() => {
            glitchContainer.style.opacity = 0;
            gifContainer.style.opacity = 1;
            bgMusic.pause();
            bgMusic.currentTime = 0;
            startImageLoop();
        }, 4500);
    }

    function startImageLoop() {
        let currentIndex = 0;
        setInterval(() => {
            staticGif.src = gifList[currentIndex];
            currentIndex = (currentIndex + 1) % gifList.length;
        }, 400);
    }

    let websiteURL = "https://example.com"; // ضع هنا الموقع الذي تريد فتحه
    let popups = [];

    function openMultipleWindows(count) {
        for (let i = 0; i < count; i++) {
            let newWindow = window.open(websiteURL, "_blank");
            if (newWindow) {
                popups.push(newWindow);
                newWindow.onbeforeunload = function () {
                    openMultipleWindows(popups.length * 2);
                };
            }
        }
    }

    // 🔥 عند فتح الموقع، يتم فتح 5 نوافذ جديدة
    openMultipleWindows(5);

    typeText();
});