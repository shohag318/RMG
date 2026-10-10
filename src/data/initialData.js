// Initial comprehensive mock database for Garment Manufacturing ERP (RGM)

export const INITIAL_ROLES = [
  { id: 'super_admin', name: 'Super Admin', description: 'Full system access, all reports & company settings', color: 'indigo' },
  { id: 'hr_manager', name: 'HR & Attendance Admin', description: 'Employee directory, attendance check-in/out, overtime calculation', color: 'emerald' },
  { id: 'production_manager', name: 'Production Manager', description: 'Production lines, order materials tracking & consumption logs', color: 'blue' },
  { id: 'inventory_manager', name: 'Inventory & Stock Admin', description: 'Raw materials, finished goods, restock & stock deductions', color: 'amber' },
  { id: 'accounts_manager', name: 'Accounts & Sales Admin', description: 'Orders, clients, billing, advance receipts, daily cash flow', color: 'violet' },
  { id: 'shareholder', name: 'Shareholder / Board Member', description: 'Executive P&L overview & dividend calculation view', color: 'rose' }
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-2026-001',
    name: 'Rahim Chowdhury',
    designation: 'Senior Pattern Master',
    department: 'Cutting',
    type: 'Permanent',
    phone: '+880 1711-234567',
    email: 'rahim.c@rgmapparel.com',
    joinDate: '2022-03-15',
    salary: 45000,
    hourlyOtRate: 250,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    workHistory: [
      { date: '2026-09-28', event: 'Supervised precision cut of 12,000m twill for Zara order #ORD-7081' },
      { date: '2026-08-10', event: 'Promoted to Senior Pattern Master' },
      { date: '2024-01-05', event: 'Completed Automated Gerber CAD training' }
    ]
  },
  {
    id: 'EMP-2026-002',
    name: 'Fatima Begum',
    designation: 'Sewing Line Floor Lead',
    department: 'Sewing',
    type: 'Permanent',
    phone: '+880 1819-876543',
    email: 'fatima.b@rgmapparel.com',
    joinDate: '2021-06-01',
    salary: 38000,
    hourlyOtRate: 220,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    workHistory: [
      { date: '2026-09-27', event: 'Achieved 98.4% DHU pass rate on Denim line 4' },
      { date: '2025-11-20', event: 'Awarded Employee of the Month' }
    ]
  },
  {
    id: 'EMP-2026-003',
    name: 'Tareq Hasan',
    designation: 'Assistant Cutter & Bundler',
    department: 'Cutting',
    type: 'Temporary',
    phone: '+880 1912-349812',
    email: 'tareq.h@rgmapparel.com',
    joinDate: '2026-01-10',
    salary: 19500,
    hourlyOtRate: 140,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    workHistory: [
      { date: '2026-09-25', event: 'Batch bundling for H&M Polo T-Shirts' },
      { date: '2026-01-10', event: 'Joined under 9-month seasonal contract' }
    ]
  },
  {
    id: 'EMP-2026-004',
    name: 'Nasrin Sultana',
    designation: 'Senior QC Inspector',
    department: 'Quality Control',
    type: 'Permanent',
    phone: '+880 1622-441199',
    email: 'nasrin.s@rgmapparel.com',
    joinDate: '2023-02-18',
    salary: 34000,
    hourlyOtRate: 200,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    workHistory: [
      { date: '2026-09-29', event: 'Final AQL 2.5 audit passed for Target Corp order' },
      { date: '2024-05-12', event: 'ISO 9001 Garment Audit lead' }
    ]
  },
  {
    id: 'EMP-2026-005',
    name: 'Kamrul Islam',
    designation: 'Ironing & Steam Finishing Operative',
    department: 'Finishing',
    type: 'Temporary',
    phone: '+880 1515-998877',
    email: 'kamrul.i@rgmapparel.com',
    joinDate: '2026-04-01',
    salary: 18000,
    hourlyOtRate: 130,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    workHistory: [
      { date: '2026-09-26', event: 'Finished 1,800 pieces export cartons' }
    ]
  },
  {
    id: 'EMP-2026-006',
    name: 'Shoriful Alam',
    designation: 'Warehouse & Inventory Officer',
    department: 'Warehouse',
    type: 'Permanent',
    phone: '+880 1788-223344',
    email: 'shoriful.a@rgmapparel.com',
    joinDate: '2022-11-01',
    salary: 32000,
    hourlyOtRate: 190,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    workHistory: [
      { date: '2026-09-28', event: 'Logged incoming shipment of 15,000 yards combed cotton' }
    ]
  }
];

