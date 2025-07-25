import { db } from "./db";
import { eq, lt, sql, desc } from "drizzle-orm";
import {
  clients,
  services,
  staff,
  appointments,
  products,
  suppliers,
  inventoryTransactions,
  type Client,
  type InsertClient,
  type Service,
  type InsertService,
  type Staff,
  type InsertStaff,
  type Appointment,
  type InsertAppointment,
  type Product,
  type InsertProduct,
  type Supplier,
  type InsertSupplier,
  type InventoryTransaction,
  type InsertInventoryTransaction,
  type Transaction,
  type InsertTransaction,
  type TimeRecord,
  type InsertTimeRecord,
  type NotificationSettings,
  type InsertNotificationSettings,
  type NotificationLog,
  type InsertNotificationLog,
  transactions,
  timeRecords,
  notificationSettings,
  notificationLog,
} from "@shared/schema";

export interface IStorage {
  // Clients
  getClient(id: string): Promise<Client | undefined>;
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;

  // Services
  getService(id: string): Promise<Service | undefined>;
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Staff
  getStaff(id: string): Promise<Staff | undefined>;
  getAllStaff(): Promise<Staff[]>;
  getStaffMember(id: string): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: string, staff: Partial<InsertStaff>): Promise<Staff | undefined>;
  deleteStaff(id: string): Promise<boolean>;

  // Appointments
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointments(): Promise<Appointment[]>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<boolean>;

  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getLowStockProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Suppliers
  getSupplier(id: string): Promise<Supplier | undefined>;
  getSuppliers(): Promise<Supplier[]>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: string, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined>;
  deleteSupplier(id: string): Promise<boolean>;

  // Inventory Transactions
  getInventoryTransaction(id: string): Promise<InventoryTransaction | undefined>;
  getInventoryTransactions(): Promise<InventoryTransaction[]>;
  getInventoryTransactionsByProduct(productId: string): Promise<InventoryTransaction[]>;
  createInventoryTransaction(transaction: InsertInventoryTransaction): Promise<InventoryTransaction>;
  updateInventoryTransaction(id: string, transaction: Partial<InsertInventoryTransaction>): Promise<InventoryTransaction | undefined>;
  deleteInventoryTransaction(id: string): Promise<boolean>;

  // POS Transactions
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Time Records
  getTimeRecords(): Promise<TimeRecord[]>;
  getActiveTimeRecord(staffId: string): Promise<TimeRecord | undefined>;
  clockIn(data: { staffId: string; notes?: string }): Promise<TimeRecord>;
  clockOut(id: string, data: { notes?: string }): Promise<TimeRecord>;
  startBreak(id: string, data: { notes?: string }): Promise<TimeRecord>;
  endBreak(id: string, data: { notes?: string }): Promise<TimeRecord>;

  // Notification Settings
  getNotificationSettings(): Promise<NotificationSettings | undefined>;
  createOrUpdateNotificationSettings(settings: InsertNotificationSettings): Promise<NotificationSettings>;

  // Notification Log
  getNotificationLogs(appointmentId?: string): Promise<NotificationLog[]>;
  createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog>;
}

