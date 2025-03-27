class ContactRepository {
    constructor(db) {
        this.db = db;
    }

    async createContact(contactData) {
        const { name, email, message } = contactData;
        const result = await this.db.query(
            'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        return result.rows[0];
    }
}

module.exports = ContactRepository;