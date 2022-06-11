let Database = require("./Database");  
let fs = require("fs");  
class Course{
    id = 0;
    name = "";
    imagecode = "";
    imgpath = "";
    description = "";

    db = new Database.Database();
    query = "";

    constructor(){
        this.id = 0;
        this.name = "";
        this.imgpath = "";
        this.description = "";
    }


    save = ()=>{

        if(this.imagecode != "")
        {
            let base64image = this.imagecode.replace(/^data:image\/jpeg;base64,/, "");
            base64image = base64image.replace(/^data:image\/png;base64,/, "");
            this.imgpath = "courses/" + Math.random().toString(36).substring(2, 7) + ".png";
            fs.writeFile("public/" + this.imgpath, base64image, 'base64', function (err) {
                console.log("Error image saving-" + err);
            });
        }

        if(this.id == 0)
        {
            this.query = "INSERT INTO courses(name, description, imgpath) ";
            this.query += "VALUES('" + this.name + "', '" + this.description + "', '" + this.imgpath + "')";
        }
        else{
            this.query = "UPDATE courses SET name = '" + this.name + "', ";
            this.query += "description = '" + this.description + "', ";
            this.query += " imgpath = '" + this.imgpath + "' WHERE id = " + this.id;
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



    delete = ()=>{
        this.query = "DELETE FROM courses WHERE id = " + this.id;
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
    
    list = ()=>{
        this.query = "SELECT * FROM courses";
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

    get = ()=>{
        this.query = "SELECT * FROM courses WHERE id = " + this.id;
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
    Course:Course
}