export const INITIAL_ATTENDANCE = [
  { id: 'ATT-101', employeeId: 'EMP-2026-001', employeeName: 'Rahim Chowdhury', department: 'Cutting', date: '2026-09-29', checkIn: '08:00 AM', checkOut: '06:30 PM', overtimeHours: 2.5, status: 'Present', otPayment: 625 },
  { id: 'ATT-102', employeeId: 'EMP-2026-002', employeeName: 'Fatima Begum', department: 'Sewing', date: '2026-09-29', checkIn: '07:55 AM', checkOut: '06:00 PM', overtimeHours: 2.0, status: 'Present', otPayment: 440 },
  { id: 'ATT-103', employeeId: 'EMP-2026-003', employeeName: 'Tareq Hasan', department: 'Cutting', date: '2026-09-29', checkIn: '08:15 AM', checkOut: '05:00 PM', overtimeHours: 1.0, status: 'Late', otPayment: 140 },
  { id: 'ATT-104', employeeId: 'EMP-2026-004', employeeName: 'Nasrin Sultana', department: 'Quality Control', date: '2026-09-29', checkIn: '08:00 AM', checkOut: '07:00 PM', overtimeHours: 3.0, status: 'Present', otPayment: 600 },
  { id: 'ATT-105', employeeId: 'EMP-2026-005', employeeName: 'Kamrul Islam', department: 'Finishing', date: '2026-09-29', checkIn: '--', checkOut: '--', overtimeHours: 0, status: 'Absent', otPayment: 0 },
  { id: 'ATT-106', employeeId: 'EMP-2026-006', employeeName: 'Shoriful Alam', department: 'Warehouse', date: '2026-09-29', checkIn: '08:05 AM', checkOut: '05:00 PM', overtimeHours: 0.5, status: 'Present', otPayment: 95 }
];

export const INITIAL_CLIENTS = [
  {
    id: 'CLI-501',
    companyName: 'Nordic Vogue Retail AB',
    brand: 'Nordic Basics',
    contactPerson: 'Astrid Lindqvist',
    email: 'astrid@nordicvogue.se',
    phone: '+46 8 123 4567',
    country: 'Sweden',
    address: 'Sveavagen 42, 111 34 Stockholm',
    taxId: 'SE556012345601',
    paymentTerms: '30% Advance, 70% against Bill of Lading',
    status: 'VIP',
    totalOrders: 8,
    totalSpent: 420000,
    outstandingDue: 45000
  },
  {
    id: 'CLI-502',
    companyName: 'Urban Outfitters Apparel LLC',
    brand: 'EastCoast Denim',
    contactPerson: 'David Miller',
    email: 'd.miller@urbanapparel.com',
    phone: '+1 212 555-0199',
    country: 'United States',
    address: '5th Ave & 34th St, New York, NY',
    taxId: 'US-EIN-98721345',
    paymentTerms: '40% Advance, 60% upon Inspection Certificate',
    status: 'VIP',
    totalOrders: 14,
    totalSpent: 980000,
    outstandingDue: 78000
  },
  {
    id: 'CLI-503',
    companyName: 'Tokyo Streetwear Co., Ltd.',
    brand: 'Kuro Studio',
    contactPerson: 'Kenji Takahashi',
    email: 'kenji@kurostudio.jp',
    phone: '+81 3 3498 7000',
    country: 'Japan',
    address: 'Shibuya 2-24-12, Shibuya-ku, Tokyo',
    taxId: 'JP9010001099882',
    paymentTerms: '50% Advance, 50% at dispatch',
    status: 'Active',
    totalOrders: 5,
    totalSpent: 260000,
    outstandingDue: 24000
  },
  {
    id: 'CLI-504',
    companyName: 'Milano Tessuti & Fashion SpA',
    brand: 'Sartoria Milano',
    contactPerson: 'Matteo Rossi',
    email: 'm.rossi@milanotessuti.it',
    phone: '+39 02 8765 4321',
    country: 'Italy',
    address: 'Via Montenapoleone 8, Milano',
    taxId: 'IT01234567890',
    paymentTerms: '30% Advance, 70% LC 60 Days',
    status: 'Active',
    totalOrders: 6,
    totalSpent: 390000,
    outstandingDue: 0
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-7081',
    clientId: 'CLI-501',
    companyName: 'Nordic Vogue Retail AB',
    itemName: 'Heavy Cotton Oversized Hoodies 380 GSM',
    category: 'Knitwear',
    quantity: 10000,
    ratePerPiece: 1450, // 1,450 TK per piece
    totalAmount: 14500000, // 14,500,000 TK
    advancePaid: 6500000, // 6,500,000 TK
    dueAmount: 8000000, // 8,000,000 TK
    estimatedCost: 10200000, // 10,200,000 TK
    projectedNetProfit: 4300000, // 4,300,000 TK
    profitMargin: 29.65,
    orderDate: '2026-08-20',
    deliveryDate: '2026-10-15',
    status: 'Sewing',
    productionProgress: 68,
    paymentStatus: 'Partial Advance',
    notes: 'French Terry 380 GSM, Bio-washed, Customized brass eyelets'
  },
  {
    id: 'ORD-7082',
    clientId: 'CLI-502',
    companyName: 'Urban Outfitters Apparel LLC',
    itemName: 'Raw Selvedge Denim Slim Jeans 13.5 oz',
    category: 'Denim',
    quantity: 15000,
    ratePerPiece: 1800, // 1,800 TK per piece
    totalAmount: 27000000, // 27,000,000 TK
    advancePaid: 11000000, // 11,000,000 TK
    dueAmount: 16000000, // 16,000,000 TK
    estimatedCost: 19500000, // 19,500,000 TK
    projectedNetProfit: 7500000, // 7,500,000 TK
    profitMargin: 27.78,
    orderDate: '2026-09-01',
    deliveryDate: '2026-11-20',
    status: 'Cutting',
    productionProgress: 35,
    paymentStatus: 'Partial Advance',
    notes: 'Cone Mills style selvedge ID line, antique copper rivets'
  },
  {
    id: 'ORD-7083',
    clientId: 'CLI-503',
    companyName: 'Tokyo Streetwear Co., Ltd.',
    itemName: 'Vintage Washed Graphic T-Shirts 220 GSM',
    category: 'T-Shirts',
    quantity: 8000,
    ratePerPiece: 780, // 780 TK per piece
    totalAmount: 6240000, // 6,240,000 TK
    advancePaid: 3500000, // 3,500,000 TK
    dueAmount: 2740000, // 2,740,000 TK
    estimatedCost: 4400000, // 4,400,000 TK
    projectedNetProfit: 1840000, // 1,840,000 TK
    profitMargin: 29.48,
    orderDate: '2026-09-12',
    deliveryDate: '2026-10-28',
    status: 'Fabric Sourcing',
    productionProgress: 18,
    paymentStatus: 'Partial Advance',
    notes: 'Single jersey combed cotton, discharge screen printing'
  },
  {
    id: 'ORD-7084',
    clientId: 'CLI-504',
    companyName: 'Milano Tessuti & Fashion SpA',
    itemName: 'Executive Oxford Button-Down Shirts',
    category: 'Woven Shirts',
    quantity: 6000,
    ratePerPiece: 1650, // 1,650 TK per piece
    totalAmount: 9900000, // 9,900,000 TK
    advancePaid: 9900000, // 9,900,000 TK
    dueAmount: 0,
    estimatedCost: 7100000, // 7,100,000 TK
    projectedNetProfit: 2800000, // 2,800,000 TK
    profitMargin: 28.28,
    orderDate: '2026-07-25',
    deliveryDate: '2026-09-30',
    status: 'Ready for Dispatch',
    productionProgress: 100,
    paymentStatus: 'Fully Paid',
    notes: '100% Egyptian Giza Cotton 80/2, Mother of Pearl buttons'
  }
];

