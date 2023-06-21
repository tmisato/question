const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const mysql = require('mysql2');

app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'express_db'
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'html/form.html'))
);


app.post('/', (req, res) => {
  // 選択された値を一時的に保持する変数
  let selectedContent = '';

  // チェックボックスの選択状態を確認し、選択された値を変数に追加
  if (req.body.content) {
    if (Array.isArray(req.body.content)) {
      selectedContent = req.body.content.join(',');
    } else {
      selectedContent = req.body.content;
    }
  }

  const sql = "INSERT INTO question SET ?";

  const data = {
    name: req.body.name,
    kana_name: req.body.kana_name,
    gender: req.body.gender,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    content: selectedContent,
    question: req.body.question
  };

  con.query(sql, data, function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send('アンケートのご協力ありがとうございました。');
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
