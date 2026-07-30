export type ModalState = "loading" | "success" | "error";

export interface FormStatusModal {
  open: () => void;
  setState: (state: ModalState) => void;
  close: () => void;
}

export interface FormStatusModalHandlers {
  onRetry: () => void;
  onClose: (result: ModalState | null) => void;
}

export function createFormStatusModal(
  idPrefix: string,
  handlers: FormStatusModalHandlers,
): FormStatusModal {
  const modal = document.getElementById(`${idPrefix}-modal`);
  const panel = document.getElementById(`${idPrefix}-modal-panel`);
  const backdrop = document.getElementById(`${idPrefix}-modal-backdrop`);
  const closeButton = document.getElementById(`${idPrefix}-modal-close`);
  const retryButton = document.getElementById(`${idPrefix}-modal-retry`);
  const states = modal
    ? Array.from(modal.querySelectorAll<HTMLElement>("[data-modal-state]"))
    : [];

  let lastFocusedElement: HTMLElement | null = null;
  let lastResult: ModalState | null = null;

  function setState(state: ModalState) {
    states.forEach((el) => {
      el.hidden = el.dataset.modalState !== state;
    });
    if (state !== "loading") lastResult = state;
  }

  function open() {
    if (!modal) return;
    lastFocusedElement = document.activeElement as HTMLElement | null;
    modal.hidden = false;
    document.body.classList.add("overflow-hidden");
    panel?.focus();
  }

  function close() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("overflow-hidden");
    handlers.onClose(lastResult);
    lastFocusedElement?.focus();
  }

  closeButton?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  retryButton?.addEventListener("click", () => handlers.onRetry());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) close();
  });

  return { open, setState, close };
}
