import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  INITIAL_ROLES,
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_CLIENTS,
  INITIAL_ORDERS,
  INITIAL_RECEIPTS,
  INITIAL_RAW_MATERIALS,
  INITIAL_FINISHED_GOODS,
  INITIAL_PURCHASE_TRACKING,
  INITIAL_MATERIAL_USAGE,
  INITIAL_SHAREHOLDERS,
  INITIAL_DIVIDEND_HISTORY,
  DAILY_FINANCIAL_LOGS,
  INITIAL_MANAGING_BODY,
  INITIAL_SALARIES,
  INITIAL_PAYMENTS,
  INITIAL_OFFICE_COSTS,
  INITIAL_OTHER_EXPENSES
} from '../data/initialData';

const ERPContext = createContext(null);

export const ERPProvider = ({ children }) => {
  // Current Active Role for Access Control Simulation
  const [currentRoleId, setCurrentRoleId] = useState('super_admin');
  const roles = INITIAL_ROLES;

  // Active module view - defaults to 'dashboard'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [salaries, setSalaries] = useState(INITIAL_SALARIES);
  const [managingBody, setManagingBody] = useState(INITIAL_MANAGING_BODY);
  const [rawMaterials, setRawMaterials] = useState(INITIAL_RAW_MATERIALS);
  const [finishedGoods, setFinishedGoods] = useState(INITIAL_FINISHED_GOODS);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASE_TRACKING);
  const [materialUsages, setMaterialUsages] = useState(INITIAL_MATERIAL_USAGE);
  const [shareholders, setShareholders] = useState(INITIAL_SHAREHOLDERS);
  const [dividendHistory, setDividendHistory] = useState(INITIAL_DIVIDEND_HISTORY);
  const [officeCosts, setOfficeCosts] = useState(INITIAL_OFFICE_COSTS);
  const [otherExpenses, setOtherExpenses] = useState(INITIAL_OTHER_EXPENSES);

  // Daily Financials
  const [todayIncome, setTodayIncome] = useState(DAILY_FINANCIAL_LOGS.todayIncome);
  const [todayExpense, setTodayExpense] = useState(DAILY_FINANCIAL_LOGS.todayExpense);

  // Receipt Modal State for preview & printing
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  // --- ACCESS CONTROL DEFINITION (Redesigned 12 Modules) ---
  const currentRole = useMemo(() => {
    return roles.find(r => r.id === currentRoleId) || roles[0];
  }, [currentRoleId, roles]);

  const permissions = useMemo(() => {
    switch (currentRoleId) {
      case 'super_admin':
        return {
          canViewAll: true,
          dashboard: true,
          orders: true,
          payment_history: true,
          purchase: true,
          production: true,
          stock: true,
          warehouse: true,
          employee_list: true,
          attendance: true,
          salary: true,
          office_cost: true,
          other_expense: true,
          managing_body: true,
          shareholders: true,
          roles: true,
          canEditEmployees: true,
          canEditOrders: true,
          canEditStock: true,
          canDisburseDividends: true,
          canProcessSalary: true,
          canEditExpenses: true
        };
      case 'hr_manager':
        return {
          canViewAll: false,
          dashboard: true,
          orders: false,
          payment_history: false,
          purchase: false,
          production: false,
          stock: false,
          warehouse: false,
          employee_list: true,
          attendance: true,
          salary: true,
          office_cost: false,
          other_expense: false,
          managing_body: false,
          shareholders: false,
          roles: true,
          canEditEmployees: true,
          canEditOrders: false,
          canEditStock: false,
          canDisburseDividends: false,
          canProcessSalary: true,
          canEditExpenses: false
        };
      case 'inventory_manager':
        return {
          canViewAll: false,
          dashboard: true,
          orders: false,
          payment_history: false,
          purchase: true,
          production: false,
          stock: true,
          warehouse: true,
          employee_list: false,
          attendance: false,
          salary: false,
          office_cost: false,
          other_expense: false,
          managing_body: false,
          shareholders: false,
          roles: true,
          canEditEmployees: false,
          canEditOrders: false,
          canEditStock: true,
          canDisburseDividends: false,
          canProcessSalary: false,
          canEditExpenses: false
        };
      case 'production_manager':
        return {
          canViewAll: false,
          dashboard: true,
          orders: false,
          payment_history: false,
          purchase: true,
          production: true,
          stock: true,
          warehouse: true,
          employee_list: false,
          attendance: false,
          salary: false,
          office_cost: false,
          other_expense: false,
          managing_body: false,
          shareholders: false,
          roles: true,
          canEditEmployees: false,
          canEditOrders: false,
          canEditStock: false,
          canDisburseDividends: false,
          canProcessSalary: false,
          canEditExpenses: false
        };
      case 'accounts_manager':
        return {
          canViewAll: false,
          dashboard: true,
          orders: true,
          payment_history: true,
          purchase: true,
          production: false,
          stock: false,
          warehouse: false,
          employee_list: false,
          attendance: false,
          salary: true,
          office_cost: true,
          other_expense: true,
          managing_body: false,
          shareholders: false,
          roles: true,
          canEditEmployees: false,
          canEditOrders: true,
          canEditStock: false,
          canDisburseDividends: false,
          canProcessSalary: true,
          canEditExpenses: true
        };
      case 'shareholder':
        return {
          canViewAll: false,
          dashboard: true,
          orders: false,
          payment_history: true,
          purchase: false,
          production: false,
          stock: false,
          warehouse: false,
          employee_list: false,
          attendance: false,
          salary: false,
          office_cost: true,
          other_expense: true,
          managing_body: true,
          shareholders: true,
          roles: true,
          canEditEmployees: false,
          canEditOrders: false,
          canEditStock: false,
          canDisburseDividends: false,
          canProcessSalary: false,
          canEditExpenses: false
        };
      default:
        return { canViewAll: true, dashboard: true, roles: true, office_cost: true, other_expense: true, warehouse: true };
    }
  }, [currentRoleId]);

  // --- EMPLOYEE MANAGEMENT ---
  const generateEmployeeId = () => {
    const currentYear = new Date().getFullYear();
    const count = employees.length + 1;
    const padded = String(count).padStart(3, '0');
    return `EMP-${currentYear}-${padded}`;
  };

  const addEmployee = (employeeData) => {
    const newId = generateEmployeeId();
    const newEmp = {
      ...employeeData,
      id: newId,
      status: 'Active',
      workHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          event: `Enrolled as ${employeeData.type} staff in ${employeeData.department} department.`
        }
      ]
    };
    setEmployees(prev => [newEmp, ...prev]);

    // Also prepare an attendance row for today
    const today = new Date().toISOString().split('T')[0];
    setAttendance(prev => [
      {
        id: `ATT-${Date.now()}`,
        employeeId: newId,
        employeeName: newEmp.name,
        department: newEmp.department,
        date: today,
        checkIn: '--',
        checkOut: '--',
        overtimeHours: 0,
        status: 'Absent',
        otPayment: 0
      },
      ...prev
    ]);

    // Prepare payroll row
    const baseSal = parseFloat(employeeData.salary) || 25000;
    setSalaries(prev => [
      {
        payrollId: `PAY-2026-09-0${prev.length + 1}`,
        employeeId: newId,
        employeeName: newEmp.name,
        designation: newEmp.designation,
        department: newEmp.department,
        type: newEmp.type,
        month: 'September 2026',
        baseSalary: baseSal,
        workingDays: 26,
        presentDays: 26,
        overtimeHours: 0,
        hourlyOtRate: parseFloat(employeeData.hourlyOtRate) || 200,
        overtimePay: 0,
        attendanceAllowance: 1500,
        grossSalary: baseSal + 1500,
        deductions: Math.round(baseSal * 0.05),
        netSalary: Math.round(baseSal * 0.95) + 1500,
        status: 'Pending',
        disbursedDate: '--',
        paymentMethod: newEmp.type === 'Permanent' ? 'Bank Transfer' : 'Cash Payroll'
      },
      ...prev
    ]);

    return newEmp;
  };

  const logAttendance = (empId, checkIn, checkOut, otHours, statusOverride) => {
    const emp = employees.find(e => e.id === empId);
    const hourlyRate = emp ? (emp.hourlyOtRate || 200) : 200;
    const otPay = (parseFloat(otHours) || 0) * hourlyRate;

    setAttendance(prev => {
      const existingIndex = prev.findIndex(a => a.employeeId === empId);
      const updatedRow = {
        id: existingIndex >= 0 ? prev[existingIndex].id : `ATT-${Date.now()}`,
        employeeId: empId,
        employeeName: emp ? emp.name : 'Unknown',
        department: emp ? emp.department : 'General',
        date: new Date().toISOString().split('T')[0],
        checkIn: checkIn || '--',
        checkOut: checkOut || '--',
        overtimeHours: parseFloat(otHours) || 0,
        status: statusOverride || (checkIn && checkIn !== '--' ? 'Present' : 'Absent'),
        otPayment: otPay
      };

      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = updatedRow;
        return copy;
      } else {
        return [updatedRow, ...prev];
      }
    });

    if (otPay > 0) {
      setTodayExpense(prev => prev + otPay);
    }
  };

  // --- SALARY / PAYROLL PROCESSING ---
  const processSalaryPayment = (payrollId) => {
    setSalaries(prev => prev.map(sal => {
      if (sal.payrollId === payrollId) {
        return {
          ...sal,
          status: 'Paid',
          disbursedDate: new Date().toISOString().split('T')[0]
        };
      }
      return sal;
    }));
  };

  const processAllPendingSalaries = () => {
    const today = new Date().toISOString().split('T')[0];
    setSalaries(prev => prev.map(sal => ({
      ...sal,
      status: 'Paid',
      disbursedDate: sal.status === 'Paid' ? sal.disbursedDate : today
    })));
  };

  // --- ORDER MANAGEMENT & ACCOUNTING ---
  const generateOrderId = () => {
    const count = 7080 + orders.length + 1;
    return `ORD-${count}`;
  };

  const addOrder = (orderData) => {
    const newId = generateOrderId();
    const qty = parseFloat(orderData.quantity) || 0;
    const rate = parseFloat(orderData.ratePerPiece) || 0;
    const total = qty * rate;
    const advance = parseFloat(orderData.advancePaid) || 0;
    const due = Math.max(0, total - advance);

    const estCost = orderData.estimatedCost
      ? parseFloat(orderData.estimatedCost)
      : Math.round(total * 0.72);

    const projectedProfit = total - estCost;
    const profitMargin = total > 0 ? ((projectedProfit / total) * 100).toFixed(2) : 0;

    const newOrder = {
      id: newId,
      clientId: orderData.clientId || 'CLI-501',
      companyName: orderData.companyName,
      itemName: orderData.itemName,
      category: orderData.category || 'Apparel',
      quantity: qty,
      ratePerPiece: rate,
      totalAmount: total,
      advancePaid: advance,
      dueAmount: due,
      estimatedCost: estCost,
      projectedNetProfit: projectedProfit,
      profitMargin: parseFloat(profitMargin),
      orderDate: orderData.orderDate || new Date().toISOString().split('T')[0],
      deliveryDate: orderData.deliveryDate,
      status: 'Fabric Sourcing',
      productionProgress: 10,
      paymentStatus: advance >= total ? 'Fully Paid' : (advance > 0 ? 'Partial Advance' : 'Pending Advance'),
      notes: orderData.notes || ''
    };

    setOrders(prev => [newOrder, ...prev]);

    // If an advance was paid upon creation, log into payment history and receipts
    if (advance > 0) {
      const receiptNo = `RCP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const txnId = `TXN-${Math.floor(8000 + Math.random() * 1999)}`;
      const today = new Date().toISOString().split('T')[0];

      const newReceipt = {
        receiptNo,
        orderId: newId,
        clientName: orderData.companyName,
        date: today,
        type: advance >= total ? 'Full Settlement' : 'Advance Payment',
        amount: advance,
        paymentMethod: orderData.paymentMethod || 'Bank Wire / TT',
        bankRef: `TXN-${Date.now().toString().slice(-6)}`,
        receivedBy: 'Finance & Accounts Desk',
        remainingDue: due,
        notes: `Initial advance received for order ${newId}`
      };

      const newPayment = {
        txnId,
        receiptNo,
        orderId: newId,
        clientName: orderData.companyName,
        date: today,
        type: advance >= total ? 'Final Settlement' : 'Advance Payment',
        amount: advance,
        paymentMethod: orderData.paymentMethod || 'Bank Wire / TT',
        bankRef: `TXN-${Date.now().toString().slice(-6)}`,
        receivedBy: 'Finance & Accounts Desk',
        remainingDue: due,
        status: 'Cleared & Verified',
        notes: `Initial advance for ${orderData.itemName}`
      };

      setReceipts(prev => [newReceipt, ...prev]);
      setPayments(prev => [newPayment, ...prev]);
      setTodayIncome(prev => prev + advance);
    }

    return newOrder;
  };

  const recordOrderPayment = (orderId, amount, paymentMethod, notes) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const payAmount = parseFloat(amount) || 0;
    const newAdvance = (order.advancePaid || 0) + payAmount;
    const newDue = Math.max(0, order.totalAmount - newAdvance);
    const newStatus = newDue === 0 ? 'Fully Paid' : 'Partial Advance';

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          advancePaid: newAdvance,
          dueAmount: newDue,
          paymentStatus: newStatus
        };
      }
      return o;
    }));

    const receiptNo = `RCP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const txnId = `TXN-${Math.floor(8000 + Math.random() * 1999)}`;
    const today = new Date().toISOString().split('T')[0];

    const receipt = {
      receiptNo,
      orderId: order.id,
      clientName: order.companyName,
      date: today,
      type: newDue === 0 ? 'Final Settlement' : 'Interim Payment',
      amount: payAmount,
      paymentMethod: paymentMethod || 'Bank Wire / TT',
      bankRef: `TXN-${Date.now().toString().slice(-6)}`,
      receivedBy: 'Finance & Accounts Desk',
      remainingDue: newDue,
      notes: notes || `Payment recorded for order ${order.id}`
    };

    const paymentRecord = {
      txnId,
      receiptNo,
      orderId: order.id,
      clientName: order.companyName,
      date: today,
      type: newDue === 0 ? 'Final Settlement' : 'Interim Payment',
      amount: payAmount,
      paymentMethod: paymentMethod || 'Bank Wire / TT',
      bankRef: `TXN-${Date.now().toString().slice(-6)}`,
      receivedBy: 'Finance & Accounts Desk',
      remainingDue: newDue,
      status: 'Cleared & Verified',
      notes: notes || `Payment recorded for order ${order.id}`
    };

    setReceipts(prev => [receipt, ...prev]);
    setPayments(prev => [paymentRecord, ...prev]);
    setTodayIncome(prev => prev + payAmount);

    return receipt;
  };

  // --- PRODUCTION & MATERIAL CONSUMPTION ---
  const recordMaterialPurchase = (purchaseData) => {
    const purchaseId = `PO-2026-${Math.floor(900 + Math.random() * 99)}`;
    const totalCost = (parseFloat(purchaseData.quantity) || 0) * (parseFloat(purchaseData.unitCost) || 0);

    const newPurchase = {
      purchaseId,
      orderId: purchaseData.orderId,
      materialId: purchaseData.materialId,
      materialName: purchaseData.materialName,
      supplier: purchaseData.supplier,
      quantityPurchased: parseFloat(purchaseData.quantity),
      unit: purchaseData.unit,
      unitCost: parseFloat(purchaseData.unitCost),
      totalCost,
      purchaseDate: purchaseData.purchaseDate || new Date().toISOString().split('T')[0],
      invoiceNumber: purchaseData.invoiceNumber || `INV-${Date.now().toString().slice(-5)}`,
      status: 'Delivered to Floor'
    };

    setPurchases(prev => [newPurchase, ...prev]);

    // Also update raw material inventory stock
    setRawMaterials(prev => prev.map(m => {
      if (m.id === purchaseData.materialId || m.name.toLowerCase() === purchaseData.materialName.toLowerCase()) {
        return {
          ...m,
          currentStock: m.currentStock + parseFloat(purchaseData.quantity)
        };
      }
      return m;
    }));

    setTodayExpense(prev => prev + totalCost);
    return newPurchase;
  };

  const recordMaterialUsage = (usageData) => {
    const consumed = parseFloat(usageData.consumedQty) || 0;
    const wastage = parseFloat(usageData.wastageQty) || 0;
    const wastagePercent = consumed > 0 ? ((wastage / consumed) * 100).toFixed(2) : 0;

    const existingIndex = materialUsages.findIndex(
      u => u.orderId === usageData.orderId && u.materialName === usageData.materialName
    );

    let updatedList = [...materialUsages];

    if (existingIndex >= 0) {
      const existing = materialUsages[existingIndex];
      const newConsumed = existing.consumedQty + consumed;
      const newRemaining = Math.max(0, existing.allocatedQty - newConsumed);
      const newWastage = existing.wastageQty + wastage;

      updatedList[existingIndex] = {
        ...existing,
        consumedQty: newConsumed,
        remainingQty: newRemaining,
        wastageQty: newWastage,
        wastagePercent: ((newWastage / newConsumed) * 100).toFixed(2),
        stage: usageData.stage || existing.stage,
        lastLoggedDate: new Date().toISOString().split('T')[0]
      };
    } else {
      const allocated = parseFloat(usageData.allocatedQty) || (consumed * 1.2);
      const remaining = Math.max(0, allocated - consumed);

      updatedList.unshift({
        id: `USG-${Date.now().toString().slice(-4)}`,
        orderId: usageData.orderId,
        materialName: usageData.materialName,
        allocatedQty: allocated,
        consumedQty: consumed,
        remainingQty: remaining,
        wastageQty: wastage,
        wastagePercent: parseFloat(wastagePercent),
        unit: usageData.unit || 'Meters',
        stage: usageData.stage || 'Sewing Floor',
        lastLoggedDate: new Date().toISOString().split('T')[0]
      });
    }

    setMaterialUsages(updatedList);

    // AUTOMATIC STOCK DEDUCTION in Inventory
    setRawMaterials(prev => prev.map(m => {
      if (m.name.toLowerCase().includes(usageData.materialName.toLowerCase()) || usageData.materialName.toLowerCase().includes(m.name.toLowerCase())) {
        return {
          ...m,
          currentStock: Math.max(0, m.currentStock - (consumed + wastage))
        };
      }
      return m;
    }));
  };

  // --- INVENTORY MANAGEMENT ---
  const restockMaterial = (materialId, addedQty) => {
    const qty = parseFloat(addedQty) || 0;
    setRawMaterials(prev => prev.map(m => {
      if (m.id === materialId) {
        return {
          ...m,
          currentStock: m.currentStock + qty
        };
      }
      return m;
    }));
  };

  const addRawMaterial = (item) => {
    const count = 100 + rawMaterials.length + 1;
    const newMat = {
      id: `MAT-${count}`,
      name: item.name,
      category: item.category,
      unit: item.unit,
      unitCost: parseFloat(item.unitCost) || 0,
      currentStock: parseFloat(item.currentStock) || 0,
      reorderLevel: parseFloat(item.reorderLevel) || 100,
      location: item.location || 'Warehouse Main',
      supplier: item.supplier || 'Local Mills'
    };
    setRawMaterials(prev => [newMat, ...prev]);
    return newMat;
  };

  // --- SHAREHOLDERS & DIVIDENDS ---
  const calculateDividends = (companyNetProfit, retainedReservePct) => {
    const profit = parseFloat(companyNetProfit) || 0;
    const reserveRate = (parseFloat(retainedReservePct) || 0) / 100;
    const retainedAmount = profit * reserveRate;
    const distributablePool = profit - retainedAmount;

    const allocations = shareholders.map(sh => {
      const share = sh.equitySharePercent;
      const amount = distributablePool * (share / 100);
      return {
        id: sh.id,
        name: sh.name,
        role: sh.role,
        equitySharePercent: share,
        dividendAmount: amount
      };
    });

    return {
      totalProfit: profit,
      retainedReservePercent: retainedReservePct,
      retainedAmount,
      distributablePool,
      allocations
    };
  };

  const disburseDividend = (calculationResult, periodLabel) => {
    const newRecord = {
      period: periodLabel || `Fiscal Period - ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
      declaredDate: new Date().toISOString().split('T')[0],
      totalCompanyNetProfit: calculationResult.totalProfit,
      retainedReservePercent: calculationResult.retainedReservePercent,
      distributablePool: calculationResult.distributablePool,
      status: 'Disbursed',
      allocations: calculationResult.allocations.map(a => ({
        shareholder: a.name,
        share: a.equitySharePercent,
        amount: a.dividendAmount
      }))
    };

    setDividendHistory(prev => [newRecord, ...prev]);

    setShareholders(prev => prev.map(sh => {
      const alloc = calculationResult.allocations.find(a => a.id === sh.id);
      if (alloc) {
        return {
          ...sh,
          dividendsWithdrawn: sh.dividendsWithdrawn + alloc.dividendAmount
        };
      }
      return sh;
    }));
  };

  // Office Costs & Other Expenses Handlers
  const addOfficeCost = (cost) => {
    const newCost = {
      ...cost,
      id: `OFC-2026-${String(officeCosts.length + 1).padStart(3, '0')}`,
      voucherNo: `VCH-OFC-${Math.floor(100 + Math.random() * 900)}`,
      date: cost.date || new Date().toISOString().split('T')[0],
      status: cost.status || 'Paid'
    };
    setOfficeCosts(prev => [newCost, ...prev]);
    return newCost;
  };

  const updateOfficeCostStatus = (costId, status) => {
    setOfficeCosts(prev => prev.map(c => c.id === costId ? { ...c, status } : c));
  };

  const deleteOfficeCost = (costId) => {
    setOfficeCosts(prev => prev.filter(c => c.id !== costId));
  };

  const addOtherExpense = (exp) => {
    const newExp = {
      ...exp,
      id: `OTH-2026-${String(otherExpenses.length + 1).padStart(3, '0')}`,
      voucherNo: `VCH-EXP-${Math.floor(100 + Math.random() * 900)}`,
      date: exp.date || new Date().toISOString().split('T')[0],
      status: exp.status || 'Paid'
    };
    setOtherExpenses(prev => [newExp, ...prev]);
    return newExp;
  };

  const updateOtherExpenseStatus = (expId, status) => {
    setOtherExpenses(prev => prev.map(e => e.id === expId ? { ...e, status } : e));
  };

  const deleteOtherExpense = (expId) => {
    setOtherExpenses(prev => prev.filter(e => e.id !== expId));
  };

  // Quick stats computed
  const stats = useMemo(() => {
    const activeOrdersCount = orders.filter(o => o.status !== 'Delivered').length;
    const totalOrderValue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalAdvanceReceived = orders.reduce((sum, o) => sum + (o.advancePaid || 0), 0);
    const totalOutstandingDue = orders.reduce((sum, o) => sum + (o.dueAmount || 0), 0);
    const totalProjectedProfit = orders.reduce((sum, o) => sum + (o.projectedNetProfit || 0), 0);

    const presentEmployees = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
    const totalEmployees = employees.length;
    const absentEmployees = totalEmployees - presentEmployees;

    const lowStockItems = rawMaterials.filter(m => m.currentStock <= m.reorderLevel);

    const totalOvertimeCost = attendance.reduce((sum, a) => sum + (a.otPayment || 0), 0);
    const totalOtHours = attendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0);

    const totalPurchasesCost = purchases.reduce((sum, p) => sum + (p.totalCost || 0), 0);
    const totalSalariesNet = salaries.reduce((sum, s) => sum + (s.netSalary || 0), 0);
    const pendingSalariesCount = salaries.filter(s => s.status === 'Pending').length;
    const totalPaymentsReceived = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    const totalOfficeCosts = officeCosts.reduce((sum, c) => sum + (c.amount || 0), 0);
    const pendingOfficeCostsCount = officeCosts.filter(c => c.status === 'Pending').length;
    const totalOtherExpenses = otherExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const pendingOtherExpensesCount = otherExpenses.filter(e => e.status === 'Pending').length;
    const totalAccountantExpense = totalSalariesNet + totalPurchasesCost + totalOfficeCosts + totalOtherExpenses;

    return {
      activeOrdersCount,
      totalOrderValue,
      totalAdvanceReceived,
      totalOutstandingDue,
      totalProjectedProfit,
      presentEmployees,
      totalEmployees,
      absentEmployees,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      totalOvertimeCost,
      totalOtHours,
      totalPurchasesCost,
      totalSalariesNet,
      pendingSalariesCount,
      totalPaymentsReceived,
      totalOfficeCosts,
      pendingOfficeCostsCount,
      totalOtherExpenses,
      pendingOtherExpensesCount,
      totalAccountantExpense
    };
  }, [orders, attendance, employees, rawMaterials, purchases, salaries, payments, officeCosts, otherExpenses]);

  return (
    <ERPContext.Provider
      value={{
        currentRoleId,
        setCurrentRoleId,
        roles,
        currentRole,
        permissions,
        activeTab,
        setActiveTab,
        employees,
        addEmployee,
        attendance,
        logAttendance,
        clients,
        orders,
        addOrder,
        recordOrderPayment,
        receipts,
        payments,
        salaries,
        processSalaryPayment,
        processAllPendingSalaries,
        managingBody,
        activeReceiptModal,
        setActiveReceiptModal,
        rawMaterials,
        addRawMaterial,
        restockMaterial,
        finishedGoods,
        purchases,
        recordMaterialPurchase,
        materialUsages,
        recordMaterialUsage,
        shareholders,
        dividendHistory,
        calculateDividends,
        disburseDividend,
        officeCosts,
        addOfficeCost,
        updateOfficeCostStatus,
        deleteOfficeCost,
        otherExpenses,
        addOtherExpense,
        updateOtherExpenseStatus,
        deleteOtherExpense,
        todayIncome,
        todayExpense,
        stats
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};
