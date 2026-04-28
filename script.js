document.addEventListener("DOMContentLoaded", function () {

    // 💬 ambil teks dari HTML
    const texts = document.getElementById("text-stack")
        .getAttribute("data-text")
        .split("|");

    // ⏱️ timing (SESUAI BEAT LAGU, BISA KAMU EDIT)
    const timings = [1, 4, 7, 10, 13]; 

    let index = 0;

    const stack = document.getElementById("text-stack");
    const btn = document.getElementById("playBtn");
    const music = document.getElementById("bgMusic");

    function showText() {
        if (index >= texts.length) return;

        let allText = stack.querySelectorAll("p");

        // max 3 baris
        if (allText.length >= 3) {
            stack.removeChild(allText[allText.length - 1]);
        }

        // ubah jadi old
        allText.forEach(t => {
            t.classList.remove("new");
            t.classList.add("old");
        });

        let p = document.createElement("p");

        // 🔥 highlight kata "celo"
        let text = texts[index].replace(
            /celo/i,
            "<span class='highlight'>celo</span>"
        );

        p.innerHTML = text;
        p.classList.add("new");

        stack.prepend(p);

        index++;
    }

    // 🎵 klik tombol
    btn.addEventListener("click", function () {
        music.play().catch(err => console.log(err));
        btn.style.display = "none";

        // 🔥 sync ke lagu
        music.ontimeupdate = function () {
            if (index < timings.length && music.currentTime >= timings[index]) {
                showText();
            }
        };
    });

});