export class DeviceModel {
  setEnv ({ db }) {
    this.db = db;
  }

  async getAll ({ c }) {
    try {
      const results = this.db.query('SELECT * FROM Devices').all();
      return { done: true, results };
    } catch (error) {
      return { done: false, error };
    }
  }

  async getById ({ id, c }) {
    try {
      const results = this.db.query('SELECT * FROM Devices WHERE DeviceId = ?').all(id);
      if (results.length === 0)
        return { done: false, error: 'RDS-Device not found' };
      return { done: true, results };
    } catch (error) {
      return { done: false, error };
    }
  }

  async create ({ i, c }) {
    try {
      const query = this.db.query(
        'INSERT INTO Devices ( Name, State, Battery, Storage, Price, MainCamera, FrontCamera, createdAt, updatedAt) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)'
      );
      const result = query.run(i.Name, i.State, i.Battery, i.Storage, i.Price, i.MainCamera, i.FrontCamera, new Date().toISOString(), new Date().toISOString());
      return { done: true, results: result };
    } catch (error) {
      return { done: false, error };
    }
  }

  async delete ({ id, c }) {
    try {
      const query = this.db.query('DELETE FROM Devices WHERE DeviceId = ?');
      const result = query.run(id);
      return result.changes > 0;
    } catch (error) {
      return false;
    }
  }

  async deleteAll ({ c }) {
    try {
      const query = this.db.query('DELETE FROM Devices');
      const result = query.run();
      return result.changes >= 0;
    } catch (error) {
      return false;
    }
  }

  async update ({ id, i, c }) {
    try {
      const sets = Object.keys(i).map(k => `${k} = ?`).join(', ');
      const query = this.db.query(`UPDATE Devices SET ${sets} WHERE DeviceId = ?`);
      const result = query.run(...Object.values(i), id);
      return { done: true, results: result.changes > 0 };
    } catch (error) {
      console.log('error: ', error);
      return { done: false, error };
    }
  }
}
