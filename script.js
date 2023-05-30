document.addEventListener("DOMContentLoaded", function () {
    function generateAvatarPreview() {
        const userAvatarInput = document.getElementById("user-avatar-input");
        const avatarPreviewLight = document.getElementById(
            "avatar-preview-light"
        );
        const avatarPreviewDark = document.getElementById(
            "avatar-preview-dark"
        );

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
                    const avatarPreview = createAvatarPreview(
                        file,
                        reader.result
                    );
                    prependAvatarPreview(avatarPreview, avatarPreviewLight);
                    prependAvatarPreview(avatarPreview, avatarPreviewDark);

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

        function prependAvatarPreview(avatarPreview, container) {
            const clonedPreview = cloneAvatarPreview(avatarPreview);
            container.insertBefore(clonedPreview, container.firstChild);
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

    function removeAvatarPreview() {
        const userAvatarInput = document.getElementById("user-avatar-input");
        if (userAvatarInput.files.length < 1) {
            alert("No files uploaded");
            return;
        }

        const avatarPreviews = document.querySelectorAll(".avatar");
        avatarPreviews.forEach((preview) => {
            preview.remove();
        });

        const placeholderAvatars = document.querySelectorAll(
            ".avatar.placeholder"
        );
        placeholderAvatars.forEach((placeholder) => {
            placeholder.style.display = "block";
        });
    }

    generateAvatarPreview();
    document
        .getElementById("remove-previews-button")
        .addEventListener("click", removeAvatarPreview);
});
