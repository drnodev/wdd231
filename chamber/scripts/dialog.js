
export const dialog = async () =>{
    document.querySelectorAll(".open-modal").forEach(button => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const modal = document.getElementById(targetId);
        if (modal) modal.showModal();
      });
    });

    // Cerrar el modal con botón
    document.querySelectorAll(".close-modal").forEach(button => {
      button.addEventListener("click", () => {
        const dialog = button.closest("dialog");
        if (dialog) dialog.close();
      });
    });

    // Cerrar modal al hacer clic fuera del contenido
    document.querySelectorAll("dialog").forEach(dialog => {
      dialog.addEventListener("click", e => {
        const rect = dialog.getBoundingClientRect();
        const clickedOutside =
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom;
        if (clickedOutside) dialog.close();
      });
    });
}