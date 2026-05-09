import React from 'react';

// Map currency to timezone
const currencyTimezone = {
  PHP: 'Asia/Manila',
  USD: 'America/New_York',
  SGD: 'Asia/Singapore',
  EUR: 'Europe/Paris',
  GBP: 'Europe/London',
  JPY: 'Asia/Tokyo',
  CNY: 'Asia/Shanghai',
  AUD: 'Australia/Sydney',
  CAD: 'America/Toronto',
  INR: 'Asia/Kolkata',
  NGN: 'Africa/Lagos',
  DZD: 'Africa/Algiers',
  EGP: 'Africa/Cairo',
  SAR: 'Asia/Riyadh',
  AED: 'Asia/Dubai',
  KRW: 'Asia/Seoul',
  HKD: 'Asia/Hong_Kong',
  NZD: 'Pacific/Auckland',
  CHF: 'Europe/Zurich',
  NOK: 'Europe/Oslo',
  SEK: 'Europe/Stockholm',
  KES: 'Africa/Nairobi',
  TZS: 'Africa/Dar_es_Salaam',
  MYR: 'Asia/Kuala_Lumpur',
  THB: 'Asia/Bangkok',
  VND: 'Asia/Ho_Chi_Minh',
  BRL: 'America/Sao_Paulo',
  MXN: 'America/Mexico_City',
  ARS: 'America/Argentina/Buenos_Aires',
  CLP: 'America/Santiago',
  COP: 'America/Bogota',
  PEN: 'America/Lima',
  ZAR: 'Africa/Johannesburg',
  GHS: 'Africa/Accra',
  MAD: 'Africa/Casablanca',
  TND: 'Africa/Tunis',
  XOF: 'Africa/Abidjan',
  ETB: 'Africa/Addis_Ababa',
  UGX: 'Africa/Kampala',
  RWF: 'Africa/Kigali',
  PKR: 'Asia/Karachi',
  BDT: 'Asia/Dhaka',
  LKR: 'Asia/Colombo',
  NPR: 'Asia/Kathmandu',
  MMK: 'Asia/Yangon',
  KHR: 'Asia/Phnom_Penh',
  LAK: 'Asia/Vientiane',
  IDR: 'Asia/Jakarta',
  TWD: 'Asia/Taipei',
  MNT: 'Asia/Ulaanbaatar',
  KZT: 'Asia/Almaty',
  UZS: 'Asia/Tashkent',
  GEL: 'Asia/Tbilisi',
  AMD: 'Asia/Yerevan',
  AZN: 'Asia/Baku',
  TRY: 'Europe/Istanbul',
  ILS: 'Asia/Jerusalem',
  JOD: 'Asia/Amman',
  KWD: 'Asia/Kuwait',
  QAR: 'Asia/Qatar',
  BHD: 'Asia/Bahrain',
  OMR: 'Asia/Muscat',
  IRR: 'Asia/Tehran',
  IQD: 'Asia/Baghdad',
  RUB: 'Europe/Moscow',
  UAH: 'Europe/Kiev',
  PLN: 'Europe/Warsaw',
  CZK: 'Europe/Prague',
  HUF: 'Europe/Budapest',
  RON: 'Europe/Bucharest',
  BGN: 'Europe/Sofia',
  HRK: 'Europe/Zagreb',
  DKK: 'Europe/Copenhagen',
  ISK: 'Atlantic/Reykjavik',
};

const getLocalDateTime = (currencyCode) => {
  const tz = currencyTimezone[currencyCode] || 'UTC';
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    timeZone: tz, year: 'numeric', month: 'long', day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  });
  return { dateStr, timeStr };
};

const PrintReceipt = ({
  cart, total, formatProductPrice, formatPrice,
  amountTendered, paymentChange,
  onBack, showBackButton,
  serialNumber, cashierName, currencyCode,
  subtotal, taxAmount, taxName, taxRate, usStateName,
}) => {
  const handlePrint = () => window.print();
  const cartItems = Object.values(cart);
  const { dateStr, timeStr } = getLocalDateTime(currencyCode || 'PHP');

  return (
    <div className="receipt-wrapper">
      {showBackButton && (
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Main Page
        </button>
      )}

      <div className="receipt-box">

        {/* ── STORE HEADER ── */}
        <div className="receipt-store-header">
          <div className="receipt-store-name">Joan's Minimart</div>
          <div className="receipt-store-sub">Operated by: Joan Faith</div>
          <div className="receipt-store-sub">VAT Reg TIN: 123-456-789-00000</div>
          <div className="receipt-store-sub">123 Sampaguita St., Brgy. Mabuhay,</div>
          <div className="receipt-store-sub">General Santos City, South Cotabato 9500</div>
        </div>

        <div className="receipt-divider" />

        {/* ── SALES INVOICE TITLE ── */}
        <div className="receipt-invoice-title">SALES INVOICE</div>

        <div className="receipt-divider" />

        {/* ── CASHIER INFO BOX ── */}
        <div className="receipt-info-box">
          <div className="receipt-info-row">
            <span className="receipt-info-label">Cashier:</span>
            <span className="receipt-info-value">{cashierName || '—'}</span>
          </div>
          <div className="receipt-info-row">
            <span className="receipt-info-label">Serial #:</span>
            <span className="receipt-info-value">{serialNumber || '—'}</span>
          </div>
          <div className="receipt-info-row">
            <span className="receipt-info-label">Date:</span>
            <span className="receipt-info-value">{dateStr}</span>
          </div>
          <div className="receipt-info-row">
            <span className="receipt-info-label">Time:</span>
            <span className="receipt-info-value">{timeStr}</span>
          </div>
        </div>

        <div className="receipt-divider" />

        {/* ── ITEMS ── */}
        <ul className="receipt-list">
          {cartItems.map((item) => (
            <li key={item.id} className="receipt-item">
              <span className="receipt-item-name">
                {item.name}
                <span className="receipt-item-unit"> {formatPrice(item.price)} x{item.quantity}</span>
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="receipt-divider" />

        {/* ── TAX BREAKDOWN ── */}
        <div className="receipt-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {taxRate > 0 ? (
          <div className="receipt-row receipt-tax-row">
            <span>
              {taxName} ({(taxRate * 100).toFixed(taxRate % 0.01 === 0 ? 0 : 2)}%)
              {usStateName && <span style={{fontSize:'11px',color:'#9ca3af'}}> — {usStateName}</span>}
            </span>
            <span>{formatPrice(taxAmount)}</span>
          </div>
        ) : (
          <div className="receipt-row receipt-tax-row">
            <span>{taxName}</span>
            <span>—</span>
          </div>
        )}

        <div className="receipt-divider" />

        <div className="receipt-total-row">
          <span>TOTAL</span>
          <span>{formatPrice(total)}</span>
        </div>

        {amountTendered && (
          <div className="receipt-row">
            <span>Amount Tendered</span>
            <span>{amountTendered}</span>
          </div>
        )}

        {paymentChange !== null && (
          <div className={`receipt-row ${paymentChange < 0 ? 'receipt-due' : 'receipt-change'}`}>
            <span>{paymentChange < 0 ? 'Amount Due' : 'Change'}</span>
            <span>{formatPrice(Math.abs(paymentChange))}</span>
          </div>
        )}

        <div className="receipt-divider" />
        <div className="receipt-footer">
          This serves as your official receipt.<br />
          Thank you for shopping at Joan's Minimart! 🙏
        </div>
      </div>

      <div className="receipt-actions">
        <button type="button" onClick={handlePrint} className="print-btn">
          🖨️ Print Receipt
        </button>
      </div>
    </div>
  );
};

export default PrintReceipt;