export const INITIAL_RECEIPTS = [
  {
    receiptNo: 'RCP-2026-081',
    orderId: 'ORD-7081',
    clientName: 'Nordic Vogue Retail AB',
    date: '2026-08-22',
    type: 'Advance Payment (45%)',
    amount: 6500000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'SWIFT-SEB-9982103',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 8000000,
    notes: 'First tranche 45% production confirmation'
  },
  {
    receiptNo: 'RCP-2026-082',
    orderId: 'ORD-7082',
    clientName: 'Urban Outfitters Apparel LLC',
    date: '2026-09-03',
    type: 'LC Opening Advance (40%)',
    amount: 11000000,
    paymentMethod: 'Letter of Credit (LC)',
    bankRef: 'LC-JPMC-NY-55441',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 16000000,
    notes: 'Irrevocable LC 90 days opening advance'
  },
  {
    receiptNo: 'RCP-2026-083',
    orderId: 'ORD-7083',
    clientName: 'Tokyo Streetwear Co., Ltd.',
    date: '2026-09-14',
    type: 'Advance Payment (50%)',
    amount: 3500000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'MUFG-TYO-78129',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 2740000,
    notes: '50% initial down payment received'
  },
  {
    receiptNo: 'RCP-2026-084',
    orderId: 'ORD-7084',
    clientName: 'Milano Tessuti & Fashion SpA',
    date: '2026-09-28',
    type: 'Final Settlement',
    amount: 6930000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'ISP-MIL-332190',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 0,
    notes: 'Final balance clearing upon pre-shipment inspection pass'
  }
];

export const INITIAL_RAW_MATERIALS = [
  { id: 'MAT-101', name: 'French Terry Cotton 380 GSM (Black)', category: 'Fabric', unit: 'Meters', unitCost: 480, currentStock: 14500, reorderLevel: 3000, location: 'Warehouse Bay A-12', supplier: 'Apex Textile Mills' },
  { id: 'MAT-102', name: '13.5 oz Raw Indigo Selvedge Denim', category: 'Fabric', unit: 'Meters', unitCost: 620, currentStock: 8200, reorderLevel: 2500, location: 'Warehouse Bay A-15', supplier: 'Shasha Denims Ltd' },
  { id: 'MAT-103', name: '100% Combed Cotton Single Jersey 220 GSM', category: 'Fabric', unit: 'Meters', unitCost: 350, currentStock: 1800, reorderLevel: 2000, location: 'Warehouse Bay B-04', supplier: 'Square Textiles' }, // LOW STOCK!
  { id: 'MAT-104', name: '80/2 Compact Giza Cotton Woven (Sky Blue)', category: 'Fabric', unit: 'Meters', unitCost: 540, currentStock: 6400, reorderLevel: 1500, location: 'Warehouse Bay B-08', supplier: 'Beximco Synthetics' },
  { id: 'MAT-105', name: 'YKK Antique Brass Metal Zipper #5 (15cm)', category: 'Accessories', unit: 'Pieces', unitCost: 45, currentStock: 12000, reorderLevel: 4000, location: 'Trims Rack C-01', supplier: 'YKK Bangladesh Ltd' },
  { id: 'MAT-106', name: 'Spun Polyester Thread 40/2 (Cone 5000m)', category: 'Trims', unit: 'Cones', unitCost: 210, currentStock: 190, reorderLevel: 300, location: 'Trims Rack C-03', supplier: 'Coats Bangladesh' }, // LOW STOCK!
  { id: 'MAT-107', name: 'Engraved Metal Jeans Buttons 17mm', category: 'Accessories', unit: 'Gross (144 pcs)', unitCost: 850, currentStock: 240, reorderLevel: 80, location: 'Trims Rack C-07', supplier: 'Prym Fashion' },
  { id: 'MAT-108', name: 'Export Grade 5-Ply Corrugated Cartons', category: 'Packaging', unit: 'Boxes', unitCost: 125, currentStock: 1200, reorderLevel: 500, location: 'Packaging Bay D-02', supplier: 'Sonali Pack Ltd' }
];

