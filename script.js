function getUserAvatars() {
    const input = document.getElementById("avatar-selector-input");
    const avatarPreview = document.getElementById("avatar-pr");

    function handleAvatarChange() {
        const userAvatarFiles = input.files[0];
        if (!userAvatarFiles) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            avatarPreview.classList.remove("placeholder");
            avatarPreview.style.backgroundImage = `url(${reader.result})`;
        });
        reader.readAsDataURL(userAvatarFiles);
    }

    input.addEventListener("change", handleAvatarChange);
}

document.addEventListener("DOMContentLoaded", getUserAvatars);
