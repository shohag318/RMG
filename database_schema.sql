-- ============================================================================
-- RGM APPAREL GROUP - GARMENT MANUFACTURING ERP DATABASE SCHEMA (PostgreSQL / MySQL)
-- ============================================================================
-- Comprehensive relational schema designed for apparel manufacturing operations:
-- Role-based access, workforce, orders, accounting, procurement, inventory & equity.
-- ============================================================================

-- 1. USERS & ACCESS CONTROL (RBAC)
CREATE TABLE roles (
    role_id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE system_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id VARCHAR(50) REFERENCES roles(role_id) ON DELETE RESTRICT,
    full_name VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. EMPLOYEE MANAGEMENT & ATTENDANCE
CREATE TYPE employee_type_enum AS ENUM ('Permanent', 'Temporary');
CREATE TYPE attendance_status_enum AS ENUM ('Present', 'Absent', 'Late', 'Half Day', 'On Leave');

CREATE TABLE employees (
    employee_id VARCHAR(30) PRIMARY KEY, -- e.g., EMP-2026-001
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL, -- Cutting, Sewing, Finishing, QC, Warehouse, Accounts
    employee_type employee_type_enum NOT NULL DEFAULT 'Permanent',
    phone VARCHAR(50),
    email VARCHAR(150),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    base_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    hourly_ot_rate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_work_history (
    history_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(30) REFERENCES employees(employee_id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    event_description TEXT NOT NULL,
    logged_by INT REFERENCES system_users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE daily_attendance (
    attendance_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(30) REFERENCES employees(employee_id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    status attendance_status_enum NOT NULL DEFAULT 'Present',
    overtime_hours NUMERIC(4, 2) DEFAULT 0.00,
    overtime_payout NUMERIC(10, 2) DEFAULT 0.00, -- Computed: overtime_hours * employees.hourly_ot_rate
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_employee_daily_attendance UNIQUE (employee_id, attendance_date)
);

-- 3. CLIENT MANAGEMENT (CRM)
CREATE TABLE clients (
    client_id VARCHAR(30) PRIMARY KEY, -- e.g., CLI-501
    company_name VARCHAR(200) NOT NULL,
    brand_name VARCHAR(150),
    contact_person VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    destination_country VARCHAR(100) NOT NULL,
    office_address TEXT,
    tax_vat_id VARCHAR(100),
    payment_terms VARCHAR(200) DEFAULT '30% Advance, 70% against BL',
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDER MANAGEMENT & ACCOUNTING
CREATE TYPE order_status_enum AS ENUM (
    'Order Placed', 'Fabric Sourcing', 'Cutting', 'Sewing', 
    'Finishing & QC', 'Ready for Dispatch', 'Delivered'
);

CREATE TYPE payment_status_enum AS ENUM ('Pending Advance', 'Partial Advance', 'Fully Paid');

CREATE TABLE garment_orders (
    order_id VARCHAR(30) PRIMARY KEY, -- e.g., ORD-7081
    client_id VARCHAR(30) REFERENCES clients(client_id) ON DELETE RESTRICT,
    item_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Knitwear, Denim, Woven, etc.
    quantity_pieces INT NOT NULL CHECK (quantity_pieces > 0),
    rate_per_piece NUMERIC(10, 2) NOT NULL CHECK (rate_per_piece > 0),
    total_amount NUMERIC(14, 2) GENERATED ALWAYS AS (quantity_pieces * rate_per_piece) STORED,
    advance_paid NUMERIC(14, 2) DEFAULT 0.00,
    due_amount NUMERIC(14, 2) DEFAULT 0.00,
    estimated_production_cost NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    projected_net_profit NUMERIC(14, 2) NOT NULL DEFAULT 0.00, -- total_amount - estimated_production_cost
    profit_margin_percent NUMERIC(5, 2) DEFAULT 0.00,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_date DATE NOT NULL,
    current_stage order_status_enum DEFAULT 'Order Placed',
    production_progress_percent INT DEFAULT 0,
    payment_status payment_status_enum DEFAULT 'Pending Advance',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_receipts (
    receipt_no VARCHAR(50) PRIMARY KEY, -- e.g., RCP-2026-081
    order_id VARCHAR(30) REFERENCES garment_orders(order_id) ON DELETE CASCADE,
    receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_type VARCHAR(50) NOT NULL, -- 'Advance Payment', 'Interim Payment', 'Final Settlement'
    amount_paid NUMERIC(14, 2) NOT NULL CHECK (amount_paid > 0),
    payment_method VARCHAR(100) NOT NULL, -- 'Bank Wire / TT', 'Letter of Credit', 'Cheque', 'Cash'
    bank_transaction_ref VARCHAR(150),
    received_by VARCHAR(150),
    remaining_due_balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. STOCK & INVENTORY MANAGEMENT
CREATE TABLE raw_materials (
    material_id VARCHAR(30) PRIMARY KEY, -- e.g., MAT-101
    material_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Fabric, Accessories, Trims, Packaging
    unit_of_measure VARCHAR(50) NOT NULL, -- Meters, Kg, Pieces, Gross, Cones, Boxes
    unit_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    current_stock NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    reorder_safety_level NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    warehouse_location VARCHAR(100),
    primary_supplier VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE finished_goods (
    finished_goods_id VARCHAR(30) PRIMARY KEY, -- e.g., FG-301
    order_id VARCHAR(30) REFERENCES garment_orders(order_id) ON DELETE CASCADE,
    garment_description VARCHAR(200) NOT NULL,
    quantity_ready INT NOT NULL DEFAULT 0,
    carton_count INT NOT NULL DEFAULT 0,
    staging_warehouse_bay VARCHAR(100),
    dispatch_status VARCHAR(50) DEFAULT 'Ready to Ship',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. PRODUCTION & PROCUREMENT TRACKING
CREATE TABLE order_material_purchases (
    purchase_id VARCHAR(30) PRIMARY KEY, -- e.g., PO-2026-901
    order_id VARCHAR(30) REFERENCES garment_orders(order_id) ON DELETE CASCADE,
    material_id VARCHAR(30) REFERENCES raw_materials(material_id) ON DELETE RESTRICT,
    supplier_name VARCHAR(150) NOT NULL,
    quantity_purchased NUMERIC(14, 2) NOT NULL CHECK (quantity_purchased > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    total_cost NUMERIC(14, 2) GENERATED ALWAYS AS (quantity_purchased * unit_price) STORED,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    vendor_invoice_ref VARCHAR(100),
    delivery_status VARCHAR(50) DEFAULT 'Delivered to Floor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE production_material_usage (
    usage_id VARCHAR(30) PRIMARY KEY, -- e.g., USG-401
    order_id VARCHAR(30) REFERENCES garment_orders(order_id) ON DELETE CASCADE,
    material_id VARCHAR(30) REFERENCES raw_materials(material_id) ON DELETE RESTRICT,
    allocated_quantity NUMERIC(14, 2) NOT NULL,
    consumed_quantity NUMERIC(14, 2) NOT NULL,
    remaining_quantity NUMERIC(14, 2) NOT NULL,
    wastage_quantity NUMERIC(14, 2) DEFAULT 0.00,
    wastage_percent NUMERIC(5, 2) DEFAULT 0.00,
    production_stage VARCHAR(100) NOT NULL, -- Cutting Line 1, Sewing Floor A, etc.
    logged_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AUTOMATIC STOCK DEDUCTION TRIGGER
CREATE OR REPLACE FUNCTION deduct_raw_material_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE raw_materials
    SET current_stock = GREATEST(0, current_stock - (NEW.consumed_quantity + NEW.wastage_quantity))
    WHERE material_id = NEW.material_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_deduct_stock_on_material_usage
AFTER INSERT OR UPDATE ON production_material_usage
FOR EACH ROW
EXECUTE FUNCTION deduct_raw_material_stock();

-- 7. SHAREHOLDER & DIVIDEND MODULE
CREATE TABLE shareholders (
    shareholder_id VARCHAR(30) PRIMARY KEY, -- e.g., SH-01
    full_name VARCHAR(150) NOT NULL,
    title_or_role VARCHAR(150) NOT NULL,
    equity_percentage NUMERIC(5, 2) NOT NULL CHECK (equity_percentage >= 0 AND equity_percentage <= 100),
    total_capital_investment NUMERIC(16, 2) NOT NULL DEFAULT 0.00,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    official_email VARCHAR(150),
    phone VARCHAR(50),
    bank_wire_account_details TEXT NOT NULL,
    total_dividends_withdrawn NUMERIC(16, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dividend_distribution_batches (
    batch_id SERIAL PRIMARY KEY,
    fiscal_period_label VARCHAR(100) NOT NULL, -- 'Q2 2026 Fiscal Dividend'
    declared_date DATE NOT NULL DEFAULT CURRENT_DATE,
    company_net_profit NUMERIC(16, 2) NOT NULL,
    retained_reserve_percent NUMERIC(5, 2) NOT NULL DEFAULT 25.00,
    retained_reserve_amount NUMERIC(16, 2) NOT NULL,
    distributable_dividend_pool NUMERIC(16, 2) NOT NULL,
    disbursement_status VARCHAR(50) DEFAULT 'Disbursed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shareholder_dividend_allocations (
    allocation_id SERIAL PRIMARY KEY,
    batch_id INT REFERENCES dividend_distribution_batches(batch_id) ON DELETE CASCADE,
    shareholder_id VARCHAR(30) REFERENCES shareholders(shareholder_id) ON DELETE RESTRICT,
    equity_percentage NUMERIC(5, 2) NOT NULL,
    payout_amount NUMERIC(16, 2) NOT NULL,
    payout_status VARCHAR(50) DEFAULT 'Paid',
    paid_date DATE DEFAULT CURRENT_DATE
);

-- INDEXES FOR FAST REPORTING & QUERY OPTIMIZATION
CREATE INDEX idx_orders_client ON garment_orders(client_id);
CREATE INDEX idx_orders_stage ON garment_orders(current_stage);
CREATE INDEX idx_attendance_date ON daily_attendance(attendance_date);
CREATE INDEX idx_attendance_emp ON daily_attendance(employee_id);
CREATE INDEX idx_materials_reorder ON raw_materials(current_stock, reorder_safety_level);
CREATE INDEX idx_usage_order ON production_material_usage(order_id);
