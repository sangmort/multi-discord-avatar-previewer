document.addEventListener("DOMContentLoaded", function () {
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");
    const avatarPreviews = document.querySelectorAll(".avatar");
    const avatarPlaceholders = document.querySelectorAll(".avatar.placeholder");
    const maxFiles = 10;
    let avatarPreviewsCount = 0;
    userAvatarInput.addEventListener("change", handleAvatarChange);

    function handleAvatarChange() {
        const userAvatarFiles = userAvatarInput.files;
        if (!userAvatarFiles) return;
        const filesToProcess = Array.from(userAvatarFiles).slice(0, maxFiles - avatarPreviewsCount);
        const placeholdersLight = document.querySelectorAll(".avatar.placeholder");
        const placeholdersDark = document.querySelectorAll(".dark-theme .avatar.placeholder");
        filesToProcess.forEach((file, i) => {
            if (avatarPreviewsCount >= maxFiles) {
                return;
            }
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const avatarPreview = createAvatarPreview(file, reader.result, i);
                prependAvatarPreview(avatarPreview, avatarPreviewLight, i);
                prependAvatarPreview(avatarPreview, avatarPreviewDark, i);
                removePlaceholder(placeholdersLight[i]);
                removePlaceholder(placeholdersDark[i]);
                avatarPreviewsCount++;
                if (avatarPreviewsCount === maxFiles) {
                    showAlert("Only 10 file previews at a time, reset to add more.");
                    userAvatarInput.disabled = true;
                }
            });
            reader.readAsDataURL(file);
        });
    }

    function removePlaceholder(placeholder) {
        if (placeholder) {
            placeholder.remove();
        }
    }

    function createAvatarPreview(file, imageUrl, index) {
        const avatarPreview = document.createElement("div");
        avatarPreview.classList.add("avatar");
        avatarPreview.style.backgroundImage = `url(${imageUrl})`;
        avatarPreview.classList.toggle("placeholder", !file);
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "x";
        removeButton.dataset.index = index;
        removeButton.addEventListener("click", handleRemoveButtonClick);
        avatarPreview.appendChild(removeButton);
        return avatarPreview;
    }

    function handleRemoveButtonClick(event) {
        const removeButton = event.target;
        const avatarPreview = removeButton.parentNode;
        const index = Array.from(avatarPreview.parentNode.children).indexOf(avatarPreview);
        const lightThemeIndex = Array.from(avatarPreviewLight.children).indexOf(avatarPreview);
        const darkThemeIndex = Array.from(avatarPreviewDark.children).indexOf(avatarPreview);
        removeAvatarPreview(avatarPreview, index);
        if (lightThemeIndex !== -1) {
            const lightThemePreview = avatarPreviewLight.children[lightThemeIndex];
            removeAvatarPreview(lightThemePreview, lightThemeIndex);
        }
        if (darkThemeIndex !== -1) {
            const darkThemePreview = avatarPreviewDark.children[darkThemeIndex];
            removeAvatarPreview(darkThemePreview, darkThemeIndex);
        }
    }

    function removeAvatarPreview(avatarPreview, index) {
        const lightThemePreview = avatarPreviewLight.children[index];
        const darkThemePreview = avatarPreviewDark.children[index];
        const placeholder = createPlaceholder(index);
        avatarPreview.replaceWith(placeholder);
        if (lightThemePreview) {
            lightThemePreview.replaceWith(placeholder.cloneNode(true));
        }
        if (darkThemePreview) {
            darkThemePreview.replaceWith(placeholder.cloneNode(true));
        }
        avatarPreviewsCount--;
        if (avatarPreviewsCount < maxFiles) {
            userAvatarInput.disabled = false;
        }
        const remainingPreviews = document.querySelectorAll(".avatar");
        for (let i = index; i < remainingPreviews.length; i++) {
            remainingPreviews[i].querySelector(".remove-button").dataset.index = i;
        }
    }

    function createPlaceholder(index) {
        const placeholder = document.createElement("div");
        placeholder.classList.add("avatar", "placeholder");
        placeholder.dataset.index = index;
        return placeholder;
    }

    function prependAvatarPreview(avatarPreview, container, index) {
        const clonedPreview = avatarPreview.cloneNode(true);
        const clonedRemoveButton = clonedPreview.querySelector(".remove-button");
        clonedRemoveButton.dataset.index = index;
        clonedRemoveButton.addEventListener("click", handleRemoveButtonClick);
        container.insertBefore(clonedPreview, container.firstChild);
    }

    function removeAllAvatarPreviews() {
        if (userAvatarInput.files.length < 1) {
            showAlert("No files uploaded");
            return;
        }
        toggleAvatars();
        avatarPreviewsCount = 0;
        userAvatarInput.value = "";
        userAvatarInput.disabled = false;
    }

    function toggleAvatars() {
        avatarPreviews.forEach((preview) => {
            preview.remove();
        });
        avatarPlaceholders.forEach((placeholder) => {
            placeholder.style.display = "block";
        });
    }
    document.getElementById("remove-previews-button").addEventListener("click", removeAllAvatarPreviews);

    function showAlert(message) {
        alert(message);
    }
});
