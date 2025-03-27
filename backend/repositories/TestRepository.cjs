class TestRepository {
    constructor(db) {
        this.db = db;
    }

    async testConnection() {
        await this.db.query("SET timezone = 'Europe/Rome'");
        const result = await this.db.query('SELECT NOW() as current_time');
        return {
            message: 'Connessione al DB riuscita!',
            time: result.rows[0].current_time
        };
    }
}

module.exports = TestRepository;