const Pool = require('pg').Pool;
global.crypto = require('crypto');

const pool = new Pool({
    user: 'guila',
    host: 'localhost',
    database: 'kuiri',
    password: '',
    port: 5432,
});

const getUsers = (req, res) => {
    pool.query(
        'SELECT  id, first_name, last_name, email, permission_level \
        FROM users ORDER BY id ASC', 
        (error, results) =>{
        if(error) {
            throw error;
        }

        res.status(200).json(results.rows);
    });
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query(
        'SELECT id, first_name, last_name, email, permission_level \
        FROM users WHERE id = $1',
        [id],
        (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
}

const createUser = (req, res) => {
    const {
        first_name, 
        last_name, 
        email, 
        permission_level, 
        password
    } = req.body;

    const encrypted_password = ((password) => {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512',salt)
                                         .update(password)
                                         .digest("base64");
        return `${salt}$${hash}`;
    })(password);

    try {
        pool.query(
            'INSERT INTO users ( \
                first_name, \
                last_name, \
                email, \
                permission_level, \
                password) \
            VALUES ($1, $2, $3, $4, $5)',
            [first_name, last_name, email, permission_level, encrypted_password],
            (error, results) => {
                if(error) {
                    throw error;
                }

                res.status(201).send(`User created!`);
            }
        );
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getUsers,
    getUserById,
    createUser
}