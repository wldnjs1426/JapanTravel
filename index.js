const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.port || 8000;

//DB접속
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "JAPAN",
    password: "1426",
    database: "japan"
});


app.use(cors());
app.use(express.json());
//DB데이터 파싱
app.use(express.urlencoded({ extended: false }))





//상세 데이터 쿼리
app.get("/detail", (req, res)=>{
    var id = req.query.id
    var Category = req.query.Category

    let sqlQuery = "SELECT * FROM "+Category+" WHERE id='"+id+"';";
    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})

app.get("/detailC", (req, res)=>{
    var id = req.query.id
    var Category = req.query.Category

    let sqlQuery = "SELECT japan_code.category_nm FROM "+Category+" INNER JOIN japan_code ON "+Category+".Category_code=japan_code.Category_code WHERE "+Category+".id="+id+";"    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})
app.get("/detailA", (req, res)=>{
    var Area = req.query.Area

    let sqlQuery = "SELECT detail_nm FROM tourlist_code WHERE detail_cd = '"+Area+"'"    
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})



//리스트 데이터 출력 쿼리
app.get("/tour", (req, res)=>{
    var Area = req.query.Area
    var Category = req.query.Category

    let sqlQuery ;
    if(Area == "null"){
        sqlQuery = "SELECT *,(SELECT DETAIL_NM FROM tourlist_code  WHERE detail_cd = TU.AREA) AS detail_nm FROM "+Category+" TU";
    }else{
        sqlQuery = "SELECT *,(SELECT DETAIL_NM FROM tourlist_code  WHERE detail_cd = TU.AREA) AS detail_nm FROM "+Category+" TU WHERE Area='"+Area+"'";

    }
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
        console.log(err);
    });
})
//지역 데이터 쿼리
app.get("/tour/Area", (req, res)=>{
    const sqlQuery = "SELECT * FROM TOURLIST_CODE";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
        console.log(result)
    });
})
//카테고리 데이터 쿼리
app.get("/tour/Category", (req, res)=>{
    const sqlQuery = "SELECT * FROM JAPAN_CODE";
    db.query(sqlQuery, (err, result)=>{
        res.send(result);
    });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});