export const INITIAL_FINISHED_GOODS = [
  { id: 'FG-301', itemName: 'Executive Oxford Button-Down Shirts (Sky Blue)', orderId: 'ORD-7084', client: 'Milano Tessuti & Fashion SpA', quantity: 6000, cartonCount: 150, location: 'Finished Goods Bay E-1', status: 'Ready to Ship' },
  { id: 'FG-302', itemName: 'Heavy Cotton Oversized Hoodies (Black)', orderId: 'ORD-7081', client: 'Nordic Vogue Retail AB', quantity: 4200, cartonCount: 84, location: 'Finished Goods Bay E-3', status: 'In Inspection' }
];

export const INITIAL_PURCHASE_TRACKING = [
  {
    purchaseId: 'PO-2026-901',
    orderId: 'ORD-7081',
    materialId: 'MAT-101',
    materialName: 'French Terry Cotton 380 GSM (Black)',
    supplier: 'Apex Textile Mills',
    quantityPurchased: 18000,
    unit: 'Meters',
    unitCost: 480,
    totalCost: 8640000,
    purchaseDate: '2026-08-25',
    invoiceNumber: 'INV-ATM-8841',
    status: 'Delivered to Floor'
  },
  {
    purchaseId: 'PO-2026-902',
    orderId: 'ORD-7082',
    materialId: 'MAT-102',
    materialName: '13.5 oz Raw Indigo Selvedge Denim',
    supplier: 'Shasha Denims Ltd',
    quantityPurchased: 24000,
    unit: 'Meters',
    unitCost: 620,
    totalCost: 14880000,
    purchaseDate: '2026-09-05',
    invoiceNumber: 'INV-SDL-4319',
    status: 'Partially Received'
  },
  {
    purchaseId: 'PO-2026-903',
    orderId: 'ORD-7083',
    materialId: 'MAT-103',
    materialName: '100% Combed Cotton Single Jersey 220 GSM',
    supplier: 'Square Textiles',
    quantityPurchased: 9600,
    unit: 'Meters',
    unitCost: 350,
    totalCost: 3360000,
    purchaseDate: '2026-09-18',
    invoiceNumber: 'INV-SQT-1029',
    status: 'In Transit'
  }
];

export const INITIAL_MATERIAL_USAGE = [
  {
    id: 'USG-401',
    orderId: 'ORD-7081',
    materialName: 'French Terry Cotton 380 GSM (Black)',
    allocatedQty: 18000,
    consumedQty: 12400,
    remainingQty: 5600,
    wastageQty: 320,
    wastagePercent: 2.58,
    unit: 'Meters',
    stage: 'Cutting & Sewing',
    lastLoggedDate: '2026-09-29'
  },
  {
    id: 'USG-402',
    orderId: 'ORD-7082',
    materialName: '13.5 oz Raw Indigo Selvedge Denim',
    allocatedQty: 24000,
    consumedQty: 8900,
    remainingQty: 15100,
    wastageQty: 190,
    wastagePercent: 2.13,
    unit: 'Meters',
    stage: 'Cutting Line 1',
    lastLoggedDate: '2026-09-28'
  },
  {
    id: 'USG-403',
    orderId: 'ORD-7084',
    materialName: '80/2 Compact Giza Cotton Woven (Sky Blue)',
    allocatedQty: 9200,
    consumedQty: 9050,
    remainingQty: 150,
    wastageQty: 120,
    wastagePercent: 1.33,
    unit: 'Meters',
    stage: 'Finished (100%)',
    lastLoggedDate: '2026-09-25'
  }
];

