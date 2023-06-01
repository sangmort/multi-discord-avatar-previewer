document.addEventListener("DOMContentLoaded", function () {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");
    const maxFiles = 10;
    let avatarPreviewsCount = 0;
    userAvatarInput.addEventListener("change", handleAvatarChange);

    // Handle the change when a user selects avatar files
    function handleAvatarChange() {
        const selectedFiles = Array.from(userAvatarInput.files).slice(0, maxFiles - avatarPreviewsCount);
        if (selectedFiles.length === 0) return;
        if (selectedFiles.length > maxFiles) {
            showAlert("You can only upload a maximum of " + maxFiles + " files.");
            clearFileInput();
            return;
        }

        // Process each file and create avatar previews
        selectedFiles.forEach((file, i) => {
            if (avatarPreviewsCount >= maxFiles) return;
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const avatarPreview = createAvatarPreview(file, reader.result);
                insertAvatarPreview(avatarPreview, avatarPreviewLight);
                insertAvatarPreview(avatarPreview, avatarPreviewDark);
                removePlaceholder(i);
                avatarPreviewsCount++;
            });
            reader.readAsDataURL(file);
        });
        if (avatarPreviewsCount + selectedFiles.length >= maxFiles) {
            disableFileInput();
        }
    }

        // Create an avatar preview for a file and image URL
    function createAvatarPreview(file, imageUrl) {
        const avatarPreview = document.createElement("div");
        avatarPreview.classList.add("avatar");
        avatarPreview.style.backgroundImage = `url(${imageUrl})`;
        avatarPreview.classList.toggle("placeholder", !file);
        return avatarPreview;
    }

    function insertAvatarPreview(avatarPreview, container) {
        const clonedPreview = avatarPreview.cloneNode(true);
        container.insertBefore(clonedPreview, container.firstChild);
    }

    function removePlaceholder(index) {
        const placeholdersLight = document.querySelectorAll(".avatar.placeholder");
        const placeholdersDark = document.querySelectorAll(".theme-container.dark-theme .avatar.placeholder");
        removeElement(placeholdersLight[index]);
        removeElement(placeholdersDark[index]);
    }

    function removeElement(element) {
        if (element) {
            element.remove();
        }
    }

    function disableFileInput() {
        userAvatarInput.disabled = true;
    }

    function clearFileInput() {
        userAvatarInput.value = "";
    }

    function showAlert(message) {
        alert(message);
    }

    function removeAvatarPreview() {
        if (userAvatarInput.files.length < 1) {
            showAlert("No files uploaded");
            return;
        }
        const avatarPreviews = document.querySelectorAll(".avatar");
        avatarPreviews.forEach((preview) => {
            preview.remove();
        });
        const placeholderAvatars = document.querySelectorAll(".avatar.placeholder");
        placeholderAvatars.forEach((placeholder) => {
            placeholder.style.display = "block";
        });
        avatarPreviewsCount = 0;
        clearFileInput();
        userAvatarInput.disabled = false;
    }
    const removePreviewsButton = document.getElementById("remove-previews-button");
    removePreviewsButton.addEventListener("click", removeAvatarPreview);
});
