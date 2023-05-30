function getUserAvatars() {
    const input = document.getElementById("avatar-selector-input");
    const avatarPreviews = document.getElementById("avatar-previews");
  
    function handleAvatarChange() {
      const userAvatarFiles = input.files;
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
  
    input.addEventListener("change", handleAvatarChange);
  }
  
  document.addEventListener("DOMContentLoaded", getUserAvatars);
  