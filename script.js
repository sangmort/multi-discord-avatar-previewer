function getUserAvatars() {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");

    userAvatarInput.addEventListener("change", handleAvatarChange);

    function handleAvatarChange() {
        const userAvatarFiles = userAvatarInput.files;
        if (!userAvatarFiles) return;

        const placeholdersLight = document.querySelectorAll(
            ".avatar.placeholder"
        );
        const placeholdersDark = document.querySelectorAll(
            ".theme-container.dark-theme .avatar.placeholder"
        );

        Array.from(userAvatarFiles).forEach((file, i) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const avatarPreview = createAvatarPreview(file, reader.result);
                appendAvatarPreview(avatarPreview, avatarPreviewLight);
                appendAvatarPreview(avatarPreview, avatarPreviewDark);

                removePlaceholder(placeholdersLight[i]);
                removePlaceholder(placeholdersDark[i]);
            });
            reader.readAsDataURL(file);
        });
    }

    function createAvatarPreview(file, imageUrl) {
        const avatarPreview = document.createElement("div");
        avatarPreview.classList.add("avatar");
        avatarPreview.style.backgroundImage = `url(${imageUrl})`;
        avatarPreview.classList.toggle("placeholder", !file);

        return avatarPreview;
    }

    function appendAvatarPreview(avatarPreview, container) {
        const clonedPreview = cloneAvatarPreview(avatarPreview);
        container.appendChild(clonedPreview);
    }

    function cloneAvatarPreview(avatarPreview) {
        return avatarPreview.cloneNode(true);
    }

    function removePlaceholder(placeholder) {
        if (placeholder) {
            placeholder.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", getUserAvatars);
