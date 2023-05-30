function getUserAvatars() {
    const input = document.getElementById("avatar-selector-input");
    const avatarPreview = document.getElementById("avatar-target");

    function handleAvatarChange() {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            avatarPreview.classList.remove("placeholder");
            avatarPreview.style.backgroundImage = `url(${reader.result})`;
        });
        reader.readAsDataURL(file);
    }

    input.addEventListener("change", handleAvatarChange);
}

document.addEventListener("DOMContentLoaded", getUserAvatars);
