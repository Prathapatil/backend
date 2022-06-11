let Database = require("./Database");

class Coursetopics{
    id = 0;
    courseid = 0;
    topicname = "";
    description = "";
    srno = 0;

    db = new Database.Database();
    query = "";

    constructor(){
        this.id = 0;
        this.courseid = 0;
        this.topicname = "";
        this.description = "";
        this.srno = 0;
    }

    save = ()=>{

        if(this.id == 0)
        {
            this.query = "INSERT INTO coursetopics(courseid, topicname, description, srno) ";
            this.query += "VALUES('" + this.courseid + "', '" + this.topicname + "', '" + this.description + "','" + this.srno + "')";
        }
        else
        {
            this.query = "UPDATE coursetopics SET courseid = '" + this.courseid + "', ";
            this.query += "topicname = '" + this.topicname + "', ";
            this.query += " description = '" + this.description + "', ";
            this.query += " srno = '" + this.srno + "' WHERE id = " + this.id;
        }
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                {
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })
        });

    } 

    gettopic = ()=>{
        this.query = "SELECT * FROM coursetopics WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                {
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })
        });
    }

    listtopic = ()=>{
        this.query = "SELECT * FROM coursetopics WHERE courseid = " + this.courseid + " " +"ORDER BY srno ASC";
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                {
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })
        });
    }

    deletetopic = ()=>{
        this.query = "DELETE FROM coursetopics WHERE id = " + this.id;
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                {
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })
        });
    }
    
    updatesr = ()=>{

        
        this.query = "UPDATE coursetopics SET srno = '" + this.srno + "' WHERE id = " + this.id + " " + "AND courseid =" + this.courseid;
       
        return new Promise((resolve, reject)=>{
            this.db.query(this.query, (err, result)=>{
                if(err)
                {
                    return reject(err);
                }
                else{
                    return resolve(result);
                }
            })
        });


 }
}

 module.exports = {
    Coursetopics:Coursetopics
}