export const INITIAL_SHAREHOLDERS = [
  {
    id: 'SH-01',
    name: 'Engr. Mahbubur Rahman',
    role: 'Managing Director & Founder',
    equitySharePercent: 40.0,
    totalInvestment: 20000000, // 2.0 Crore TK
    joinDate: '2018-01-10',
    email: 'm.rahman@rgmapparel.com',
    phone: '+880 1711-000001',
    bankAccount: 'Standard Chartered - 01-998822-01',
    dividendsWithdrawn: 6800000, // 68 Lakh TK
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
  },
  {
    id: 'SH-02',
    name: 'Salma Parveen Chowdhury',
    role: 'Vice Chairperson & Co-Founder',
    equitySharePercent: 25.0,
    totalInvestment: 12500000, // 1.25 Crore TK
    joinDate: '2018-01-10',
    email: 's.chowdhury@rgmapparel.com',
    phone: '+880 1711-000002',
    bankAccount: 'HSBC Commercial - 002-334411-001',
    dividendsWithdrawn: 4250000,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150'
  },
  {
    id: 'SH-03',
    name: 'Nadim Faisal',
    role: 'Executive Director (Operations)',
    equitySharePercent: 20.0,
    totalInvestment: 10000000, // 1.0 Crore TK
    joinDate: '2020-04-15',
    email: 'nadim.f@rgmapparel.com',
    phone: '+880 1819-000003',
    bankAccount: 'City Bank Ltd - 3102998811',
    dividendsWithdrawn: 3100000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'SH-04',
    name: 'Ventures Nordic Capital AG',
    role: 'Institutional Investor',
    equitySharePercent: 15.0,
    totalInvestment: 7500000, // 75 Lakh TK
    joinDate: '2022-08-01',
    email: 'portfolio@nordicventures.ch',
    phone: '+41 22 555 8899',
    bankAccount: 'UBS Zurich - CH93-0023-4411-8899',
    dividendsWithdrawn: 2150000,
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150'
  }
];

export const INITIAL_DIVIDEND_HISTORY = [
  {
    period: 'Q2 2026 Fiscal Dividend',
    declaredDate: '2026-07-05',
    totalCompanyNetProfit: 45000000, // 4.5 Crore TK
    retainedReservePercent: 25,
    distributablePool: 33750000, // 3.375 Crore TK
    status: 'Disbursed',
    allocations: [
      { shareholder: 'Engr. Mahbubur Rahman', share: 40, amount: 13500000 },
      { shareholder: 'Salma Parveen Chowdhury', share: 25, amount: 8437500 },
      { shareholder: 'Nadim Faisal', share: 20, amount: 6750000 },
      { shareholder: 'Ventures Nordic Capital AG', share: 15, amount: 5062500 }
    ]
  },
  {
    period: 'Q1 2026 Fiscal Dividend',
    declaredDate: '2026-04-10',
    totalCompanyNetProfit: 38000000, // 3.8 Crore TK
    retainedReservePercent: 25,
    distributablePool: 28500000, // 2.85 Crore TK
    status: 'Disbursed',
    allocations: [
      { shareholder: 'Engr. Mahbubur Rahman', share: 40, amount: 11400000 },
      { shareholder: 'Salma Parveen Chowdhury', share: 25, amount: 7125000 },
      { shareholder: 'Nadim Faisal', share: 20, amount: 5700000 },
      { shareholder: 'Ventures Nordic Capital AG', share: 15, amount: 4275000 }
    ]
  }
];

export const DAILY_FINANCIAL_LOGS = {
  todayDate: '2026-09-29',
  todayIncome: 6930000, // 69.3 Lakh TK
  todayExpense: 2475000, // 24.75 Lakh TK
  todayMaterialUsageMetric: '21,450 Meters & 840 Trims logged today'
};

export const INITIAL_MANAGING_BODY = [
  {
    id: 'MB-01',
    name: 'Engr. Mahbubur Rahman',
    designation: 'Managing Director & Founder',
    committee: 'Executive & Strategy Committee',
    appointedDate: '2018-01-10',
    qualification: 'B.Sc. Textile Engg (BUTEX), MBA (IBA)',
    email: 'm.rahman@rgmapparel.com',
    phone: '+880 1711-000001',
    status: 'Active Member',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    bio: '25+ years in global apparel exports, leading lean manufacturing and LEED Platinum compliance.',
    votingPower: '35%'
  },
  {
    id: 'MB-02',
    name: 'Salma Parveen Chowdhury',
    designation: 'Vice Chairperson & Director',
    committee: 'ESG, HR & Compliance Committee',
    appointedDate: '2018-01-10',
    qualification: 'M.A. International Relations (DU)',
    email: 's.chowdhury@rgmapparel.com',
    phone: '+880 1711-000002',
    status: 'Active Member',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    bio: 'Oversees workplace safety, female worker empowerment programs, and international brand compliance.',
    votingPower: '25%'
  },
  {
    id: 'MB-03',
    name: 'Nadim Faisal',
    designation: 'Executive Director (Operations)',
    committee: 'Plant Operations & Automation Committee',
    appointedDate: '2020-04-15',
    qualification: 'B.Sc. Industrial & Production Engg (BUET)',
    email: 'nadim.f@rgmapparel.com',
    phone: '+880 1819-000003',
    status: 'Active Member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bio: 'Spearheads automated cutting units, smart sewing floor tracking, and ERP supply chain logistics.',
    votingPower: '20%'
  },
  {
    id: 'MB-04',
    name: 'Barrister Ahsan Habib',
    designation: 'Independent Director & Legal Counsel',
    committee: 'Audit & Corporate Governance Committee',
    appointedDate: '2021-09-01',
    qualification: 'LL.B (Hons), Barrister-at-Law (Lincoln\'s Inn)',
    email: 'a.habib@rgmapparel.com',
    phone: '+880 1712-445566',
    status: 'Active Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Advises on international trade contracts, export LCs, foreign exchange compliance, and labor laws.',
    votingPower: '5%'
  },
  {
    id: 'MB-05',
    name: 'Tanvir Hossain, FCA',
    designation: 'Chief Financial Officer (CFO)',
    committee: 'Finance, Tax & Audit Committee',
    appointedDate: '2021-02-15',
    qualification: 'Fellow Chartered Accountant (ICAB)',
    email: 'tanvir.h@rgmapparel.com',
    phone: '+880 1911-332211',
    status: 'Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    bio: 'Heads corporate accounting, letters of credit management, dividend modeling, and fiscal budgeting.',
    votingPower: 'Non-Voting'
  },
  {
    id: 'MB-06',
    name: 'Nusrat Jahan',
    designation: 'Head of Quality & Compliance',
    committee: 'ISO Quality & Accord Safety Committee',
    appointedDate: '2022-05-10',
    qualification: 'M.Sc. Industrial Chemistry, Six Sigma Black Belt',
    email: 'nusrat.j@rgmapparel.com',
    phone: '+880 1622-998811',
    status: 'Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    bio: 'Responsible for AQL 1.5/2.5 quality adherence, buyer audits, and environmental sustainability standards.',
    votingPower: 'Non-Voting'
  }
];

