import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ma823610', //senha do teu mysql
    database: 'inovacaoverde', //nome do teu banco
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Conectado ao Banco de Dados MySQL!');
    }
});

const JWT_SECRET = 'jwtsecret';

function generateToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, email });
        });
    } catch (err) {
        res.status(500).send('Erro ao registrar usuário.');
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao autenticar o usuário.');
        }
        if (results.length === 0) {
            return res.status(400).send('Usuário não encontrado.');
        }

        const user = results[0];
        try {
            if (await bcrypt.compare(password, user.password)) {
                const token = generateToken(user.id);
                res.json({ token, message: "Login bem-sucedido! Redirecionando para a página inicial..." });
            } else {
                res.status(400).send('Senha incorreta.');
            }
        } catch (err) {
            res.status(500).send('Erro ao autenticar usuário.');
        }
    });
});

// Rota protegida de "home"
app.get('/', authenticateToken, (req, res) => {
    res.send('Bem-vindo à página inicial!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
