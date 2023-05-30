function getUserAvatars() {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");

    function handleAvatarChange() {
        const userAvatarFiles = userAvatarInput.files;
        if (!userAvatarFiles) return;

        // Get all the placeholders for each theme
        const placeholdersLight = document.querySelectorAll(
            ".avatar.placeholder"
        );
        const placeholdersDark = document.querySelectorAll(
            ".theme-container.dark-theme .avatar.placeholder"
        );

        for (let i = 0; i < userAvatarFiles.length; i++) {
            const file = userAvatarFiles[i];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const avatarPreview = createAvatarPreview(file, reader.result);
                avatarPreviewLight.appendChild(avatarPreview.cloneNode(true));
                avatarPreviewDark.appendChild(avatarPreview.cloneNode(true));

                // Remove the corresponding placeholders
                if (placeholdersLight[i]) {
                    placeholdersLight[i].remove();
                }
                if (placeholdersDark[i]) {
                    placeholdersDark[i].remove();
                }
            });
            reader.readAsDataURL(file);
        }
    }

    function createAvatarPreview(file, imageUrl) {
        const avatarPreview = document.createElement("div");
        avatarPreview.classList.add("avatar");
        avatarPreview.style.backgroundImage = `url(${imageUrl})`;

        if (!file) {
            avatarPreview.classList.add("placeholder");
        }

        return avatarPreview;
    }

    userAvatarInput.addEventListener("change", handleAvatarChange);
}

document.addEventListener("DOMContentLoaded", getUserAvatars);
