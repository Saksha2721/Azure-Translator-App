async function translateText() {
    const key = document.getElementById("apiKey").value;
    const region = document.getElementById("region").value;
    const text = document.getElementById("inputText").value;
    const targetLang = document.getElementById("targetLang").value;
    const output = document.getElementById("output");

    if (!key || !region || !text) {
        alert("Fill all fields!");
        return;
    }

    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`;

    try {
        // Animated loading dots
        let dots = 0;
        output.classList.remove("show");

        const loading = setInterval(() => {
            dots = (dots + 1) % 4;
            output.innerText = "Translating" + ".".repeat(dots);
        }, 300);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": key,
                "Ocp-Apim-Subscription-Region": region,
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ Text: text }])
        });

        clearInterval(loading);

        const data = await response.json();
        const translatedText = data[0].translations[0].text;

        setTimeout(() => {
            typeEffect(output, translatedText);
            output.classList.add("show");
        }, 200);

    } catch (error) {
        output.innerText = "Error!";
    }
}

/* Typing animation */
function typeEffect(element, text) {
    element.innerText = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
            setTimeout(typing, 25);
        }
    }

    typing();
}