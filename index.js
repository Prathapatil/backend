let express = require("express");
let bodyparser = require("body-parser");
const Admin = require("./models/Admin");
const Course = require("./models/Course");
const Coursetopics = require("./models/Coursetopics");
const Stories = require("./models/Stories");

let app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true})); 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get("/", (req, res)=>{
    res.send("Welcome to iGAP Education APIs");
});

app.post("/login", (req, res)=>{
    let data = req.body.data;
    let admin = new Admin.Admin();
    admin.email = data.email;
    admin.password = data.password;
    admin.login().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});


app.post("/savecourse", (req, res)=>{
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    course.name = data.name.replace(/'/g, "''");
    course.imagecode = data.imagecode;
    course.description = data.description.replace(/'/g, "''");
    course.save().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});


app.post("/deletecourse", (req, res)=>{
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    course.delete().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/listcourse", (req, res)=>{
    let data = req.body.data;
    let course = new Course.Course();
    course.list().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/getcourse", (req, res)=>{
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    course.list().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/savecoursetopic", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.courseid = data.courseid;
    coursetopics.topicname = data.topicname;
    coursetopics.description = data.description;
    coursetopics.srno = data.srno;
    coursetopics.save().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/getcoursetopic", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.gettopic().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/listcoursetopic", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.courseid = data.courseid;
    coursetopics.listtopic().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/deletecoursetopic", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.deletetopic().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/updatesrno", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.srno = data.srno;
    coursetopics.id = data.id;
    coursetopics.courseid = data.courseid;     
    coursetopics.updatesr().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});


app.post("/savestories", (req, res)=>{
    let data = req.body.data;
    let stories = new Stories.Stories();
    stories.id = data.id;
    stories.name = data.name.replace(/'/g, "''");
    stories.package = data.package.replace(/'/g, "''");
    stories.cmname = data.cmname.replace(/'/g, "''");
    stories.position = data.position.replace(/'/g, "''");
    stories.qualification = data.qualification.replace(/'/g, "''");
    stories.img = data.img;
    stories.plcmon = data.plcmon;
    stories.save().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/getstories", (req, res)=>{
    let data = req.body.data;
    let stories = new Stories.Stories();
    stories.id = data.id;
    stories.getstories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/liststories", (req, res)=>{
    let data = req.body.data;
    let stories = new Stories.Stories();
    stories.liststories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/deletestories", (req, res)=>{
    let data = req.body.data;
    let stories = new Stories.Stories();
    stories.id = data.id;
    stories.deletestories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.listen(8081, ()=>{
    console.log("APIs are running at http://localhost:8081");
});