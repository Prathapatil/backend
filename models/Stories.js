let Database = require("./Database");

class Stories{
    id = 0;
    name = "";
    package = "";
    cmname = "";
    position = "";
    qualification = "";
    img = "";
    plcmon = "";
    imagecode = "";

    db = new Database.Database();
    query = "";

    Constructor(){
        this.id = 0;
        this.name = "";
        this.package = "";
        this.cmname = "";
        this.position = "";
        this.qualification = "";
        this.img = "";
        this.plcmon = "";
    }
    
    liststories = ()=>{
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

    save = ()=>{

        if(this.imagecode != "")
        {
            let base64image = this.imagecode.replace(/^data:image\/jpeg;base64,/, "");
            base64image = base64image.replace(/^data:image\/png;base64,/, "");
            this.img = "courses/" + Math.random().toString(36).substring(2, 7) + ".png";
            fs.writeFile("public/" + this.img, base64image, 'base64', function (err) {
                console.log("Error image saving-" + err);
            });
        }


        if(this.id == 0)
        {
            this.query = "INSERT INTO stories(name, package, cmname, position, qualification, img, plcmon) ";
            this.query += "VALUES('" + this.name + "', '" + this.package + "', '" + this.cmname + "','" + this.position + "','" + this.qualification + "', '" + this.img + "', '" + this.plcmon + "')";
        }
        else
        {
            this.query = "UPDATE stories SET name = '" + this.name  + "', ";
            this.query += "package = '" + this.package + "', ";
            this.query += " cmname = '" + this.cmname + "', ";
            this.query += " position = '" + this.position + "', ";
            this.query += " qualification = '" + this.qualification + "', ";
            this.query += " img = '" + this.img + "', ";
            this.query += " plcmon = '" + this.plcmon + "', ";
            this.query += " WHERE id = " + this.id;
            
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

    



    getstories = ()=>{
    this.query = "SELECT * FROM stories WHERE id = " + this.id;
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

    deletestories = ()=>{
        this.query = "DELETE FROM stories WHERE id = " + this.id;
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
    Stories:Stories
}