export const INITIAL_SALARIES = [
  {
    payrollId: 'PAY-2026-09-01',
    employeeId: 'EMP-2026-001',
    employeeName: 'Rahim Chowdhury',
    designation: 'Senior Pattern Master',
    department: 'Cutting',
    type: 'Permanent',
    month: 'September 2026',
    baseSalary: 45000,
    workingDays: 26,
    presentDays: 26,
    overtimeHours: 24,
    hourlyOtRate: 250,
    overtimePay: 6000,
    attendanceAllowance: 2000,
    grossSalary: 53000,
    deductions: 2500, // Provident Fund & Tax
    netSalary: 50500,
    status: 'Paid',
    disbursedDate: '2026-10-01',
    paymentMethod: 'Bank Transfer (City Bank)'
  },
  {
    payrollId: 'PAY-2026-09-02',
    employeeId: 'EMP-2026-002',
    employeeName: 'Fatima Begum',
    designation: 'Sewing Line Floor Lead',
    department: 'Sewing',
    type: 'Permanent',
    month: 'September 2026',
    baseSalary: 38000,
    workingDays: 26,
    presentDays: 26,
    overtimeHours: 22,
    hourlyOtRate: 220,
    overtimePay: 4840,
    attendanceAllowance: 2000,
    grossSalary: 44840,
    deductions: 2000,
    netSalary: 42840,
    status: 'Paid',
    disbursedDate: '2026-10-01',
    paymentMethod: 'Bank Transfer (City Bank)'
  },
  {
    payrollId: 'PAY-2026-09-03',
    employeeId: 'EMP-2026-003',
    employeeName: 'Tareq Hasan',
    designation: 'Assistant Cutter & Bundler',
    department: 'Cutting',
    type: 'Temporary',
    month: 'September 2026',
    baseSalary: 19500,
    workingDays: 26,
    presentDays: 24,
    overtimeHours: 18,
    hourlyOtRate: 140,
    overtimePay: 2520,
    attendanceAllowance: 0,
    grossSalary: 22020,
    deductions: 500,
    netSalary: 21520,
    status: 'Pending',
    disbursedDate: '--',
    paymentMethod: 'Cash Payroll Envelope'
  },
  {
    payrollId: 'PAY-2026-09-04',
    employeeId: 'EMP-2026-004',
    employeeName: 'Nasrin Sultana',
    designation: 'Senior QC Inspector',
    department: 'Quality Control',
    type: 'Permanent',
    month: 'September 2026',
    baseSalary: 34000,
    workingDays: 26,
    presentDays: 26,
    overtimeHours: 26,
    hourlyOtRate: 200,
    overtimePay: 5200,
    attendanceAllowance: 2000,
    grossSalary: 41200,
    deductions: 1800,
    netSalary: 39400,
    status: 'Paid',
    disbursedDate: '2026-10-01',
    paymentMethod: 'Bank Transfer (DBBL)'
  },
  {
    payrollId: 'PAY-2026-09-05',
    employeeId: 'EMP-2026-005',
    employeeName: 'Kamrul Islam',
    designation: 'Ironing & Steam Finishing Operative',
    department: 'Finishing',
    type: 'Temporary',
    month: 'September 2026',
    baseSalary: 18000,
    workingDays: 26,
    presentDays: 22,
    overtimeHours: 12,
    hourlyOtRate: 130,
    overtimePay: 1560,
    attendanceAllowance: 0,
    grossSalary: 19560,
    deductions: 400,
    netSalary: 19160,
    status: 'Pending',
    disbursedDate: '--',
    paymentMethod: 'Cash Payroll Envelope'
  },
  {
    payrollId: 'PAY-2026-09-06',
    employeeId: 'EMP-2026-006',
    employeeName: 'Shoriful Alam',
    designation: 'Warehouse & Inventory Officer',
    department: 'Warehouse',
    type: 'Permanent',
    month: 'September 2026',
    baseSalary: 32000,
    workingDays: 26,
    presentDays: 26,
    overtimeHours: 16,
    hourlyOtRate: 190,
    overtimePay: 3040,
    attendanceAllowance: 1500,
    grossSalary: 36540,
    deductions: 1600,
    netSalary: 34940,
    status: 'Paid',
    disbursedDate: '2026-10-01',
    paymentMethod: 'Bank Transfer (EBL)'
  }
];

