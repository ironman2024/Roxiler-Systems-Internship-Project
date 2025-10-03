const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../../store_rating.db');
const db = new sqlite3.Database(dbPath);

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ rows });
    });
  });
};

const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve({ data: row, error: null });
    });
  });
};

const insert = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ data: { id: this.lastID }, error: null });
    });
  });
};

const update = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ data: { changes: this.changes }, error: null });
    });
  });
};

const initializeDatabase = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(60) NOT NULL CHECK (length(name) BETWEEN 20 AND 60),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400),
        role VARCHAR(20) DEFAULT 'normal' CHECK (role IN ('admin', 'normal', 'store_owner')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS stores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(60) NOT NULL CHECK (length(name) BETWEEN 20 AND 60),
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(400),
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        review TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, store_id)
      )
    `);

    const adminCheck = await queryOne('SELECT id FROM users WHERE email = ?', ['admin@system.com']);
    
    if (!adminCheck.data) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await insert(`
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
      `, ['System Administrator User', 'admin@system.com', hashedPassword, '123 Admin Street, Admin City', 'admin']);
      
      console.log('✅ Admin user created successfully');
    }

    const storeCheck = await queryOne('SELECT id FROM stores LIMIT 1');
    if (!storeCheck.data) {
      const owner1Password = await bcrypt.hash('Admin123!', 10);
      const owner2Password = await bcrypt.hash('Admin123!', 10);
      
      const owner1 = await insert(`
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
      `, ['Sample Store Owner One Account', 'owner1@store.com', owner1Password, '456 Store Street, Store City', 'store_owner']);
      
      const owner2 = await insert(`
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
      `, ['Sample Store Owner Two Account', 'owner2@store.com', owner2Password, '789 Shop Avenue, Shop Town', 'store_owner']);
      
      await insert(`
        INSERT INTO stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)
      `, ['Amazing Electronics Store Chain', 'contact@electronics.com', '123 Tech Street, Silicon Valley', owner1.data.id]);
      
      await insert(`
        INSERT INTO stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)
      `, ['Fresh Grocery Market Place Store', 'info@freshmarket.com', '456 Food Avenue, Downtown', owner2.data.id]);
      
      console.log('✅ Sample stores created successfully');
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

initializeDatabase();

module.exports = { query, queryOne, insert, update };