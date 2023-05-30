function getUserAvatars() {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviews = document.getElementById("avatar-previews");

    function handleAvatarChange() {
        const userAvatarFiles = userAvatarInput.files;
        if (!userAvatarFiles) return;

        for (let i = 0; i < avatarPreviews.children.length; i++) {
            const avatarPreview = avatarPreviews.children[i];
            const file = userAvatarFiles[i];
            if (!file) {
                avatarPreview.style.backgroundImage = "";
                avatarPreview.classList.add("placeholder");
                continue;
            }

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                avatarPreview.classList.remove("placeholder");
                avatarPreview.style.backgroundImage = `url(${reader.result})`;
            });
            reader.readAsDataURL(file);
        }
    }

    userAvatarInput.addEventListener("change", handleAvatarChange);
}

document.addEventListener("DOMContentLoaded", getUserAvatars);