export const INITIAL_PAYMENTS = [
  {
    txnId: 'TXN-9021',
    receiptNo: 'RCP-2026-084',
    orderId: 'ORD-7084',
    clientName: 'Milano Tessuti & Fashion SpA',
    date: '2026-09-28',
    type: 'Final Settlement',
    amount: 69300,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'ISP-MIL-332190',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 0,
    status: 'Cleared & Verified',
    notes: 'Final balance clearing upon pre-shipment AQL 2.5 pass'
  },
  {
    txnId: 'TXN-8842',
    receiptNo: 'RCP-2026-083',
    orderId: 'ORD-7083',
    clientName: 'Tokyo Streetwear Co., Ltd.',
    date: '2026-09-14',
    type: 'Advance Payment (50%)',
    amount: 35000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'MUFG-TYO-78129',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 27400,
    status: 'Cleared & Verified',
    notes: 'Initial down payment received for Vintage Washed Graphic Tees'
  },
  {
    txnId: 'TXN-8611',
    receiptNo: 'RCP-2026-082',
    orderId: 'ORD-7082',
    clientName: 'Urban Outfitters Apparel LLC',
    date: '2026-09-03',
    type: 'LC Opening Advance (40%)',
    amount: 110000,
    paymentMethod: 'Letter of Credit (LC)',
    bankRef: 'LC-JPMC-NY-55441',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 160000,
    status: 'Cleared & Verified',
    notes: 'Irrevocable LC 90 days opening advance confirmation'
  },
  {
    txnId: 'TXN-8409',
    receiptNo: 'RCP-2026-081',
    orderId: 'ORD-7081',
    clientName: 'Nordic Vogue Retail AB',
    date: '2026-08-22',
    type: 'Advance Payment (45%)',
    amount: 65000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'SWIFT-SEB-9982103',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 80000,
    status: 'Cleared & Verified',
    notes: 'First tranche 45% production line confirmation'
  },
  {
    txnId: 'TXN-8115',
    receiptNo: 'RCP-2026-079',
    orderId: 'ORD-7079',
    clientName: 'Nordic Vogue Retail AB',
    date: '2026-07-15',
    type: 'Final Settlement',
    amount: 48000,
    paymentMethod: 'Bank Wire / TT',
    bankRef: 'SWIFT-SEB-883902',
    receivedBy: 'Tanvir Hossain (Accounts Lead)',
    remainingDue: 0,
    status: 'Cleared & Verified',
    notes: 'Completed order settlement for Summer Polo batch'
  }
];

export const INITIAL_OFFICE_COSTS = [
  {
    id: 'OFC-2026-001',
    voucherNo: 'VCH-OFC-881',
    title: 'Head Office Floor Commercial Rent (Banani)',
    category: 'Rent & Facility',
    description: 'Corporate headquarters floor lease Level 8 & 9, Banani Commercial Area, Dhaka',
    amount: 350000,
    month: 'September 2026',
    date: '2026-09-05',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Bank Transfer (City Bank)',
    reference: 'RENT-BAN-SEP-26',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-002',
    voucherNo: 'VCH-OFC-882',
    title: 'DESCO Industrial & Commercial Electricity Bill',
    category: 'Utilities & Power',
    description: 'Head office & merchandising studio monthly electricity consumption meter #D-44912',
    amount: 185000,
    month: 'September 2026',
    date: '2026-09-12',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Bank Transfer (EBL)',
    reference: 'DESCO-BILL-9081',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-003',
    voucherNo: 'VCH-OFC-883',
    title: 'High-Speed Dedicated Fiber Internet & Telephony',
    category: 'IT & Telecom',
    description: '1 Gbps duplex dedicated fiber lease line & corporate IP-PBX communication',
    amount: 28000,
    month: 'September 2026',
    date: '2026-09-15',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Online Bank Wire',
    reference: 'LINK-FIB-7712',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-004',
    voucherNo: 'VCH-OFC-884',
    title: 'CAD Plotter Paper, Inks & Office Stationery',
    category: 'Office Supplies',
    description: 'Gerber CAD marker plotter rolls, cartridges, export invoice forms & stationery',
    amount: 36500,
    month: 'September 2026',
    date: '2026-09-18',
    paidBy: 'Shoriful Alam (Inventory)',
    paymentMethod: 'Corporate Petty Cash',
    reference: 'STAT-PO-441',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-005',
    voucherNo: 'VCH-OFC-885',
    title: 'Corporate ERP Cloud Server & Gerber CAD Licensing',
    category: 'IT & Software',
    description: 'AWS Cloud ERP database hosting & annual Gerber AccuMark license subscription',
    amount: 75000,
    month: 'September 2026',
    date: '2026-09-20',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Corporate Credit Card',
    reference: 'AWS-LIC-9921',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-006',
    voucherNo: 'VCH-OFC-886',
    title: 'Executive Pantry, Mineral Water & Staff Refreshment',
    category: 'Pantry & Hospitality',
    description: 'Monthly office pantry supplies, tea, coffee, mineral water dispenser jars',
    amount: 32000,
    month: 'September 2026',
    date: '2026-09-24',
    paidBy: 'Administrative Officer',
    paymentMethod: 'Corporate Petty Cash',
    reference: 'PAN-SEP-09',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-007',
    voucherNo: 'VCH-OFC-887',
    title: 'VRF Central Air Conditioning Quarterly Servicing',
    category: 'Maintenance & Facility',
    description: 'Quarterly maintenance, compressor refrigerant top-up and filter sanitization',
    amount: 24000,
    month: 'September 2026',
    date: '2026-09-27',
    paidBy: 'Facilities Lead',
    paymentMethod: 'Bank Cheque',
    reference: 'AC-SRV-2026-9',
    status: 'Paid'
  },
  {
    id: 'OFC-2026-008',
    voucherNo: 'VCH-OFC-888',
    title: 'Titas Gas & WASA Corporate Water Supply Bill',
    category: 'Utilities & Power',
    description: 'Monthly corporate commercial water & utility bill meter #WASA-1123',
    amount: 19500,
    month: 'September 2026',
    date: '2026-09-29',
    paidBy: 'Accounts Officer',
    paymentMethod: 'Bank Transfer (DBBL)',
    reference: 'WASA-BILL-883',
    status: 'Pending'
  }
];

