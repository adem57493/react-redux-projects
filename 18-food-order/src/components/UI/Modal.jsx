import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
/** Esc tuşuna basmak, dialog'u kapatır.
Bu kapatma işlemi, dialog'un close() metodunun çağrılmasıyla eşdeğerdir ve onClose olayını 
tetikler. */

/**eğer dialog'a yerleşik onClose propunu eklemzsek esc(escape) tuşuna basıldığında dialog kapanır
 *  ancak state güncellenmez */