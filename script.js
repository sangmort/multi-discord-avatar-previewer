document.addEventListener("DOMContentLoaded", function () {
    // Multiple Discord Avatar Previewer
    const userAvatarInput = document.getElementById("user-avatar-input");
    const avatarPreviewLight = document.getElementById("avatar-preview-light");
    const avatarPreviewDark = document.getElementById("avatar-preview-dark");
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
                    showAlert(
                        "Only 10 file previews at a time, remove some previews or click the reset button to add more."
                    );
                    userAvatarInput.disabled = true;
                }
            });

            reader.readAsDataURL(file);
        });

        // hide instructions wrapper when files are uploaded
        document.querySelector(".instructions-wrapper").style.display = "none";

        // show avatar theme wrapper & reset button when files are uploaded
        document.querySelector(".theme-wrapper").style.display = "flex";
        document.getElementById("remove-previews-button").style.display = "flex";
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
        removeButton.textContent = "remove";
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
        removeAvatarPreview(avatarPreviewLight.children[lightThemeIndex], lightThemeIndex);
        removeAvatarPreview(avatarPreviewDark.children[darkThemeIndex], darkThemeIndex);
    }

    function removeAvatarPreview(avatarPreview, index) {
        const placeholder = createPlaceholder(index);
        avatarPreview.replaceWith(placeholder);

        const lightThemePreview = avatarPreviewLight.children[index];
        if (lightThemePreview) {
            lightThemePreview.replaceWith(placeholder.cloneNode(true));
        }

        const darkThemePreview = avatarPreviewDark.children[index];
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
            showAlert("You haven't uploaded any images yet to reset.");
            return;
        }

        toggleAvatars();
        avatarPreviewsCount = 0;
        userAvatarInput.value = "";
        userAvatarInput.disabled = false;
    }

    function toggleAvatars() {
        document.querySelectorAll(".avatar").forEach((preview) => {
            preview.remove();
        });

        document.querySelectorAll(".avatar.placeholder").forEach((placeholder) => {
            placeholder.style.display = "block";
        });
    }

    function showAlert(message) {
        alert(message);
    }

    document.getElementById("remove-previews-button").addEventListener("click", removeAllAvatarPreviews);

    // Modal
    const openModal = document.querySelectorAll("[data-open]");
    const closeModal = document.querySelectorAll("[data-close]");
    const modalIsVisible = "is-visible";

    for (const element of openModal) {
        element.addEventListener("click", function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(modalIsVisible);
        });
    }

    for (const element of closeModal) {
        element.addEventListener("click", function () {
            const modal = this.closest(".modal");
            modal.classList.remove(modalIsVisible);
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(modalIsVisible);
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(modalIsVisible);
        }
    });

    // Prevent Scrolling
    window.addEventListener("scroll", preventMotion, false);
    window.addEventListener("touchmove", preventMotion, false);

    function preventMotion(event) {
        window.scrollTo(0, 0);
        event.preventDefault();
        event.stopPropagation();
    }
});
