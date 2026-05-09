import React from 'react';

const Cart = ({
  cart,
  onRemove,
  total,
  isPaying,
  paymentAmount,
  paymentChange,
  paymentError,
  onPayClick,
  onPaymentChange,
  onPaymentSubmit,
  formatProductPrice,
  formatPrice,
  onGenerateReceipt,
}) => {
  const cartItems = Object.values(cart);

  return (
    <div className="cart-section">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item-detail">
                {item.name} —{' '}
                <span className="price">{formatProductPrice(item)}</span>{' '}
                <span className="quantity">x {item.quantity}</span> ={' '}
                <span className="price">{formatPrice(item.price * item.quantity)}</span>
              </div>
              <button className="btn-remove" onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <p className="cart-total">Total: {formatPrice(total)}</p>

      <div className="cart-actions-row">
        <button className="btn-pay" onClick={onPayClick} disabled={cartItems.length === 0}>
          Pay
        </button>
      </div>

      {isPaying && (
        <form onSubmit={onPaymentSubmit} className="payment-section">
          <input
            type="number"
            min="0"
            step="0.01"
            value={paymentAmount}
            onChange={(e) => onPaymentChange(e.target.value)}
            placeholder="Amount tendered"
          />
          <button type="submit">Enter</button>
        </form>
      )}

      {paymentError && <p className="payment-error">{paymentError}</p>}

      {paymentChange !== null && !paymentError && (
        <>
          <p className={paymentChange < 0 ? 'payment-due' : 'payment-change'}>
            {paymentChange < 0
              ? `Amount due: ${formatPrice(Math.abs(paymentChange))}`
              : `Change: ${formatPrice(paymentChange)}`}
          </p>
          <div className="cart-actions-row" style={{ marginTop: '12px' }}>
            <button className="generate-receipt-btn" onClick={onGenerateReceipt}>
              Generate Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;