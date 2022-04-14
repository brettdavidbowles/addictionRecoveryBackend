// switch this to pgBouncer setup if it ever goes to prod

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'addictionRecoveryApp',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getJournalEntriesByUser = (request, response) => {
  const user_id_fkey = parseInt(request.params.user_id_fkey)

  pool.query('SELECT * FROM journal_entries WHERE user_id_fkey = $1', [user_id_fkey], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createJournalEntry = (request, response) => {
  const { entry, user_id_fkey } = request.body

  pool.query('INSERT INTO journal_entries (entry, user_id_fkey) VALUES ($1, $2) RETURNING id', [entry, user_id_fkey], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Journal Entry added`)
  })
}

const getRecoveryCapitalByUser = (request, response) => {
  const user_id_fkey = parseInt(request.params.user_id_fkey)

  pool.query('SELECT * FROM recovery_capital WHERE user_id_fkey = $1', [user_id_fkey], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateRecoveryCapital = (request, response) => {
  const user_id_fkey = parseInt(request.params.user_id_fkey)
  // const { name, email } = request.body

  pool.query(
    'UPDATE recovery_capital SET total = total + 1 WHERE user_id_fkey = $1',
    [user_id_fkey],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${user_id_fkey}`)
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getJournalEntriesByUser,
  createJournalEntry,
  getRecoveryCapitalByUser,
  updateRecoveryCapital,
}
