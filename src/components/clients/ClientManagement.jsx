import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import {
  Building2,
  PlusCircle,
  Search,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  FileText,
  Globe,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ClientManagement = () => {
  const { clients, addClient, orders, setActiveTab, permissions } = useERP();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClientForHistory, setSelectedClientForHistory] = useState(null);

  // New Client Form
  const [clientForm, setClientForm] = useState({
    companyName: '',
    brand: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    address: '',
    taxId: '',
    paymentTerms: '30% Advance, 70% against BL'
  });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!clientForm.companyName || !clientForm.email) return;

    addClient(clientForm);
    setShowAddModal(false);
    setClientForm({
      companyName: '',
      brand: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: 'United Kingdom',
      address: '',
      taxId: '',
      paymentTerms: '30% Advance, 70% against BL'
    });
  };

  // Filter clients
  const filteredClients = clients.filter(c =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            Client Management (CRM & Buyer Directory)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global fashion brands, retail buyers, trade credit terms, and historical contract logs.
          </p>
        </div>

        {permissions.canEditOrders && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Register New Buyer
          </button>
        )}
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Registered Buyers</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{clients.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Across Europe, North America & Asia</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase">Lifetime Buyer Billing</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">
            ${clients.reduce((sum, c) => sum + (c.totalSpent || 0), 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Export contracts fulfilled</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Active Buyer Dues</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            ${clients.reduce((sum, c) => sum + (c.outstandingDue || 0), 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Credit within agreed terms</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search brand, company, country, or buyer contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredClients.length} buyers
        </span>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClients.map(client => {
          // Find orders linked to this client
          const clientOrders = orders.filter(
            o => o.clientId === client.id || o.companyName === client.companyName
          );

          return (
            <div
              key={client.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {client.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-50 text-purple-700">
                        {client.status || 'Active'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {client.companyName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      Brand: <span className="text-indigo-600 font-bold">{client.brand}</span>
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                {/* Details & Contacts */}
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{client.address}, {client.country}</span>
                  </div>
                </div>

                {/* Payment Terms & Tax */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax / VAT ID:</span>
                    <span className="font-mono text-slate-700 font-semibold">{client.taxId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-500">Payment Terms:</span>
                    <span className="font-medium text-slate-800">{client.paymentTerms}</span>
                  </div>
                </div>
              </div>

              {/* Order History Summary & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">Past Orders Count</p>
                  <p className="text-xs font-bold text-slate-800">
                    {clientOrders.length} Orders Placed
                  </p>
                </div>

                <button
                  onClick={() => setSelectedClientForHistory({ client, orders: clientOrders })}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Order History ({clientOrders.length})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: ADD NEW CLIENT */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Register New Client / Buyer</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  ID will be auto-generated: CLI-50{clients.length + 1}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddClient} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Primark Stores Ltd"
                    value={clientForm.companyName}
                    onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Cedar Wood State"
                    value={clientForm.brand}
                    onChange={(e) => setClientForm({ ...clientForm, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Simon Ward"
                    value={clientForm.contactPerson}
                    onChange={(e) => setClientForm({ ...clientForm, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Germany / United States"
                    value={clientForm.country}
                    onChange={(e) => setClientForm({ ...clientForm, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@client.com"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+44 20 7946 0991"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Tax / VAT ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., GB-99881122"
                    value={clientForm.taxId}
                    onChange={(e) => setClientForm({ ...clientForm, taxId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    value={clientForm.paymentTerms}
                    onChange={(e) => setClientForm({ ...clientForm, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Headquarter Address
                </label>
                <textarea
                  rows="2"
                  value={clientForm.address}
                  onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                  placeholder="Street, City, Postal Code"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md"
                >
                  Save Buyer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER: CLIENT PAST ORDER HISTORY */}
      {selectedClientForHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedClientForHistory.client.companyName}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    Past Order History & Billing Audit
                  </p>
                </div>
                <button
                  onClick={() => setSelectedClientForHistory(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {selectedClientForHistory.orders.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No orders recorded for this client yet.
                  </div>
                ) : (
                  selectedClientForHistory.orders.map(order => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {order.id}
                        </span>
                        <span className="font-semibold px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700">
                          {order.status}
                        </span>
                      </div>

                      <div className="font-bold text-slate-800 text-sm">
                        {order.itemName}
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Quantity:</span>
                          <span className="font-bold text-slate-800">{order.quantity.toLocaleString()} Pcs</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Total Value:</span>
                          <span className="font-mono font-bold text-slate-900">৳{order.totalAmount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Balance Due:</span>
                          <span className={`font-mono font-bold ${order.dueAmount === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            ৳{order.dueAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Order Date: {order.orderDate}</span>
                        <span>Delivery: <strong>{order.deliveryDate}</strong></span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedClientForHistory(null)}
              className="mt-6 w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Close History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
