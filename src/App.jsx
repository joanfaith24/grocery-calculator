import { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import AddProduct from './AddProduct';
import PrintReceipt from './PrintReceipt';
import TransactionSearch from './TransactionSearch';
import './App.css';

const getDefaultUnit = (name) => {
  const lower = name.toLowerCase();
  if (/egg|eggs/.test(lower)) return '/tray';
  if (/canned|soup|sauce|jam|peanut butter|pickles|olives|anchovy paste|mayonnaise|ketchup|relish|barbecue sauce|teriyaki|hoisin|oyster sauce|fish sauce|soy sauce|tabasco|mustard|dijon/.test(lower)) return '500g';
  if (/milk|juice|coffee|tea|oil|vinegar|honey|syrup|dressing|coconut milk|yogurt/.test(lower)) return '/liter';
  if (/apple|banana|orange|grape|tomato|potato|onion|carrot|lettuce|spinach|broccoli|cucumber|cabbage|mango|pineapple|papaya|kiwi|avocado|coconut|plantain|taro|cassava|yam|beet|radish|turnip|parsnip|rutabaga|celeriac|fennel|leek|scallion|shallot|garlic|ginger|turmeric|chicken|beef|pork|turkey|lamb|duck|rabbit|venison|fish|salmon|tuna|shrimp|crab|lobster|squid|octopus|steak|chops|ground beef|bacon|ham|sausage|pasta|rice|flour|sugar|cereal|oatmeal|beans|lentils|peas|almond|walnut|cashew|pistachio|peanut|hazelnut|macadamia|brazil nut|chestnut|bread|breadfruit/.test(lower)) return '/kg';
  return '/unit';
};

const rawProducts = [
  { id: 1, name: 'Apple', price: 1.5 }, { id: 2, name: 'Banana', price: 0.75 },
  { id: 3, name: 'Milk', price: 2.0 }, { id: 4, name: 'Bread', price: 3.0 },
  { id: 5, name: 'Eggs', price: 4.5 }, { id: 6, name: 'Cheese', price: 5.0 },
  { id: 7, name: 'Chicken', price: 8.0 }, { id: 8, name: 'Rice', price: 2.5 },
  { id: 9, name: 'Pasta', price: 1.8 }, { id: 10, name: 'Tomato', price: 2.2 },
  { id: 11, name: 'Potato', price: 1.0 }, { id: 12, name: 'Onion', price: 1.2 },
  { id: 13, name: 'Carrot', price: 1.3 }, { id: 14, name: 'Lettuce', price: 2.5 },
  { id: 15, name: 'Spinach', price: 3.0 }, { id: 16, name: 'Broccoli', price: 2.8 },
  { id: 17, name: 'Orange', price: 1.6 }, { id: 18, name: 'Grapes', price: 3.5 },
  { id: 19, name: 'Strawberries', price: 4.0 }, { id: 20, name: 'Blueberries', price: 5.0 },
  { id: 21, name: 'Yogurt', price: 1.5 }, { id: 22, name: 'Butter', price: 3.2 },
  { id: 23, name: 'Juice', price: 2.5 }, { id: 24, name: 'Coffee', price: 6.0 },
  { id: 25, name: 'Tea', price: 4.0 }, { id: 26, name: 'Sugar', price: 2.0 },
  { id: 27, name: 'Flour', price: 1.5 }, { id: 28, name: 'Oil', price: 4.0 },
  { id: 29, name: 'Salt', price: 0.8 }, { id: 30, name: 'Pepper', price: 2.5 },
  { id: 31, name: 'Cereal', price: 3.5 }, { id: 32, name: 'Oatmeal', price: 2.8 },
  { id: 33, name: 'Peanut Butter', price: 3.0 }, { id: 34, name: 'Jam', price: 2.5 },
  { id: 35, name: 'Honey', price: 5.0 }, { id: 36, name: 'Canned Tuna', price: 2.0 },
  { id: 37, name: 'Canned Beans', price: 1.5 }, { id: 38, name: 'Soup', price: 2.2 },
  { id: 39, name: 'Pasta Sauce', price: 2.5 }, { id: 40, name: 'Frozen Pizza', price: 5.0 },
  { id: 41, name: 'Ice Cream', price: 4.0 }, { id: 42, name: 'Frozen Vegetables', price: 2.0 },
  { id: 43, name: 'Frozen Fruits', price: 3.0 }, { id: 44, name: 'Beef', price: 10.0 },
  { id: 45, name: 'Pork', price: 8.5 }, { id: 46, name: 'Fish', price: 12.0 },
  { id: 47, name: 'Shrimp', price: 15.0 }, { id: 48, name: 'Salmon', price: 18.0 },
  { id: 49, name: 'Turkey', price: 9.0 }, { id: 50, name: 'Ham', price: 7.0 },
  { id: 51, name: 'Bacon', price: 6.5 }, { id: 52, name: 'Sausage', price: 5.0 },
  { id: 53, name: 'Hot Dog', price: 4.0 }, { id: 54, name: 'Ground Beef', price: 9.0 },
  { id: 55, name: 'Chicken Breast', price: 7.5 }, { id: 56, name: 'Turkey Breast', price: 8.0 },
  { id: 57, name: 'Pork Chops', price: 8.5 }, { id: 58, name: 'Lamb', price: 12.0 },
  { id: 59, name: 'Duck', price: 10.0 }, { id: 60, name: 'Quail', price: 15.0 },
  { id: 61, name: 'Venison', price: 20.0 }, { id: 62, name: 'Rabbit', price: 11.0 },
  { id: 63, name: 'Lobster', price: 25.0 }, { id: 64, name: 'Crab', price: 18.0 },
  { id: 65, name: 'Clams', price: 10.0 }, { id: 66, name: 'Oysters', price: 12.0 },
  { id: 67, name: 'Scallops', price: 20.0 }, { id: 68, name: 'Mussels', price: 8.0 },
  { id: 69, name: 'Squid', price: 9.0 }, { id: 70, name: 'Octopus', price: 14.0 },
  { id: 71, name: 'Almonds', price: 8.0 }, { id: 72, name: 'Walnuts', price: 9.0 },
  { id: 73, name: 'Cashews', price: 10.0 }, { id: 74, name: 'Pistachios', price: 11.0 },
  { id: 75, name: 'Peanuts', price: 3.0 }, { id: 76, name: 'Mangoes', price: 2.5 },
  { id: 77, name: 'Pineapple', price: 3.0 }, { id: 78, name: 'Papaya', price: 3.5 },
  { id: 79, name: 'Kiwi', price: 2.0 }, { id: 80, name: 'Guava', price: 2.5 },
  { id: 81, name: 'Dragon Fruit', price: 5.0 }, { id: 82, name: 'Jackfruit', price: 8.0 },
  { id: 83, name: 'Durian', price: 10.0 }, { id: 84, name: 'Rambutan', price: 7.0 },
  { id: 85, name: 'Plantain', price: 1.5 }, { id: 86, name: 'Taro', price: 2.0 },
  { id: 87, name: 'Cassava', price: 1.8 }, { id: 88, name: 'Sweet Potato', price: 2.5 },
  { id: 89, name: 'Garlic', price: 1.0 }, { id: 90, name: 'Ginger', price: 2.0 },
  { id: 91, name: 'Soy Sauce', price: 3.0 }, { id: 92, name: 'Fish Sauce', price: 2.5 },
  { id: 93, name: 'Vinegar', price: 2.5 }, { id: 94, name: 'Ketchup', price: 2.0 },
  { id: 95, name: 'Mayonnaise', price: 3.0 }, { id: 96, name: 'Olive Oil', price: 7.0 },
  { id: 97, name: 'Coconut Oil', price: 6.0 }, { id: 98, name: 'Vegetable Oil', price: 3.0 },
  { id: 99, name: 'Sardines', price: 4.0 }, { id: 100, name: 'Mackerel', price: 7.0 },
];

const initialProducts = rawProducts.map((p) => ({ ...p, unit: getDefaultUnit(p.name) }));

const currencyOptions = [
  { value: 'PHP', label: 'Philippine Peso', symbol: '₱', rate: 56.5 },
  { value: 'USD', label: 'US Dollar', symbol: '$', rate: 1 },
  { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$', rate: 1.35 },
  { value: 'EUR', label: 'Euro', symbol: '€', rate: 0.93 },
  { value: 'GBP', label: 'British Pound', symbol: '£', rate: 0.80 },
  { value: 'JPY', label: 'Japanese Yen', symbol: '¥', rate: 134.5 },
  { value: 'CNY', label: 'Chinese Yuan', symbol: '¥', rate: 6.80 },
  { value: 'AUD', label: 'Australian Dollar', symbol: 'A$', rate: 1.50 },
  { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$', rate: 1.35 },
  { value: 'INR', label: 'Indian Rupee', symbol: '₹', rate: 83.5 },
  { value: 'NGN', label: 'Nigerian Naira', symbol: '₦', rate: 1490 },
  { value: 'DZD', label: 'Algerian Dinar', symbol: 'د.ج', rate: 139.0 },
  { value: 'EGP', label: 'Egyptian Pound', symbol: 'E£', rate: 31.0 },
  { value: 'SAR', label: 'Saudi Riyal', symbol: '﷼', rate: 3.75 },
  { value: 'AED', label: 'UAE Dirham', symbol: 'د.إ', rate: 3.67 },
  { value: 'KRW', label: 'South Korean Won', symbol: '₩', rate: 1320 },
  { value: 'HKD', label: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.80 },
  { value: 'NZD', label: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.62 },
  { value: 'CHF', label: 'Swiss Franc', symbol: 'CHF', rate: 0.90 },
  { value: 'NOK', label: 'Norwegian Krone', symbol: 'kr', rate: 9.90 },
  { value: 'SEK', label: 'Swedish Krona', symbol: 'kr', rate: 10.90 },
  { value: 'KES', label: 'Kenyan Shilling', symbol: 'KSh', rate: 149.0 },
  { value: 'TZS', label: 'Tanzanian Shilling', symbol: 'TSh', rate: 2830 },
  { value: 'MYR', label: 'Malaysian Ringgit', symbol: 'RM', rate: 4.60 },
  { value: 'THB', label: 'Thai Baht', symbol: '฿', rate: 35.0 },
  { value: 'VND', label: 'Vietnamese Dong', symbol: '₫', rate: 23400 },
  { value: 'BRL', label: 'Brazilian Real', symbol: 'R$', rate: 4.97 },
  { value: 'MXN', label: 'Mexican Peso', symbol: 'MX$', rate: 17.15 },
  { value: 'ARS', label: 'Argentine Peso', symbol: 'AR$', rate: 876.0 },
  { value: 'CLP', label: 'Chilean Peso', symbol: 'CL$', rate: 945.0 },
  { value: 'COP', label: 'Colombian Peso', symbol: 'CO$', rate: 3900.0 },
  { value: 'PEN', label: 'Peruvian Sol', symbol: 'S/.', rate: 3.72 },
  { value: 'ZAR', label: 'South African Rand', symbol: 'R', rate: 18.63 },
  { value: 'GHS', label: 'Ghanaian Cedi', symbol: 'GH₵', rate: 12.40 },
  { value: 'MAD', label: 'Moroccan Dirham', symbol: 'د.م.', rate: 10.05 },
  { value: 'TND', label: 'Tunisian Dinar', symbol: 'DT', rate: 3.12 },
  { value: 'XOF', label: 'West African CFA Franc', symbol: 'CFA', rate: 609.0 },
  { value: 'ETB', label: 'Ethiopian Birr', symbol: 'Br', rate: 56.5 },
  { value: 'UGX', label: 'Ugandan Shilling', symbol: 'USh', rate: 3750.0 },
  { value: 'RWF', label: 'Rwandan Franc', symbol: 'FRw', rate: 1310.0 },
  { value: 'PKR', label: 'Pakistani Rupee', symbol: '₨', rate: 278.0 },
  { value: 'BDT', label: 'Bangladeshi Taka', symbol: '৳', rate: 110.0 },
  { value: 'LKR', label: 'Sri Lankan Rupee', symbol: 'Rs', rate: 305.0 },
  { value: 'NPR', label: 'Nepalese Rupee', symbol: 'रू', rate: 133.5 },
  { value: 'MMK', label: 'Myanmar Kyat', symbol: 'K', rate: 2100.0 },
  { value: 'KHR', label: 'Cambodian Riel', symbol: '៛', rate: 4100.0 },
  { value: 'LAK', label: 'Lao Kip', symbol: '₭', rate: 21000.0 },
  { value: 'IDR', label: 'Indonesian Rupiah', symbol: 'Rp', rate: 15700.0 },
  { value: 'TWD', label: 'Taiwan Dollar', symbol: 'NT$', rate: 32.3 },
  { value: 'MNT', label: 'Mongolian Tugrik', symbol: '₮', rate: 3400.0 },
  { value: 'KZT', label: 'Kazakhstani Tenge', symbol: '₸', rate: 450.0 },
  { value: 'UZS', label: 'Uzbekistani Som', symbol: 'лв', rate: 12600.0 },
  { value: 'GEL', label: 'Georgian Lari', symbol: '₾', rate: 2.68 },
  { value: 'AMD', label: 'Armenian Dram', symbol: '֏', rate: 388.0 },
  { value: 'AZN', label: 'Azerbaijani Manat', symbol: '₼', rate: 1.70 },
  { value: 'TRY', label: 'Turkish Lira', symbol: '₺', rate: 32.5 },
  { value: 'ILS', label: 'Israeli Shekel', symbol: '₪', rate: 3.70 },
  { value: 'JOD', label: 'Jordanian Dinar', symbol: 'JD', rate: 0.71 },
  { value: 'KWD', label: 'Kuwaiti Dinar', symbol: 'KD', rate: 0.31 },
  { value: 'QAR', label: 'Qatari Riyal', symbol: 'QR', rate: 3.64 },
  { value: 'BHD', label: 'Bahraini Dinar', symbol: 'BD', rate: 0.376 },
  { value: 'OMR', label: 'Omani Rial', symbol: 'OMR', rate: 0.385 },
  { value: 'IRR', label: 'Iranian Rial', symbol: '﷼', rate: 42000.0 },
  { value: 'IQD', label: 'Iraqi Dinar', symbol: 'IQD', rate: 1310.0 },
  { value: 'RUB', label: 'Russian Ruble', symbol: '₽', rate: 90.5 },
  { value: 'UAH', label: 'Ukrainian Hryvnia', symbol: '₴', rate: 37.5 },
  { value: 'PLN', label: 'Polish Zloty', symbol: 'zł', rate: 4.02 },
  { value: 'CZK', label: 'Czech Koruna', symbol: 'Kč', rate: 22.8 },
  { value: 'HUF', label: 'Hungarian Forint', symbol: 'Ft', rate: 357.0 },
  { value: 'RON', label: 'Romanian Leu', symbol: 'lei', rate: 4.65 },
  { value: 'BGN', label: 'Bulgarian Lev', symbol: 'лв', rate: 1.82 },
  { value: 'HRK', label: 'Croatian Kuna', symbol: 'kn', rate: 6.98 },
  { value: 'DKK', label: 'Danish Krone', symbol: 'kr', rate: 6.91 },
  { value: 'ISK', label: 'Icelandic Krona', symbol: 'kr', rate: 138.0 },
];
// ── Tax rates per currency (standard VAT/GST/Sales Tax) ──
const TAX_RATES = {
  PHP: { name: 'VAT', rate: 0.12 },
  USD: { name: 'Sales Tax', rate: 0.0725 },
  SGD: { name: 'GST', rate: 0.09 },
  EUR: { name: 'VAT', rate: 0.20 },
  GBP: { name: 'VAT', rate: 0.20 },
  JPY: { name: 'Consumption Tax', rate: 0.10 },
  CNY: { name: 'VAT', rate: 0.13 },
  AUD: { name: 'GST', rate: 0.10 },
  CAD: { name: 'GST/HST', rate: 0.13 },
  INR: { name: 'GST', rate: 0.18 },
  NGN: { name: 'VAT', rate: 0.075 },
  DZD: { name: 'TVA', rate: 0.19 },
  EGP: { name: 'VAT', rate: 0.14 },
  SAR: { name: 'VAT', rate: 0.15 },
  AED: { name: 'VAT', rate: 0.05 },
  KRW: { name: 'VAT', rate: 0.10 },
  HKD: { name: 'No Tax', rate: 0 },
  NZD: { name: 'GST', rate: 0.15 },
  CHF: { name: 'MWST/TVA', rate: 0.077 },
  NOK: { name: 'MVA', rate: 0.25 },
  SEK: { name: 'MOMS', rate: 0.25 },
  KES: { name: 'VAT', rate: 0.16 },
  TZS: { name: 'VAT', rate: 0.18 },
  MYR: { name: 'SST', rate: 0.06 },
  THB: { name: 'VAT', rate: 0.07 },
  VND: { name: 'VAT', rate: 0.10 },
  BRL: { name: 'ICMS/IPI', rate: 0.17 },
  MXN: { name: 'IVA', rate: 0.16 },
  ARS: { name: 'IVA', rate: 0.21 },
  CLP: { name: 'IVA', rate: 0.19 },
  COP: { name: 'IVA', rate: 0.19 },
  PEN: { name: 'IGV', rate: 0.18 },
  ZAR: { name: 'VAT', rate: 0.15 },
  GHS: { name: 'VAT', rate: 0.125 },
  MAD: { name: 'TVA', rate: 0.20 },
  TND: { name: 'TVA', rate: 0.19 },
  XOF: { name: 'TVA', rate: 0.18 },
  ETB: { name: 'VAT', rate: 0.15 },
  UGX: { name: 'VAT', rate: 0.18 },
  RWF: { name: 'VAT', rate: 0.18 },
  PKR: { name: 'GST', rate: 0.17 },
  BDT: { name: 'VAT', rate: 0.15 },
  LKR: { name: 'VAT', rate: 0.18 },
  NPR: { name: 'VAT', rate: 0.13 },
  MMK: { name: 'CT', rate: 0.05 },
  KHR: { name: 'VAT', rate: 0.10 },
  LAK: { name: 'VAT', rate: 0.10 },
  IDR: { name: 'PPN', rate: 0.11 },
  TWD: { name: 'VAT', rate: 0.05 },
  MNT: { name: 'VAT', rate: 0.10 },
  KZT: { name: 'VAT', rate: 0.12 },
  UZS: { name: 'VAT', rate: 0.12 },
  GEL: { name: 'VAT', rate: 0.18 },
  AMD: { name: 'VAT', rate: 0.20 },
  AZN: { name: 'VAT', rate: 0.18 },
  TRY: { name: 'KDV', rate: 0.20 },
  ILS: { name: 'VAT', rate: 0.17 },
  JOD: { name: 'GST', rate: 0.16 },
  KWD: { name: 'No Tax', rate: 0 },
  QAR: { name: 'No Tax', rate: 0 },
  BHD: { name: 'VAT', rate: 0.10 },
  OMR: { name: 'VAT', rate: 0.05 },
  IRR: { name: 'VAT', rate: 0.09 },
  IQD: { name: 'No Tax', rate: 0 },
  RUB: { name: 'NDS', rate: 0.20 },
  UAH: { name: 'VAT', rate: 0.20 },
  PLN: { name: 'VAT', rate: 0.23 },
  CZK: { name: 'DPH', rate: 0.21 },
  HUF: { name: 'AFA', rate: 0.27 },
  RON: { name: 'TVA', rate: 0.19 },
  BGN: { name: 'DDS', rate: 0.20 },
  HRK: { name: 'PDV', rate: 0.25 },
  DKK: { name: 'MOMS', rate: 0.25 },
  ISK: { name: 'VSK', rate: 0.24 },
};

const getTax = (currencyCode) => TAX_RATES[currencyCode] || { name: 'VAT', rate: 0 };
// ── US State Sales Tax Rates (2025) ──
const US_STATE_TAXES = [
  { code: 'AL', name: 'Alabama', rate: 0.04 },
  { code: 'AK', name: 'Alaska', rate: 0 },
  { code: 'AZ', name: 'Arizona', rate: 0.056 },
  { code: 'AR', name: 'Arkansas', rate: 0.065 },
  { code: 'CA', name: 'California', rate: 0.0725 },
  { code: 'CO', name: 'Colorado', rate: 0.029 },
  { code: 'CT', name: 'Connecticut', rate: 0.0635 },
  { code: 'DE', name: 'Delaware', rate: 0 },
  { code: 'FL', name: 'Florida', rate: 0.06 },
  { code: 'GA', name: 'Georgia', rate: 0.04 },
  { code: 'HI', name: 'Hawaii', rate: 0.04 },
  { code: 'ID', name: 'Idaho', rate: 0.06 },
  { code: 'IL', name: 'Illinois', rate: 0.0625 },
  { code: 'IN', name: 'Indiana', rate: 0.07 },
  { code: 'IA', name: 'Iowa', rate: 0.06 },
  { code: 'KS', name: 'Kansas', rate: 0.065 },
  { code: 'KY', name: 'Kentucky', rate: 0.06 },
  { code: 'LA', name: 'Louisiana', rate: 0.0445 },
  { code: 'ME', name: 'Maine', rate: 0.055 },
  { code: 'MD', name: 'Maryland', rate: 0.06 },
  { code: 'MA', name: 'Massachusetts', rate: 0.0625 },
  { code: 'MI', name: 'Michigan', rate: 0.06 },
  { code: 'MN', name: 'Minnesota', rate: 0.06875 },
  { code: 'MS', name: 'Mississippi', rate: 0.07 },
  { code: 'MO', name: 'Missouri', rate: 0.04225 },
  { code: 'MT', name: 'Montana', rate: 0 },
  { code: 'NE', name: 'Nebraska', rate: 0.055 },
  { code: 'NV', name: 'Nevada', rate: 0.0685 },
  { code: 'NH', name: 'New Hampshire', rate: 0 },
  { code: 'NJ', name: 'New Jersey', rate: 0.06625 },
  { code: 'NM', name: 'New Mexico', rate: 0.05125 },
  { code: 'NY', name: 'New York', rate: 0.04 },
  { code: 'NC', name: 'North Carolina', rate: 0.0475 },
  { code: 'ND', name: 'North Dakota', rate: 0.05 },
  { code: 'OH', name: 'Ohio', rate: 0.0575 },
  { code: 'OK', name: 'Oklahoma', rate: 0.045 },
  { code: 'OR', name: 'Oregon', rate: 0 },
  { code: 'PA', name: 'Pennsylvania', rate: 0.06 },
  { code: 'RI', name: 'Rhode Island', rate: 0.07 },
  { code: 'SC', name: 'South Carolina', rate: 0.06 },
  { code: 'SD', name: 'South Dakota', rate: 0.042 },
  { code: 'TN', name: 'Tennessee', rate: 0.07 },
  { code: 'TX', name: 'Texas', rate: 0.0625 },
  { code: 'UT', name: 'Utah', rate: 0.061 },
  { code: 'VT', name: 'Vermont', rate: 0.06 },
  { code: 'VA', name: 'Virginia', rate: 0.053 },
  { code: 'WA', name: 'Washington', rate: 0.065 },
  { code: 'WV', name: 'West Virginia', rate: 0.06 },
  { code: 'WI', name: 'Wisconsin', rate: 0.05 },
  { code: 'WY', name: 'Wyoming', rate: 0.04 },
  { code: 'DC', name: 'Washington D.C.', rate: 0.06 },
];



const CART_KEY = 'grocery_cart_v1';
const PRODUCTS_KEY = 'grocery_products_v1';
const CASHIER_KEY = 'grocery_cashier_v1';
const TRANSACTIONS_KEY = 'grocery_transactions_v1';

const loadStorage = (key, fallback) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; }
  catch { return fallback; }
};
const saveStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const generateSerial = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');

const currencyTimezone = {
  PHP:'Asia/Manila',USD:'America/New_York',SGD:'Asia/Singapore',EUR:'Europe/Paris',
  GBP:'Europe/London',JPY:'Asia/Tokyo',CNY:'Asia/Shanghai',AUD:'Australia/Sydney',
  CAD:'America/Toronto',INR:'Asia/Kolkata',NGN:'Africa/Lagos',DZD:'Africa/Algiers',
  EGP:'Africa/Cairo',SAR:'Asia/Riyadh',AED:'Asia/Dubai',KRW:'Asia/Seoul',
  HKD:'Asia/Hong_Kong',NZD:'Pacific/Auckland',CHF:'Europe/Zurich',NOK:'Europe/Oslo',
  SEK:'Europe/Stockholm',KES:'Africa/Nairobi',TZS:'Africa/Dar_es_Salaam',
  MYR:'Asia/Kuala_Lumpur',THB:'Asia/Bangkok',VND:'Asia/Ho_Chi_Minh',
  BRL:'America/Sao_Paulo',MXN:'America/Mexico_City',ARS:'America/Argentina/Buenos_Aires',
  CLP:'America/Santiago',COP:'America/Bogota',PEN:'America/Lima',
  ZAR:'Africa/Johannesburg',GHS:'Africa/Accra',MAD:'Africa/Casablanca',
  TND:'Africa/Tunis',XOF:'Africa/Abidjan',ETB:'Africa/Addis_Ababa',
  UGX:'Africa/Kampala',RWF:'Africa/Kigali',PKR:'Asia/Karachi',BDT:'Asia/Dhaka',
  LKR:'Asia/Colombo',NPR:'Asia/Kathmandu',MMK:'Asia/Yangon',KHR:'Asia/Phnom_Penh',
  LAK:'Asia/Vientiane',IDR:'Asia/Jakarta',TWD:'Asia/Taipei',MNT:'Asia/Ulaanbaatar',
  KZT:'Asia/Almaty',UZS:'Asia/Tashkent',GEL:'Asia/Tbilisi',AMD:'Asia/Yerevan',
  AZN:'Asia/Baku',TRY:'Europe/Istanbul',ILS:'Asia/Jerusalem',JOD:'Asia/Amman',
  KWD:'Asia/Kuwait',QAR:'Asia/Qatar',BHD:'Asia/Bahrain',OMR:'Asia/Muscat',
  IRR:'Asia/Tehran',IQD:'Asia/Baghdad',RUB:'Europe/Moscow',UAH:'Europe/Kiev',
  PLN:'Europe/Warsaw',CZK:'Europe/Prague',HUF:'Europe/Budapest',RON:'Europe/Bucharest',
  BGN:'Europe/Sofia',HRK:'Europe/Zagreb',DKK:'Europe/Copenhagen',ISK:'Atlantic/Reykjavik',
};

const getLocalDateTime = (code) => {
  const tz = currencyTimezone[code] || 'UTC';
  const now = new Date();
  return {
    dateStr: now.toLocaleDateString('en-US', { timeZone: tz, year: 'numeric', month: 'long', day: 'numeric' }),
    timeStr: now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
  };
};

function App() {
  const saved = loadStorage(CASHIER_KEY, { name: '', saved: false });
  const [products, setProducts] = useState(() => loadStorage(PRODUCTS_KEY, initialProducts));
  const [cart, setCart] = useState(() => loadStorage(CART_KEY, {}));
  const [cashierName, setCashierName] = useState(saved.name || '');
  const [cashierSaved, setCashierSaved] = useState(saved.saved || false);
  const [cashierInput, setCashierInput] = useState(saved.name || '');
  const [cashierError, setCashierError] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editSearch, setEditSearch] = useState('');
  const [currency, setCurrency] = useState('PHP');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentChange, setPaymentChange] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [isReceiptPage, setIsReceiptPage] = useState(false);
  const [currentSerial, setCurrentSerial] = useState('');
  const [usState, setUsState] = useState(() => loadStorage('grocery_us_state_v1', 'CA'));
  const [liveRates, setLiveRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState(false);

  const editSectionRef = useRef(null);
  const cashierRef = useRef(null);

  useEffect(() => { saveStorage(CART_KEY, cart); }, [cart]);
  useEffect(() => { saveStorage(PRODUCTS_KEY, products); }, [products]);
  useEffect(() => { saveStorage(CASHIER_KEY, { name: cashierName, saved: cashierSaved }); }, [cashierName, cashierSaved]);
  useEffect(() => { saveStorage('grocery_us_state_v1', usState); }, [usState]);

  // Fetch live exchange rates on mount (base: USD)
  useEffect(() => {
    const RATES_CACHE_KEY = 'grocery_live_rates_v1';
    const RATES_DATE_KEY  = 'grocery_live_rates_date_v1';
    const today = new Date().toISOString().slice(0, 10);
    const cachedDate = localStorage.getItem(RATES_DATE_KEY);
    const cachedRates = localStorage.getItem(RATES_CACHE_KEY);

    // Use cached rates if fetched today
    if (cachedDate === today && cachedRates) {
      try {
        setLiveRates(JSON.parse(cachedRates));
        setRatesLoading(false);
        return;
      } catch {}
    }

    // Fetch fresh rates
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.rates) {
          setLiveRates(data.rates);
          localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(data.rates));
          localStorage.setItem(RATES_DATE_KEY, today);
        }
        setRatesLoading(false);
      })
      .catch(() => {
        setRatesError(true);
        setRatesLoading(false);
      });
  }, []);

  // Get live rate for selected currency, fall back to static if not loaded yet
  const getRate = (currencyCode) => {
    if (liveRates[currencyCode] != null) return liveRates[currencyCode];
    const opt = currencyOptions.find((o) => o.value === currencyCode);
    return opt ? opt.rate : 1;
  };

  const selectedCurrency = currencyOptions.find((o) => o.value === currency);
  const currentRate = getRate(currency);
  // For USD, use selected US state rate; otherwise use country rate
  const currentTax = currency === 'USD'
    ? (() => {
        const st = US_STATE_TAXES.find((s) => s.code === usState) || US_STATE_TAXES[0];
        return { name: `${st.name} Sales Tax`, rate: st.rate };
      })()
    : getTax(currency);
  const formatPrice = (amount) => `${selectedCurrency.symbol}${(amount * currentRate).toFixed(2)}`;
  const formatProductPrice = (product) => `${formatPrice(product.price)} ${product.unit}`;
  const formattedTendered = paymentAmount ? `${selectedCurrency.symbol}${parseFloat(paymentAmount).toFixed(2)}` : '';
  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = subtotal * currentTax.rate;
  const total = subtotal + taxAmount;

  const handleSaveCashier = () => {
    if (!cashierInput.trim()) { setCashierError('Cashier name is required.'); return; }
    setCashierName(cashierInput.trim());
    setCashierSaved(true);
    setCashierError('');
  };

  const handleAddToCart = (product) => {
    if (!cashierSaved) {
      setCashierError('Please save the Cashier Name before adding items to the cart.');
      cashierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setCashierError('');
    setCart((prev) => ({
      ...prev,
      [product.id]: { ...product, quantity: (prev[product.id]?.quantity || 0) + 1 },
    }));
  };

  const handleStartPay = () => { setIsPaying(true); setPaymentChange(null); setPaymentError(''); };
  const handlePaymentAmountChange = (v) => setPaymentAmount(v);
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    if (Number.isNaN(amount)) { setPaymentError('Enter a valid payment amount'); setPaymentChange(null); return; }
    if (amount < 0) { setPaymentError('Payment amount cannot be negative'); setPaymentChange(null); return; }
    setPaymentError('');
    setPaymentChange((amount / currentRate) - total);
  };

  const handleNewCustomer = () => {
    setCart({}); setPaymentAmount(''); setPaymentChange(null);
    setPaymentError(''); setIsPaying(false); setCurrentSerial('');
  };

  const handleGenerateReceipt = () => {
    const serial = generateSerial();
    setCurrentSerial(serial);
    const { dateStr, timeStr } = getLocalDateTime(currency);
    const cartItems = Object.values(cart);
    const transaction = {
      serialNumber: serial,
      cashierName,
      date: dateStr,
      time: timeStr,
      currency: `${selectedCurrency.label} (${selectedCurrency.symbol})`,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: formatPrice(item.price),
        lineTotal: formatPrice(item.price * item.quantity),
      })),
      subtotal: formatPrice(subtotal),
      taxName: currentTax.name,
      taxRate: currentTax.rate,
      taxAmount: formatPrice(taxAmount),
      usStateName: currency === 'USD' ? US_STATE_TAXES.find(s => s.code === usState)?.name : null,
      total: formatPrice(total),
      amountTendered: formattedTendered || null,
      change: paymentChange !== null
        ? (paymentChange < 0 ? `-${formatPrice(Math.abs(paymentChange))}` : formatPrice(paymentChange))
        : null,
    };
    const existing = loadStorage(TRANSACTIONS_KEY, []);
    saveStorage(TRANSACTIONS_KEY, [transaction, ...existing]);
    setIsReceiptPage(true);
  };

  useEffect(() => {
    if (editId !== null) {
      const p = products.find((p) => p.id === editId);
      if (p) setEditPrice((p.price * currentRate).toFixed(2));
    }
  }, [currency, editId, products, currentRate]);

  useEffect(() => {
    if (total === 0) { setIsPaying(false); setPaymentAmount(''); setPaymentChange(null); setPaymentError(''); }
  }, [total]);

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id].quantity > 1) next[id] = { ...next[id], quantity: next[id].quantity - 1 };
      else delete next[id];
      return next;
    });
  };

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, unit: product.unit || getDefaultUnit(product.name) }]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  const handleEditProduct = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice((product.price * currentRate).toFixed(2));
    setEditSearch(''); // clear search so suggestion dropdown doesn't show
    setTimeout(() => editSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
  const filteredProducts = sortedProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const suggestions = search ? sortedProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8) : [];
  const editSuggestions = editSearch ? sortedProducts.filter((p) => p.name.toLowerCase().includes(editSearch.toLowerCase())).slice(0, 8) : [];

  const handleSelectEditProduct = (product) => {
    setEditId(product.id); setEditName(product.name);
    setEditPrice((product.price * currentRate).toFixed(2)); setEditSearch(product.name);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editId || !editName || !editPrice) return;
    const rawPrice = parseFloat(editPrice) / currentRate;
    setProducts((prev) => prev.map((p) => p.id === editId ? { ...p, name: editName, price: rawPrice } : p));
    setEditId(null); setEditName(''); setEditPrice(''); setEditSearch('');
  };

  if (isReceiptPage) {
    return (
      <div className="app">
        <PrintReceipt
          cart={cart} total={total} formatPrice={formatPrice}
          formatProductPrice={formatProductPrice}
          amountTendered={formattedTendered} paymentChange={paymentChange}
          onBack={() => setIsReceiptPage(false)} showBackButton
          serialNumber={currentSerial} cashierName={cashierName} currencyCode={currency}
          subtotal={subtotal} taxAmount={taxAmount} taxName={currentTax.name} taxRate={currentTax.rate}
          usStateName={currency === 'USD' ? US_STATE_TAXES.find(s => s.code === usState)?.name : null}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🛒 Grocery Calculator</h1>
        <div className="header-actions">
          <div className="currency-selector">
            <label htmlFor="currency-select">
              Currency:
              {ratesLoading && <span className="rate-badge rate-loading"> ⟳ updating...</span>}
              {!ratesLoading && !ratesError && <span className="rate-badge rate-live"> ● live</span>}
              {!ratesLoading && ratesError && <span className="rate-badge rate-fallback"> ⚠ offline rates</span>}
            </label>
            <select id="currency-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {currencyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label} ({o.symbol})</option>
              ))}
            </select>
            {currency === 'USD' && (
              <select
                id="us-state-select"
                value={usState}
                onChange={(e) => setUsState(e.target.value)}
                className="us-state-select"
                title="Select US State for sales tax"
              >
                {US_STATE_TAXES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.rate === 0 ? 'No Tax' : `${(s.rate * 100).toFixed(s.rate % 0.01 === 0 ? 0 : 2)}%`})
                  </option>
                ))}
              </select>
            )}
          </div>
          <button type="button" className="new-customer-btn" onClick={handleNewCustomer}>New Customer</button>
        </div>
        <div className="search-section">
          <input
            type="text" placeholder="Search products to add to cart..."
            value={search} onChange={(e) => setSearch(e.target.value)} className="search-bar"
          />
          {search && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((p) => (
                <li key={p.id} className="suggestion-item"
                  onClick={() => { handleAddToCart(p); setSearch(''); }}>
                  <span>{p.name}</span><span>{formatProductPrice(p)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="main-content">
        {/* LEFT */}
        <div className="left">

          {/* CASHIER CARD */}
          <div className="card cashier-card" ref={cashierRef}>
            <h2>👤 Cashier Info</h2>
            {cashierError && <div className="cashier-error">{cashierError}</div>}
            {cashierSaved ? (
              <div className="cashier-saved-row">
                <div className="cashier-saved-info">
                  <span className="cashier-label">Cashier on duty:</span>
                  <span className="cashier-value">{cashierName}</span>
                </div>
                <button className="btn-edit-cashier" onClick={() => setCashierSaved(false)}>Edit</button>
              </div>
            ) : (
              <div className="cashier-form-row">
                <input
                  type="text"
                  placeholder="Enter cashier name..."
                  value={cashierInput}
                  onChange={(e) => setCashierInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveCashier()}
                  className="cashier-input"
                />
                <button className="btn-save-cashier" onClick={handleSaveCashier}>Save</button>
              </div>
            )}
          </div>

          {/* PRODUCTS */}
          <div className="card">
            <h2>Products</h2>
            <ProductList
              products={filteredProducts} onAdd={handleAddToCart}
              formatProductPrice={formatProductPrice}
              onRemoveProduct={removeProduct} onEditProduct={handleEditProduct}
            />
          </div>

          {/* ADD PRODUCT */}
          <div className="card add-product-card">
            <AddProduct onAddProduct={addProduct} currency={selectedCurrency} getUnit={getDefaultUnit} />
          </div>

          {/* EDIT PRODUCT */}
          <div className="card edit-section" ref={editSectionRef}>
            <h2>Edit Product</h2>
            <input
              type="text" placeholder="Search product to edit..." value={editSearch}
              onChange={(e) => { setEditSearch(e.target.value); setEditId(null); setEditName(''); setEditPrice(''); }}
              className="search-bar"
            />
            {editSearch && editSuggestions.length > 0 && (
              <ul className="suggestions">
                {editSuggestions.map((p) => (
                  <li key={p.id} className="suggestion-item" onClick={() => handleSelectEditProduct(p)}>
                    <span>{p.name}</span><span>{formatProductPrice(p)}</span>
                  </li>
                ))}
              </ul>
            )}
            {editId && (
              <form onSubmit={saveEdit} className="edit-form">
                <input type="text" placeholder="Product Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="number" placeholder={`Price (${selectedCurrency.symbol})`} value={editPrice} onChange={(e) => setEditPrice(e.target.value)} step="0.01" />
                <div className="edit-actions">
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => { setEditId(null); setEditName(''); setEditPrice(''); setEditSearch(''); }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="card">
            <Cart
              cart={cart} onRemove={removeFromCart} total={total}
              currencyRate={currentRate} isPaying={isPaying}
              paymentAmount={paymentAmount} paymentChange={paymentChange}
              paymentError={paymentError} onPayClick={handleStartPay}
              onPaymentChange={handlePaymentAmountChange} onPaymentSubmit={handlePaymentSubmit}
              formatPrice={formatPrice} formatProductPrice={formatProductPrice}
              onGenerateReceipt={handleGenerateReceipt}
            />
          </div>
          <TransactionSearch />
        </div>
      </div>
    </div>
  );
}

export default App;
