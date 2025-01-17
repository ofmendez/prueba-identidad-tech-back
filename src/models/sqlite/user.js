export class UserModel {
  setEnv ({ db }) {
    this.db = db;
  }

  async getAll ({ c }) {
    try {
      const results = this.db.query('SELECT * FROM Users').all();
      return { done: true, results };
    } catch (error) {
      return { done: false, error };
    }
  }

  async getById ({ id, c }) {
    try {
      const results = this.db.query('SELECT * FROM Users WHERE UserId = ?').all(id);
      if (results.length === 0)
        return { done: false, error: 'RDS-User not found' };
      return { done: true, results };
    } catch (error) {
      return { done: false, error };
    }
  }

  async create ({ i, c }) {
    try {
      const query = this.db.query(
        'INSERT INTO Users (UserId, Name, Pass, Salt, Role, State) VALUES (?1, ?2, ?3, ?4, ?5, ?6)'
      );
      const result = query.all(i.UserId, i.Name, i.Pass, i.Salt, i.Role, i.State);
      return { done: true, results: result };
    } catch (error) {
      return { done: false, error };
    }
  }

  async delete ({ id, c }) {
    try {
      const query = this.db.query('DELETE FROM Users WHERE UserId = ?');
      const result = query.run(id);
      return result.changes > 0;
    } catch (error) {
      return false;
    }
  }

  async update ({ id, i, c }) {
    try {
      const sets = Object.keys(i).map(k => `${k} = ?`).join(', ');
      const query = this.db.query(`UPDATE Users SET ${sets} WHERE UserId = ?`);
      const result = query.run(...Object.values(i), id);
      return { done: true, results: result.changes > 0 };
    } catch (error) {
      console.log('error: ', error);
      return { done: false, error };
    }
  }
}
