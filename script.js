document.addEventListener("DOMContentLoaded", function () {
    let websiteURL = "https://example.com"; // ضع هنا الموقع الذي تريد فتحه
    let popupSize = 150;
    let popups = [];
    let gifList = [
        "https://media4.giphy.com/media/l0Iy6fCmhY3hVGrzW/giphy.gif",
        "https://media1.giphy.com/media/l0Iy8UHZ0T5I0EaR2/giphy.gif",
        "https://media2.giphy.com/media/xUA7aLpbS0S3kr3s76/giphy.gif"
    ];
    
    let textContainer = document.getElementById("text-container");
    let gifContainer = document.getElementById("gif-container");
    let staticGif = document.getElementById("static-gif");
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
            bgMusic.play(); // تشغيل صوت التشويش
            startImageLoop();
            setTimeout(() => {
                bgMusic.pause(); // إيقاف صوت التشويش بعد 2.5 ثانية
            }, 2500);
        }, 2500);
    }

    function startImageLoop() {
        let currentIndex = 0;
        setInterval(() => {
            staticGif.src = gifList[currentIndex];
            currentIndex = (currentIndex + 1) % gifList.length;
        }, 400);
    }

    function openMultipleWindows(count) {
        for (let i = 0; i < count; i++) {
            let screenWidth = window.innerWidth;
            let screenHeight = window.innerHeight;
            let x = Math.floor(Math.random() * (screenWidth - popupSize));
            let y = Math.floor(Math.random() * (screenHeight - popupSize));

            let newWindow = window.open(websiteURL, "_blank", `width=${popupSize},height=${popupSize},left=${x},top=${y}`);
            if (newWindow) {
                popups.push(newWindow);
                newWindow.onbeforeunload = function () {
                    setTimeout(() => {
                        openMultipleWindows(popups.length * 2); // مضاعفة النوافذ عند الإغلاق
                    }, 500);
                };
            }
        }
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        // إذا كان على الهاتف، تفتح 5 نوافذ تلقائيًا
        openMultipleWindows(5);
    } else {
        // إذا كان على الكمبيوتر، تفتح 5 نوافذ عند الضغط على الماوس
        document.addEventListener("click", function () {
            openMultipleWindows(5);
        });

        // عند إغلاق أي نافذة، يتم مضاعفة العدد
        window.onbeforeunload = function () {
            openMultipleWindows(popups.length * 2);
        };
    }

    typeText();
});