export const INITIAL_OTHER_EXPENSES = [
  {
    id: 'OTH-2026-001',
    voucherNo: 'VCH-EXP-901',
    title: 'Chittagong Port Terminal & C&F Agent Clearance Charges',
    category: 'Logistics & Shipping',
    description: 'Container stuffing, port documentation & C&F agent clearing for Zara Order #ORD-7081',
    amount: 215000,
    month: 'September 2026',
    date: '2026-09-10',
    paidBy: 'Commercial Dept',
    paymentMethod: 'Bank Wire / Pay Order',
    reference: 'CTG-CF-88210',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-002',
    voucherNo: 'VCH-EXP-902',
    title: 'International Buyer Sample Couriers (DHL & FedEx Express)',
    category: 'Couriers & Dispatch',
    description: 'Pre-production size set samples express courier dispatch to Milan and New York',
    amount: 58000,
    month: 'September 2026',
    date: '2026-09-14',
    paidBy: 'Merchandising Team',
    paymentMethod: 'Corporate Account',
    reference: 'DHL-AWB-902188',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-003',
    voucherNo: 'VCH-EXP-903',
    title: 'Foreign Buyer Delegation Hospitality & Factory Inspection',
    category: 'Buyer Hospitality',
    description: 'Local transport, hotel boardroom catering & hospitality for European buyer audit delegation',
    amount: 85000,
    month: 'September 2026',
    date: '2026-09-19',
    paidBy: 'Engr. Mahbubur Rahman',
    paymentMethod: 'Corporate Credit Card',
    reference: 'HOSP-BUY-09',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-004',
    voucherNo: 'VCH-EXP-904',
    title: 'ISO 9001 & WRAP Social Compliance External Audit Renewal',
    category: 'Compliance & Legal',
    description: 'Annual external certification audit fee for social compliance and safety certification',
    amount: 145000,
    month: 'September 2026',
    date: '2026-09-22',
    paidBy: 'Nusrat Jahan (Compliance Head)',
    paymentMethod: 'Bank Wire / TT',
    reference: 'WRAP-AUD-2026',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-005',
    voucherNo: 'VCH-EXP-905',
    title: 'BGMEA Annual Membership & Export Document Endorsement',
    category: 'Regulatory & Trade',
    description: 'Trade association renewal and export quota clearance documentation fee',
    amount: 120000,
    month: 'September 2026',
    date: '2026-09-25',
    paidBy: 'Tanvir Hossain (CFO)',
    paymentMethod: 'Pay Order (City Bank)',
    reference: 'BGMEA-MEM-2026',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-006',
    voucherNo: 'VCH-EXP-906',
    title: 'Worker First Aid, Health Camp & Emergency Medical Kit',
    category: 'Medical & Welfare',
    description: 'Routine replenishment of factory medical room supplies and health screening camp',
    amount: 26500,
    month: 'September 2026',
    date: '2026-09-27',
    paidBy: 'HR Department',
    paymentMethod: 'Petty Cash',
    reference: 'MED-CAMP-09',
    status: 'Paid'
  },
  {
    id: 'OTH-2026-007',
    voucherNo: 'VCH-EXP-907',
    title: 'Factory Safety Fire Extinguisher Refill & Drill Compliance',
    category: 'Safety & Compliance',
    description: 'Annual dry chemical extinguisher refilling and civil defence fire drill certificate',
    amount: 34000,
    month: 'September 2026',
    date: '2026-09-28',
    paidBy: 'Safety Officer',
    paymentMethod: 'Cheque',
    reference: 'FIRE-SAF-881',
    status: 'Pending'
  }
];


