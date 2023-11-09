const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Persoane',
  password: 'Zisu123!',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Eroare la conectarea la baza de date', err);
  } else {
    console.log('Conectat la baza de date');
  }
});

// PRELUARE DATE PENTRU PERSOANE

app.get('/persoane', (req, res) => {
  client.query('SELECT * FROM public."TabelaPersoane" ORDER BY id ASC', (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Eroare la obținerea datelor din baza de date.');
    } else {
      const persoane = data.rows;
      res.send(persoane);
    }
  });
});

app.get('/persoane/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM public."TabelaPersoane" WHERE id = $1', [id], (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Eroare la obținerea persoanei din baza de date.');
    } else {
      if (data.rows.length === 0) {
        res.status(404).send('Persoana nu a fost găsită.');
      } else {
        res.send(data.rows[0]);
      }
    }
  });
});

//delete

app.delete('/persoane/:id', (req, res) => {
  const id = req.params.id;
  client.query('DELETE FROM public."TabelaPersoane" WHERE id = $1', [id], (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Eroare la ștergerea persoanei din baza de date.' });
    } else {
      if (data.rowCount === 0) {
        res.status(404).json({ error: 'Persoana nu a fost găsită.' });
      } else {
        res.status(200).json({ message: 'Persoana a fost ștearsă cu succes.' });
      }
    }
  });
});

// /delete

// put

app.put('/persoane/:id', (req, res) => {
  const id = req.params.id;
  const { nume, prenume, cnp, varsta, masini } = req.body;

  client.query(
    'UPDATE public."TabelaPersoane" SET "Nume"=$1, "Prenume"=$2, "CNP"=$3, "Varsta"=$4, masini=$5 WHERE "id"=$6',
    [nume, prenume, cnp, varsta, masini, id],
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Eroare la actualizarea persoanei din baza de date.' });
      } else {
        if (data.rowCount === 0) {
          res.status(404).json({ error: 'Persoana nu a fost găsită.' });
        } else {
          res.status(200).json({ message: 'Persoana a fost actualizată cu succes.' });
        }
      }
    }
  );
});
// /put

// post

app.post('/persoane', (req, res) => {
  const { nume, prenume, cnp, varsta, masini } = req.body;

  client.query(
    'INSERT INTO public."TabelaPersoane" ("Nume", "Prenume", "CNP", "Varsta", masini) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nume, prenume, cnp, varsta, masini],
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Eroare la adăugarea persoanei în baza de date.' });
      } else {
        res.status(201).json({ message: 'Persoana a fost adăugată cu succes.', persoana: data.rows[0] });
      }
    }
  );
});
// /post

// PRELUARE DATE PENTRU MASINI

app.get('/masini', (req, res) => {
  client.query('SELECT * FROM public."Car" ORDER BY id ASC', (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Eroare la obținerea datelor din baza de date.');
    } else {
      const masini = data.rows;
      res.send(masini);
    }
  });
});

app.get('/masini/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM public."Car" WHERE id = $1', [id], (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Eroare la obținere masini din baza de date.');
    } else {
      if (data.rows.length === 0) {
        res.status(404).send('Masina nu a fost găsită.');
      } else {
        res.send(data.rows[0]);
      }
    }
  });
});

//delete

app.delete('/masini/:id', (req, res) => {
  const id = req.params.id;
  client.query('DELETE FROM public."Car" WHERE id = $1', [id], (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Eroare la ștergerea masinii din baza de date.' });
    } else {
      if (data.rowCount === 0) {
        res.status(404).json({ error: 'Masina nu a fost găsită.' });
      } else {
        res.status(200).json({ message: 'Masina a fost ștearsă cu succes.' });
      }
    }
  });
});

// /delete

// PENTRU Put

app.put('/masini/:id', (req, res) => {
  const id = req.params.id;
  const { marca, model, an, cc, taxa } = req.body;

  client.query(
    'UPDATE public."Car" SET "Marca"=$1, "Model"=$2, "An"=$3, "CC"=$4, "Taxa"=$5 WHERE "id"=$6',
    [marca, model, an, cc, taxa, id],
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Eroare la actualizare masini din baza de date.' });
      } else {
        if (data.rowCount === 0) {
          res.status(404).json({ error: 'Masina nu a fost găsită.' });
        } else {
          res.status(200).json({ message: 'Masina a fost actualizată cu succes.' });
        }
      }
    }
  );
});

// post

app.post('/masini', (req, res) => {
  const { marca, model, an, cc, taxa } = req.body;

  client.query(
    'INSERT INTO public."Car" ("Marca", "Model", "An", "CC", "Taxa") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [marca, model, an, cc, taxa ],
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Eroare la adăugarea masinii în baza de date.' });
      } else {
        res.status(201).json({ message: 'Masina a fost adăugată cu succes.', masina: data.rows[0] });
      }
    }
  );
});
// /post

// Preluare date Jonctiune
app.get('/jonctiune', (req, res) => {
  client.query('SELECT * FROM public."Jonctiune" ORDER BY id ASC', (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Eroare la obținerea datelor din baza de date.');
    } else {
      const jonctiune = data.rows;
      res.send(jonctiune);
    }
  });
});

app.delete('/jonctiune/:id', (req, res) => {
  const id = req.params.id;
  client.query('DELETE FROM public."Jonctiune" WHERE id = $1', [id], (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Eroare la ștergerea joncțiunii din baza de date.' });
    } else {
      if (data.rowCount === 0) {
        res.status(404).json({ error: 'Joncțiunea nu a fost găsită.' });
      } else {
        res.status(200).json({ message: 'Joncțiunea a fost ștearsă cu succes.' });
      }
    }
  });
});

app.post('/jonctiune', (req, res) => {
  const { id_person, id_car } = req.body;

  client.query(
    'INSERT INTO public."Jonctiune" ("id_person", "id_car") VALUES ($1, $2) RETURNING *',
    [id_person, id_car],
    (err, data) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Eroare la adăugarea joncțiunii în baza de date.' });
      } else {
        res.status(201).json({ message: 'Joncțiunea a fost adăugată cu succes.', jonctiune: data.rows[0] });
      }
    }
  );
});
// /jonctiune

const port = 4300;
app.listen(port, () => {
  console.log(`Serverul a pornit pe portul ${port}`);
});
