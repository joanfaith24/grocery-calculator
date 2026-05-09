import React, { useState } from 'react';

const TRANSACTIONS_KEY = 'grocery_transactions_v1';

const loadTransactions = () => {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const TransactionSearch = () => {
  const [serial, setSerial] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = serial.trim();
    if (!trimmed) return;
    const all = loadTransactions();
    const found = all.find((t) => t.serialNumber === trimmed);
    if (found) { setResult(found); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  const handleClear = () => { setSerial(''); setResult(null); setNotFound(false); };

  const handlePrint = () => window.print();

  return (
    <div className="card transaction-search-card">
      <h2>Search Transaction</h2>
      <form onSubmit={handleSearch} className="transaction-search-form">
        <label className="transaction-label">Enter Serial #:</label>
        <div className="transaction-input-row">
          <input
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="e.g. 384729103847"
            maxLength={12}
            className="search-bar"
          />
          <button type="submit" className="btn-search-tx">Search</button>
        </div>
      </form>

      {notFound && (
        <div className="tx-not-found">
          No transaction found for serial # <strong>{serial}</strong>.
        </div>
      )}

      {result && (
        <div className="tx-receipt">

          {/* ── CLOSE BUTTON ── */}
          <button className="tx-close-btn" onClick={handleClear}>✕ Close</button>

          {/* ── RECEIPT BOX (mirrors PrintReceipt exactly) ── */}
          <div className="receipt-box">

            {/* Store Header */}
            <div className="receipt-store-header">
              <div className="receipt-store-name">Joan's Minimart</div>
              <div className="receipt-store-sub">Operated by: Joan Faith</div>
              <div className="receipt-store-sub">VAT Reg TIN: 123-456-789-00000</div>
              <div className="receipt-store-sub">123 Sampaguita St., Brgy. Mabuhay,</div>
              <div className="receipt-store-sub">General Santos City, South Cotabato 9500</div>
            </div>

            <div className="receipt-divider" />

            {/* Sales Invoice Title */}
            <div className="receipt-invoice-title">SALES INVOICE</div>

            <div className="receipt-divider" />

            {/* Cashier Info Box */}
            <div className="receipt-info-box">
              <div className="receipt-info-row">
                <span className="receipt-info-label">Cashier:</span>
                <span className="receipt-info-value">{result.cashierName}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-info-label">Serial #:</span>
                <span className="receipt-info-value">{result.serialNumber}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-info-label">Date:</span>
                <span className="receipt-info-value">{result.date}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-info-label">Time:</span>
                <span className="receipt-info-value">{result.time}</span>
              </div>
            </div>

            <div className="receipt-divider" />

            {/* Items */}
            <ul className="receipt-list">
              {result.items.map((item, i) => (
                <li key={i} className="receipt-item">
                  <span className="receipt-item-name">
                    {item.name}
                    {item.unitPrice && (
                      <span className="receipt-item-unit"> {item.unitPrice} x{item.quantity}</span>
                    )}
                    {!item.unitPrice && (
                      <span className="receipt-item-unit"> x{item.quantity}</span>
                    )}
                  </span>
                  <span>{item.lineTotal}</span>
                </li>
              ))}
            </ul>

            <div className="receipt-divider" />

            {/* Tax Breakdown */}
            <div className="receipt-row">
              <span>Subtotal</span>
              <span>{result.subtotal || result.total}</span>
            </div>
            {result.taxRate > 0 ? (
              <div className="receipt-row receipt-tax-row">
                <span>
                  {result.taxName} ({((result.taxRate || 0) * 100).toFixed(result.taxRate % 0.01 === 0 ? 0 : 2)}%)
                  {result.usStateName && <span style={{fontSize:'11px',color:'#9ca3af'}}> — {result.usStateName}</span>}
                </span>
                <span>{result.taxAmount}</span>
              </div>
            ) : (
              <div className="receipt-row receipt-tax-row">
                <span>{result.taxName || 'Tax'}</span>
                <span>—</span>
              </div>
            )}

            <div className="receipt-divider" />

            {/* Total */}
            <div className="receipt-total-row">
              <span>TOTAL</span>
              <span>{result.total}</span>
            </div>

            {/* Amount Tendered */}
            {result.amountTendered && (
              <div className="receipt-row">
                <span>Amount Tendered</span>
                <span>{result.amountTendered}</span>
              </div>
            )}

            {/* Change / Amount Due */}
            {result.change != null && (
              <div className={`receipt-row ${result.change.startsWith('-') ? 'receipt-due' : 'receipt-change'}`}>
                <span>{result.change.startsWith('-') ? 'Amount Due' : 'Change'}</span>
                <span>{result.change.startsWith('-') ? result.change.slice(1) : result.change}</span>
              </div>
            )}

            <div className="receipt-divider" />

            <div className="receipt-footer">
              This serves as your official receipt.<br />
              Thank you for shopping at Joan's Minimart! 🙏
            </div>
          </div>

          {/* Print button */}
          <div className="receipt-actions" style={{ marginTop: '12px' }}>
            <button type="button" onClick={handlePrint} className="print-btn">
              🖨️ Print Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSearch;
