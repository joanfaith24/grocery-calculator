

# 🛒 Joan's Minimart — Grocery Calculator

A full-featured grocery **Point-of-Sale (POS)** web app built with React + Vite. Designed for Joan's Minimart, it handles everything from product management and cart tracking to official sales invoices with tax breakdowns and transaction history.

🔗 **Live Site:** [joanfaith24.github.io/grocery-calculator](https://joanfaith24.github.io/grocery-calculator)

---

## ✨ Features

### 🧾 Sales Invoice & Receipts
- Auto-generated **12-digit serial number** for every transaction
- Official **Joan's Minimart** receipt format with VAT Reg TIN and store address
- Displays **Cashier name**, date, and **local time based on the country's currency**
- Itemized list with **unit price × quantity** breakdown
- **Tax breakdown** shown before total (Subtotal → Tax → Total)
- Print-ready receipt layout

### 💰 Multi-Currency Support
- **70+ world currencies** with **live exchange rates** (auto-fetched daily via open.er-api.com)
- Rates cached locally — works offline with fallback static rates
- Live / updating / offline status badge next to the currency selector

### 🗺️ Country & State Tax Rates
- Correct **VAT / GST / Sales Tax** rates for every supported country
- **All 50 US states + DC** each have their own sales tax rate selectable from a dropdown
- Countries with no tax (Hong Kong, Kuwait, Qatar, etc.) shown as "No Tax"

### 🛍️ Product Management
- 100+ preloaded grocery products with smart unit detection (`/kg`, `/liter`, `/tray`, etc.)
- **3-dot menu** on each product row for quick **Edit** and **Delete**
- Delete confirmation popup before permanently removing a product
- Add custom products with name, price, and unit
- Edit any product — changes reflected immediately across cart and list
- Scrollable product list so the card stays compact

### 🛒 Cart
- Add products via search bar or product list
- Remove or reduce quantity per item
- **New Customer** button clears the cart instantly
- Cart persists across page refreshes (saved to localStorage)

### 👤 Cashier Info
- Cashier name card must be filled and saved before adding to cart
- Saved cashier persists across sessions

### 🔍 Transaction Search
- Every completed transaction is saved to localStorage
- Search any past receipt by **serial number**
- Result displays the full receipt layout — identical to the printed receipt

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Two-column layout on desktop, single-column stacked on mobile
- No layout breaking or overflow on any screen size

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repo
git clone https://github.com/joanfaith24/grocery-calculator.git

# Navigate into the project
cd grocery-calculator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🗂️ Project Structure

```
src/
├── App.jsx              # Main app — state, logic, layout
├── App.css              # All styles
├── ProductList.jsx      # Product list with 3-dot edit/delete menu
├── Cart.jsx             # Shopping cart with payment flow
├── AddProduct.jsx       # Add new product form
├── PrintReceipt.jsx     # Sales invoice receipt page
├── TransactionSearch.jsx # Search past transactions by serial number
└── main.jsx             # React entry point
```

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| CSS (vanilla) | Styling |
| localStorage | Cart, product, cashier & transaction persistence |
| open.er-api.com | Live currency exchange rates |

---

## 🏪 Store Info

| Field | Value |
|-------|-------|
| Store Name | Joan's Minimart |
| Operated by | Joan Faith |
| VAT Reg TIN | 123-456-789-00000 |
| Address | 123 Sampaguita St., Brgy. Mabuhay, General Santos City, South Cotabato 9500 |

---

## 📋 How to Use

1. **Select your currency** from the dropdown (70+ options). For USD, also pick your state.
2. **Enter the cashier name** and click **Save** — required before adding to cart.
3. **Search or browse products** and click **Add** to add them to the cart.
4. Click **Pay**, enter the amount tendered, and press **Enter**.
5. Click **Generate Receipt** to view and print the official sales invoice.
6. Use **Search Transaction** on the right panel to look up any past receipt by serial number.
7. Click **New Customer** to clear the cart for the next transaction.

---

## 📄 License

This project is for personal/business use by Joan Faith. All rights reserved.

---

Made with ❤️ for Joan's Minimart
