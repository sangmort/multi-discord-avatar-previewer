document.addEventListener("DOMContentLoaded", function () {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");
    const maxFiles = 10;
    let avatarPreviewsCount = 0;
    userAvatarInput.addEventListener("change", handleAvatarChange);

    function handleAvatarChange() {
        const userAvatarFiles = userAvatarInput.files;
        if (!userAvatarFiles) return;
        if (userAvatarFiles.length > maxFiles) {
            showAlert("You can only upload a maximum of " + maxFiles + " files.");
            userAvatarInput.value = "";
            return;
        }
        const filesToProcess = Array.from(userAvatarFiles).slice(0, maxFiles - avatarPreviewsCount);
        const placeholdersLight = document.querySelectorAll(".avatar.placeholder");
        const placeholdersDark = document.querySelectorAll(".theme-container.dark-theme .avatar.placeholder");
        filesToProcess.forEach((file, i) => {
            if (avatarPreviewsCount >= maxFiles) {
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const avatarPreview = createAvatarPreview(file, reader.result);
                prependAvatarPreview(avatarPreview, avatarPreviewLight);
                prependAvatarPreview(avatarPreview, avatarPreviewDark);
                removePlaceholder(placeholdersLight[i]);
                removePlaceholder(placeholdersDark[i]);
                avatarPreviewsCount++;
            });
            reader.readAsDataURL(file);
        });
        if (avatarPreviewsCount + userAvatarFiles.length >= maxFiles) {
            disableFileInput();
        }
    }

    function createAvatarPreview(file, imageUrl) {
        const avatarPreview = document.createElement("div");
        avatarPreview.classList.add("avatar");
        avatarPreview.style.backgroundImage = `url(${imageUrl})`;
        avatarPreview.classList.toggle("placeholder", !file);
        return avatarPreview;
    }

    function prependAvatarPreview(avatarPreview, container) {
        const clonedPreview = avatarPreview.cloneNode(true);
        container.insertBefore(clonedPreview, container.firstChild);
    }

    function removePlaceholder(placeholder) {
        if (placeholder) {
            placeholder.remove();
        }
    }

    function disableFileInput() {
        userAvatarInput.disabled = true;
    }

    function showAlert(message) {
        alert(message);
    }

    function removeAllAvatarPreviews() {
        if (userAvatarInput.files.length < 1) {
            showAlert("No files uploaded");
            return;
        }
        const avatarPreviews = document.querySelectorAll(".avatar");
        avatarPreviews.forEach((preview) => {
            preview.remove();
        });
        const avatarPlaceholders = document.querySelectorAll(".avatar.placeholder");
        avatarPlaceholders.forEach((placeholder) => {
            placeholder.style.display = "block";
        });
        avatarPreviewsCount = 0;
        userAvatarInput.value = "";
        userAvatarInput.disabled = false;
    }
    document.getElementById("remove-previews-button").addEventListener("click", removeAllAvatarPreviews);
});
