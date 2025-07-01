import { showToast } from "./showToast";

export const copyLinkGroup = (_id) => {
  const theme = document.querySelector("html").className;

  const route = window.location.toString();

  navigator.clipboard
    .writeText(route.includes("/group") ? route : `${route}group/${_id}`)
    .then(() => {
      showToast("Link group copied succesfull", "success", 1500, theme);
    })
    .catch(() => {
      showToast("Error to copy the link", 'error', 1500, theme);
    });
};
