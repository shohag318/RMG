import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  ShoppingBag,
  PlusCircle,
  Search,
  Filter,
  Receipt,
  Printer,
  Calendar,
  Layers,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PaymentReceiptModal } from './PaymentReceiptModal';

export const OrderManagement = () => {
  const {
    orders,
    addOrder,
    recordOrderPayment,
    clients,
    receipts,
    permissions,
    activeReceiptModal,
    setActiveReceiptModal
  } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  // Quick Payment Recording Modal
  const [paymentModalOrder, setPaymentModalOrder] = useState(null);
  const [payForm, setPayForm] = useState({
    amount: '',
    paymentMethod: 'Bank Wire / TT',
    notes: ''
  });

  // New Order Form state
  const [newOrderForm, setNewOrderForm] = useState({
    companyName: 'Nordic Vogue Retail AB',
    itemName: '',
    category: 'Knitwear',
    quantity: 5000,
    ratePerPiece: 12.00,
    advancePaid: 20000,
    estimatedCost: 42000,
    deliveryDate: '2026-11-15',
    paymentMethod: 'Bank Wire / TT',
    notes: 'Export standard export packaging'
  });

  // Calculate live preview in order form
  const formTotalAmount = (parseFloat(newOrderForm.quantity) || 0) * (parseFloat(newOrderForm.ratePerPiece) || 0);
  const formDueAmount = Math.max(0, formTotalAmount - (parseFloat(newOrderForm.advancePaid) || 0));
  const formEstCost = newOrderForm.estimatedCost
    ? parseFloat(newOrderForm.estimatedCost)
    : Math.round(formTotalAmount * 0.70);
  const formNetProfit = formTotalAmount - formEstCost;
  const formMargin = formTotalAmount > 0 ? ((formNetProfit / formTotalAmount) * 100).toFixed(1) : 0;

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrderForm.companyName || !newOrderForm.itemName) return;

    const created = addOrder({
      ...newOrderForm,
      estimatedCost: formEstCost
    });

    setShowAddOrderModal(false);

    // If advance paid, show the generated receipt right away!
    if (newOrderForm.advancePaid > 0) {
      // Find the latest receipt
      setTimeout(() => {
        const generatedReceipt = {
          receiptNo: `RCP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          orderId: created.id,
          clientName: created.companyName,
          date: new Date().toISOString().split('T')[0],
          type: created.advancePaid >= created.totalAmount ? 'Final Settlement' : 'Advance Payment',
          amount: parseFloat(newOrderForm.advancePaid),
          paymentMethod: newOrderForm.paymentMethod,
          bankRef: `TXN-${Date.now().toString().slice(-6)}`,
          receivedBy: 'Chief Accounts Officer',
          remainingDue: formDueAmount,
          notes: `Initial advance voucher for order ${created.id}`
        };
        setActiveReceiptModal(generatedReceipt);
      }, 300);
    }
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentModalOrder || !payForm.amount) return;

    const receipt = recordOrderPayment(
      paymentModalOrder.id,
      payForm.amount,
      payForm.paymentMethod,
      payForm.notes
    );

    setPaymentModalOrder(null);
    setPayForm({ amount: '', paymentMethod: 'Bank Wire / TT', notes: '' });

    if (receipt) {
      setActiveReceiptModal(receipt);
    }
  };

  // Filtered orders list
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            Order Management & Accounting
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track contracts, advance installments, delivery milestones, and auto-calculated projected net profits.
          </p>
        </div>

        {permissions.canEditOrders && (
          <button
            onClick={() => setShowAddOrderModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Create Garment Order
          </button>
        )}
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Gross Order Pipeline</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ৳{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">{orders.length} contractual purchase orders</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Total Advance Received</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            ৳{orders.reduce((sum, o) => sum + o.advancePaid, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Realized into factory cash flow</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Pending Due Balance</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            ৳{orders.reduce((sum, o) => sum + o.dueAmount, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Against pre-shipment BL / LC</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Projected Net Profit</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">
            ৳{orders.reduce((sum, o) => sum + o.projectedNetProfit, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Auto-deducted fabric, labor & overhead</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ID, company, or garment style..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none font-medium text-slate-700"
          >
            <option value="All">All Production Stages</option>
            <option value="Fabric Sourcing">Fabric Sourcing</option>
            <option value="Cutting">Cutting</option>
            <option value="Sewing">Sewing</option>
            <option value="Ready for Dispatch">Ready for Dispatch</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Order List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Client / Company</th>
                <th className="py-3 px-4">Garment Item & Qty</th>
                <th className="py-3 px-4">Rate & Total Value (TK)</th>
                <th className="py-3 px-4">Advance Paid (TK)</th>
                <th className="py-3 px-4">Due Amount (TK)</th>
                <th className="py-3 px-4">Projected Profit (TK)</th>
                <th className="py-3 px-4">Delivery Date</th>
                <th className="py-3 px-4">Floor Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {order.companyName}
                      <span className="block text-[11px] font-normal text-slate-400">
                        {order.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{order.itemName}</p>
                      <p className="text-[11px] font-bold text-slate-600">
                        {order.quantity.toLocaleString()} Pcs
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-slate-500 text-[11px]">
                        @ ৳{order.ratePerPiece.toLocaleString()}/pc
                      </p>
                      <p className="font-mono font-black text-slate-900">
                        ৳{order.totalAmount.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                      ৳{order.advancePaid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={order.dueAmount === 0 ? 'text-slate-400' : 'text-amber-600'}>
                        ৳{order.dueAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-black text-indigo-600">
                        +৳{order.projectedNetProfit.toLocaleString()}
                      </p>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {order.profitMargin}% margin
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {order.deliveryDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {permissions.canEditOrders && order.dueAmount > 0 && (
                          <button
                            onClick={() => {
                              setPaymentModalOrder(order);
                              setPayForm({
                                amount: order.dueAmount,
                                paymentMethod: 'Bank Wire / TT',
                                notes: `Settlement for order ${order.id}`
                              });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] transition-colors"
                          >
                            + Pay Due
                          </button>
                        )}

                        <button
                          onClick={() => {
                            // Find receipt for this order
                            const rc = receipts.find(r => r.orderId === order.id) || {
                              receiptNo: `RCP-2026-${order.id.split('-')[1]}`,
                              orderId: order.id,
                              clientName: order.companyName,
                              date: order.orderDate,
                              type: order.advancePaid >= order.totalAmount ? 'Final Settlement' : 'Advance Payment',
                              amount: order.advancePaid,
                              paymentMethod: 'Bank Wire / TT',
                              bankRef: `SWIFT-${order.id}`,
                              receivedBy: 'Chief Accounts Officer',
                              remainingDue: order.dueAmount,
                              notes: `Payment receipt voucher for ${order.itemName}`
                            };
                            setActiveReceiptModal(rc);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <Receipt className="w-3 h-3" />
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: CREATE NEW GARMENT ORDER */}
      {showAddOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create Garment Production Order</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  ID will be auto-generated: ORD-708{orders.length + 1}
                </p>
              </div>
              <button
                onClick={() => setShowAddOrderModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client / Company Name *
                  </label>
                  <select
                    value={newOrderForm.companyName}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.companyName}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Garment Category *
                  </label>
                  <select
                    value={newOrderForm.category}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Knitwear">Knitwear (Hoodies, Sweaters)</option>
                    <option value="T-Shirts">T-Shirts & Polos</option>
                    <option value="Denim">Denim & Jeans</option>
                    <option value="Woven Shirts">Woven Shirts</option>
                    <option value="Activewear">Activewear</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Garment Style Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Heavy Cotton Raglan Crewneck 340 GSM"
                  value={newOrderForm.itemName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, itemName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Requirement: Order Quantity (Pieces), Rate per piece, Delivery Date */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantity (Pieces) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newOrderForm.quantity}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, quantity: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rate per Piece (TK) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={newOrderForm.ratePerPiece}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, ratePerPiece: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newOrderForm.deliveryDate}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, deliveryDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Advance Payment & Method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Advance Payment (TK)
                  </label>
                  <input
                    type="number"
                    value={newOrderForm.advancePaid}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, advancePaid: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={newOrderForm.paymentMethod}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Bank Wire / TT">Bank Wire / TT</option>
                    <option value="Letter of Credit (LC)">Letter of Credit (LC)</option>
                    <option value="Cheque">Corporate Cheque</option>
                    <option value="Cash">Cash Voucher</option>
                  </select>
                </div>
              </div>

              {/* AUTOMATIC FINANCIALS CALCULATION PREVIEW BOX */}
              <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Order Contract Value:</span>
                  <span className="font-mono font-bold text-slate-900">৳{formTotalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Advance Paid:</span>
                  <span className="font-mono font-bold text-emerald-700">৳{(newOrderForm.advancePaid || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Remaining Due Balance:</span>
                  <span className="font-mono font-bold text-amber-700">৳{formDueAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-indigo-200/50">
                  <span className="font-bold text-indigo-900">Projected Net Profit (Auto):</span>
                  <span className="font-mono font-black text-indigo-900 text-sm">
                    +৳{formNetProfit.toLocaleString()} ({formMargin}%)
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Create Order & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: QUICK PAYMENT RECORDING FOR REMAINING DUE */}
      {paymentModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Record Order Payment</h3>
                <p className="text-xs text-indigo-600 font-semibold">
                  Order {paymentModalOrder.id} &bull; {paymentModalOrder.companyName}
                </p>
              </div>
              <button
                onClick={() => setPaymentModalOrder(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="mt-4 space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Contract:</span>
                  <span className="font-mono font-bold text-slate-900">৳{paymentModalOrder.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-500">Already Received:</span>
                  <span className="font-mono font-bold text-emerald-600">৳{paymentModalOrder.advancePaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-1 pt-1 border-t border-slate-200">
                  <span className="font-bold text-amber-700">Outstanding Due:</span>
                  <span className="font-mono font-black text-amber-700">৳{paymentModalOrder.dueAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Amount to Record (TK) *
                </label>
                <input
                  type="number"
                  required
                  max={paymentModalOrder.dueAmount}
                  value={payForm.amount}
                  onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={payForm.paymentMethod}
                  onChange={(e) => setPayForm({ ...payForm, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Bank Wire / TT">Bank Wire / TT</option>
                  <option value="Letter of Credit (LC)">Letter of Credit (LC)</option>
                  <option value="Corporate Cheque">Corporate Cheque</option>
                  <option value="Cash Voucher">Cash Voucher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Transaction Notes / Bank Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g., Final balance cleared upon inspection certificate"
                  value={payForm.notes}
                  onChange={(e) => setPayForm({ ...payForm, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setPaymentModalOrder(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Save & Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENDER RECEIPT MODAL WHEN TRIGGERED */}
      {activeReceiptModal && (
        <PaymentReceiptModal
          receipt={activeReceiptModal}
          onClose={() => setActiveReceiptModal(null)}
        />
      )}
    </div>
  );
};
