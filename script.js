document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const captureBtn = document.getElementById("captureBtn");
    const preview = document.getElementById("preview");
    const shareBtn = document.getElementById("shareBtn");
    const postBtn = document.getElementById("postBtn");
    const fbBtn = document.getElementById("fbBtn");

    let imageUrl = ""; // Speicherung der Bild-URL für das Teilen

    // 📸 Foto aufnehmen
    captureBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment"; // Zugriff auf Kamera
        input.addEventListener("change", handleFile);
        input.click();
    });

    // 📂 Bild hochladen
    fileInput.addEventListener("change", handleFile);

    function handleFile(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);

            imageUrl = URL.createObjectURL(file);
            shareBtn.style.display = "inline-block";
            fbBtn.style.display = "inline-block";
            postBtn.style.display = "inline-block";
        }
    }

    // 📤 Teilen-Funktion mit Hashtags & Texten aus dem PDF für Instagram
    shareBtn.addEventListener("click", () => {
        if (navigator.share) {
            navigator.share({
                title: "GrubenGoldCup 2025",
                text: "#ggc2025 #grubengoldcup #queerbadminton #queernrw @scaufruhr",
                url: imageUrl
            }).then(() => console.log("Erfolgreich geteilt!"))
            .catch((error) => console.log("Fehler:", error));
        } else {
            alert("Teilen wird auf diesem Gerät nicht unterstützt.");
        }
    });

    // 📘 Teilen auf Facebook
    fbBtn.addEventListener("click", () => {
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&quote=${encodeURIComponent("#ggc2025 #grubengoldcup #queerbadminton #queernrw @scaufruhr")}`;
        window.open(fbShareUrl, "_blank");
    });

    // 🚀 "Jetzt posten"-Button für Instagram (öffnet Instagram mit Bild)
    postBtn.addEventListener("click", () => {
        window.location.href = `instagram://library?AssetPath=${encodeURIComponent(imageUrl)}`;
    });
});