export class DatabaseStorage implements IStorage {
  // Client methods
  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client || undefined;
  }

  async getClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined> {
    const [updatedClient] = await db.update(clients).set(client).where(eq(clients.id, id)).returning();
    return updatedClient || undefined;
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return result.rowCount > 0;
  }

  // Service methods
  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updatedService] = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return updatedService || undefined;
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return result.rowCount > 0;
  }

  // Staff methods
  async getStaff(id: string): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.id, id));
    return staffMember || undefined;
  }

  async getStaffMember(id: string): Promise<Staff | undefined> {
    const [staffMember] = await db.select().from(staff).where(eq(staff.id, id));
    return staffMember || undefined;
  }

  async getAllStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async createStaff(staffMember: InsertStaff): Promise<Staff> {
    const [newStaff] = await db.insert(staff).values(staffMember).returning();
    return newStaff;
  }

  async updateStaff(id: string, staffMember: Partial<InsertStaff>): Promise<Staff | undefined> {
    const [updatedStaff] = await db.update(staff).set(staffMember).where(eq(staff.id, id)).returning();
    return updatedStaff || undefined;
  }

  async deleteStaff(id: string): Promise<boolean> {
    const result = await db.delete(staff).where(eq(staff.id, id));
    return result.rowCount > 0;
  }

  // Appointment methods
  async getAppointment(id: string): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment || undefined;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(sql`DATE(${appointments.dateTime}) = ${date}`);
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }

  async updateAppointment(id: string, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [updatedAppointment] = await db.update(appointments).set(appointment).where(eq(appointments.id, id)).returning();
    return updatedAppointment || undefined;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    const result = await db.delete(appointments).where(eq(appointments.id, id));
    return result.rowCount > 0;
  }

  // Product methods
  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getLowStockProducts(): Promise<Product[]> {
    return await db.select().from(products).where(sql`${products.currentStock} <= ${products.minStockLevel}`);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  // Supplier methods
  async getSupplier(id: string): Promise<Supplier | undefined> {
    const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
    return supplier || undefined;
  }

  async getSuppliers(): Promise<Supplier[]> {
    return await db.select().from(suppliers);
  }

  async createSupplier(supplier: InsertSupplier): Promise<Supplier> {
    const [newSupplier] = await db.insert(suppliers).values(supplier).returning();
    return newSupplier;
  }

  async updateSupplier(id: string, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const [updatedSupplier] = await db.update(suppliers).set(supplier).where(eq(suppliers.id, id)).returning();
    return updatedSupplier || undefined;
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const result = await db.delete(suppliers).where(eq(suppliers.id, id));
    return result.rowCount > 0;
  }

  // Inventory Transaction methods
  async getInventoryTransaction(id: string): Promise<InventoryTransaction | undefined> {
    const [transaction] = await db.select().from(inventoryTransactions).where(eq(inventoryTransactions.id, id));
    return transaction || undefined;
  }

  async getInventoryTransactions(): Promise<InventoryTransaction[]> {
    return await db.select().from(inventoryTransactions);
  }

  async getInventoryTransactionsByProduct(productId: string): Promise<InventoryTransaction[]> {
    return await db.select().from(inventoryTransactions).where(eq(inventoryTransactions.productId, productId));
  }

  async createInventoryTransaction(transaction: InsertInventoryTransaction): Promise<InventoryTransaction> {
    // Update product stock based on transaction type
    const product = await this.getProduct(transaction.productId);
    if (product) {
      let newStock = product.currentStock;
      
      switch (transaction.type) {
        case 'purchase':
        case 'adjustment':
          newStock += transaction.quantity;
          break;
        case 'sale':
        case 'waste':
          newStock -= transaction.quantity;
          break;
      }
      
      await this.updateProduct(transaction.productId, { currentStock: newStock });
    }

    const [newTransaction] = await db.insert(inventoryTransactions).values(transaction).returning();
    return newTransaction;
  }

  async updateInventoryTransaction(id: string, transaction: Partial<InsertInventoryTransaction>): Promise<InventoryTransaction | undefined> {
    const [updatedTransaction] = await db.update(inventoryTransactions).set(transaction).where(eq(inventoryTransactions.id, id)).returning();
    return updatedTransaction || undefined;
  }

  async deleteInventoryTransaction(id: string): Promise<boolean> {
    const result = await db.delete(inventoryTransactions).where(eq(inventoryTransactions.id, id));
    return result.rowCount > 0;
  }
  // POS Transactions methods
  async getTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const transactionNumber = `TXN-${Date.now()}`;
    const [newTransaction] = await db
      .insert(transactions)
      .values({ ...transaction, transactionNumber })
      .returning();
    return newTransaction;
  }

  // Time Records methods
  async getTimeRecords(): Promise<TimeRecord[]> {
    return await db.select().from(timeRecords).orderBy(desc(timeRecords.createdAt));
  }

  async getActiveTimeRecord(staffId: string): Promise<TimeRecord | undefined> {
    const [record] = await db
      .select()
      .from(timeRecords)
      .where(and(eq(timeRecords.staffId, staffId), eq(timeRecords.status, "active")));
    return record || undefined;
  }

  async clockIn(data: { staffId: string; notes?: string }): Promise<TimeRecord> {
    const [timeRecord] = await db
      .insert(timeRecords)
      .values({
        staffId: data.staffId,
        clockIn: new Date(),
        notes: data.notes,
        status: "active",
      })
      .returning();
    return timeRecord;
  }

  async clockOut(id: string, data: { notes?: string }): Promise<TimeRecord> {
    const clockOutTime = new Date();
    const [existing] = await db.select().from(timeRecords).where(eq(timeRecords.id, id));
    
    if (!existing) {
      throw new Error("Time record not found");
    }

    const clockInTime = new Date(existing.clockIn);
    const totalMs = clockOutTime.getTime() - clockInTime.getTime();
    const totalHours = (totalMs / (1000 * 60 * 60)).toFixed(2);

    // Calculate break duration if applicable
    let breakDuration = "0";
    if (existing.breakStart && existing.breakEnd) {
      const breakMs = new Date(existing.breakEnd).getTime() - new Date(existing.breakStart).getTime();
      breakDuration = (breakMs / (1000 * 60 * 60)).toFixed(2);
    }

    const regularHours = Math.max(0, parseFloat(totalHours) - parseFloat(breakDuration)).toFixed(2);
    const overtimeHours = Math.max(0, parseFloat(regularHours) - 8).toFixed(2);

    const [updatedRecord] = await db
      .update(timeRecords)
      .set({
        clockOut: clockOutTime,
        totalHours,
        regularHours,
        overtimeHours,
        breakDuration,
        status: "completed",
        notes: data.notes || existing.notes,
        updatedAt: new Date(),
      })
      .where(eq(timeRecords.id, id))
      .returning();

    return updatedRecord;
  }

  async startBreak(id: string, data: { notes?: string }): Promise<TimeRecord> {
    const [updatedRecord] = await db
      .update(timeRecords)
      .set({
        breakStart: new Date(),
        status: "on-break",
        updatedAt: new Date(),
      })
      .where(eq(timeRecords.id, id))
      .returning();

    return updatedRecord;
  }

  async endBreak(id: string, data: { notes?: string }): Promise<TimeRecord> {
    const [updatedRecord] = await db
      .update(timeRecords)
      .set({
        breakEnd: new Date(),
        status: "active",
        updatedAt: new Date(),
      })
      .where(eq(timeRecords.id, id))
      .returning();

    return updatedRecord;
  }

  // Notification Settings methods
  async getNotificationSettings(): Promise<NotificationSettings | undefined> {
    const [settings] = await db.select().from(notificationSettings).limit(1);
    return settings || undefined;
  }

  async createOrUpdateNotificationSettings(settingsData: InsertNotificationSettings): Promise<NotificationSettings> {
    // Check if settings already exist
    const existing = await this.getNotificationSettings();
    
    if (existing) {
      // Update existing settings
      const [updatedSettings] = await db
        .update(notificationSettings)
        .set({ ...settingsData, updatedAt: new Date() })
        .where(eq(notificationSettings.id, existing.id))
        .returning();
      return updatedSettings;
    } else {
      // Create new settings
      const [newSettings] = await db
        .insert(notificationSettings)
        .values(settingsData)
        .returning();
      return newSettings;
    }
  }

  // Notification Log methods
  async getNotificationLogs(appointmentId?: string): Promise<NotificationLog[]> {
    if (appointmentId) {
      return await db
        .select()
        .from(notificationLog)
        .where(eq(notificationLog.appointmentId, appointmentId))
        .orderBy(desc(notificationLog.createdAt));
    } else {
      return await db
        .select()
        .from(notificationLog)
        .orderBy(desc(notificationLog.createdAt))
        .limit(100);
    }
  }

  async createNotificationLog(logData: InsertNotificationLog): Promise<NotificationLog> {
    const [newLog] = await db
      .insert(notificationLog)
      .values(logData)
      .returning();
    return newLog;
  }
}

export const storage = new DatabaseStorage();