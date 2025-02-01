document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");
    const shareBtn = document.getElementById("shareBtn");

    let imageUrl = ""; // Wird für das Teilen benötigt

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.style.display = "block";
            };
            reader.readAsDataURL(file);

            // Bild als Blob speichern, um es zu teilen
            const formData = new FormData();
            formData.append("file", file);

            // Optional: Bild auf einen Server hochladen und eine URL erhalten
            try {
                const response = await fetch("upload.php", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                imageUrl = result.url; // URL des Bildes vom Server
                shareBtn.style.display = "inline-block";
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        }
    });

    shareBtn.addEventListener("click", () => {
        if (navigator.share) {
            navigator.share({
                title: "Mein Instagram-Post",
                text: "#meinHashtag #Beispiel",
                url: imageUrl
            }).then(() => console.log("Erfolgreich geteilt!"))
            .catch((error) => console.log("Fehler:", error));
        } else {
            alert("Teilen wird auf diesem Gerät nicht unterstützt.");
        }
    });
});
