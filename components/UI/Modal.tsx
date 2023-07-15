import type { FC, PropsWithChildren } from "react";

const Modal: FC<PropsWithChildren<{ modalId: string }>> = ({ children, modalId }) => {
  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative pt-10">
          <label htmlFor={modalId} className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
