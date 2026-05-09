import React, { useState, useRef, useEffect, useCallback } from 'react';

const ProductList = ({ products, onAdd, formatProductPrice, onRemoveProduct, onEditProduct }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [confirmProduct, setConfirmProduct] = useState(null);
  const [toastName, setToastName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const menuRef = useRef(null);
  const btnRefs = useRef({});

  // Close menu on outside click or scroll
  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    const closeOnScroll = () => setOpenMenuId(null);
    document.addEventListener('mousedown', close);
    document.addEventListener('scroll', closeOnScroll, true);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('scroll', closeOnScroll, true);
    };
  }, []);

  const handleMenuToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
      return;
    }
    // Calculate fixed position from button's bounding rect
    const btn = btnRefs.current[id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.right - 140, // align right edge of menu to button
      });
    }
    setOpenMenuId(id);
  };

  const handleEditClick = (product) => {
    setOpenMenuId(null);
    onEditProduct(product);
  };

  const handleDeleteClick = (product) => {
    setOpenMenuId(null);
    setConfirmProduct(product);
  };

  const handleConfirmDelete = () => {
    const name = confirmProduct.name;
    onRemoveProduct(confirmProduct.id);
    setConfirmProduct(null);
    setToastName(name);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div style={{ position: 'relative' }}>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {confirmProduct && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">🗑️</div>
            <p className="modal-title">Delete Product?</p>
            <p className="modal-body">
              Are you sure you want to delete <strong>{confirmProduct.name}</strong>?
              This will also remove it from the cart if added.
            </p>
            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={() => setConfirmProduct(null)}>Cancel</button>
              <button className="modal-btn-delete" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS TOAST ── */}
      {showToast && (
        <div className="toast">
          ✓ <strong>{toastName}</strong> deleted successfully.
        </div>
      )}

      {/* ── DOTS MENU rendered at root level via fixed positioning ── */}
      {openMenuId !== null && (
        <div
          ref={menuRef}
          className="dots-menu"
          style={{ top: menuPos.top, left: Math.max(8, menuPos.left) }}
        >
          <button
            className="dots-menu-item"
            onClick={() => handleEditClick(products.find(p => p.id === openMenuId))}
          >
            ✏️ Edit
          </button>
          <button
            className="dots-menu-item dots-menu-item--delete"
            onClick={() => handleDeleteClick(products.find(p => p.id === openMenuId))}
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <div className="product-list-scroll">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="price">{formatProductPrice(product)}</span>
              </div>

              <div className="product-actions">
                <button className="btn-add" onClick={() => onAdd(product)}>Add</button>
                <div className="dots-wrapper">
                  <button
                    className="btn-dots"
                    ref={(el) => { btnRefs.current[product.id] = el; }}
                    onClick={() => handleMenuToggle(product.id)}
                    aria-label="More options"
                  >
                    ⋮
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
