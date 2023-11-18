//console.log("server started");
const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const {checkUser} = require("./middleware/authMiddleware");

const login_info_users_model = require("./models/login_info_users_model.js")
const admin_creds_model = require("./models/admin_creds_model.js")
const incomeTaxVariables_model = require("./models/incomeTaxVariables_model.js")

const session = require("express-session");
const store = new session.MemoryStore();
const user_info_model = require("./models/user_info_model.js");


const maxAge = 60 * 30 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, "cse471secret",{
        expiresIn: maxAge
    });
}


// middlewares
const app = express()
app.use(express.json())
app.use(cors())  
app.use(session({
    secret: "some secret",
    cookie: {maxAge: 600000},
    saveUninitialized: false,
    resave: true,
    store
}))
 
app.get('*', checkUser);

// routes
app.post('/signup', (req,res)=> {
    login_info_users_model.create( req.body ) // uploading body given by client to DB
    .then( login_info_users => res.json(login_info_users) )  // responding back the uploaded body to client
    .catch( err => res.json(err) )
})


app.post('/login', (req,res) => {
    const {email, password} = req.body;  // storing json body elements to variables which is sent by client 
    login_info_users_model.findOne({email: email})  // find employee based on email
    .then( (user) => {  // 'user' is the response about finding email, can name anything 
        if(user) {
            if( user.password === password ) {
                res.json("Success")
                /*
                const token = createToken(user._);
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
                res.status(200).json({user: user._id})
                //req.session.authenticated = true;  // 
                */
                req.session.user = { email, password }; //
                console.log(req.session.user.email); //
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("User not found")
        }
    }) 
}) 

/*
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    login_info_users_model.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    req.session.userEmail = email; // Store user email in the session
                    res.json({ message: "Success", user: user._id });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("User not found");
            }
        })
        .catch(err => res.json(err));
});

*/

// admin sign in
app.post('/authzone', (req,res) => {
    const {adminID, password} = req.body;  // storing json body elements to variables which is sent by client 
    admin_creds_model.findOne({adminID: adminID})  // find employee based on email
    .then( (admin) => {  // 'user' is the response about finding email, can name anything 
        if(admin) {
            if( admin.password === password ) {
                res.json("Success")
                req.session.authenticated = true;
                req.session.user = { adminID, password };

            } else {
                res.json("Unauthorized Access")
            }
        } else {
            res.json("Unauthorized Access")
        }
    }) 
}) 

app.get("/viewUsers", (req, res) => {
    user_info_model.find()
    .then(user_informations => res.json(user_informations))
    .catch(err => res.json(err))

})


app.get("/userProfile", (req, res) => {
    const { email } = req.query; // Use req.query to get parameters from the query string
    user_info_model.findOne({ email: email })
        .then(user_information => res.json(user_information))
        .catch(err => res.json(err));
});



app.post('/addProfileInformation', (req,res) => {
    const userEmail = req.session.userEmail;
    const {firstName, lastName, email, sex, nid, profession, dob} = req.body;
    user_info_model.findOneAndUpdate(
        {email : userEmail}, 
        {
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            nid_number: nid,
            profession: profession,
            dob: dob
        }, 
        {new: true}
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    })
    .catch(err => {
        res.json("Error Occured!!");
    });
 });



 app.post('/updateProfile', (req, res) => {
    const { firstName, lastName, email, sex, nid, profession, dob } = req.body;

    // Create an object to store only non-null and non-empty fields
    const updatedFields = {};

    // Check and update each field
    if (firstName !== null && firstName !== "") {
        updatedFields.firstName = firstName;
    }

    if (lastName !== null && lastName !== "") {
        updatedFields.lastName = lastName;
    }

    if (sex !== null && sex !== "") {
        updatedFields.sex = sex;
    }

    if (nid !== null && nid !== "") {
        updatedFields.nid_number = nid;
    }

    if (profession !== null && profession !== "") {
        updatedFields.profession = profession;
    }

    if (dob !== null && dob !== "") {
        updatedFields.dob = dob;
    }

    // Update the user's profile information with non-null and non-empty fields
    user_info_model.findOneAndUpdate(
        { email: email },
        { $set: updatedFields },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    })
    .catch(err => {
        res.json("Error Occurred!!");
    });
});

/////////////////////////////////////////////////////
app.post('/incomeTaxCalc', (req, res) => {
    const {salary, months_num, rent, medical, transport, conveyance, incentive, bonus, bonus_num, radio} = req.body;   // storing json body elements to variables which is sent by client 
    //console.log(salary);
    //console.log(months_num);
    //console.log(rent);
    //console.log(medical);
    //console.log(transport);
    //console.log(conveyance);
    //console.log(incentive);
    //console.log(bonus);
    //console.log(bonus_num); 
    //console.log(radio);

    // total yearly salary
    let totalSalary =  ( Number(months_num) * (Number(salary)+Number(rent)+Number(medical)+Number(transport)+Number(conveyance)+Number(incentive)) ) + (Number(bonus)*Number(bonus_num)) ;
    //console.log(totalSalary);
    //console.log(typeof totalSalary)

    let tax_free = totalSalary / 3  // Tax_free_income_divider = 3
    if(tax_free > 450000){  // max_tax_free = 45000
        tax_free = 450000
    }

    let taxable = totalSalary - tax_free;  
    //console.log(taxable)

    incomeTaxVariables_model.findOne()
    .then(variables => {
        //console.log(variables.maleCondition2);
        let tax = 0;
        let taxable_increment = 0;        
        if(radio == "male"){
            while(taxable_increment < taxable){
                if(taxable_increment >= 0 && taxable_increment < variables.maleCondition1){
                    tax += 0
                } else if (taxable_increment >= variables.maleCondition1 && taxable_increment < variables.maleCondition2){
                    tax += 5;
                } else if (taxable_increment >= variables.maleCondition2 && taxable_increment < variables.maleCondition3){
                    tax += 10;
                } else if (taxable_increment >= variables.maleCondition3 && taxable_increment < variables.maleCondition4){
                    tax += 15;
                } else if (taxable_increment >= variables.maleCondition4 && taxable_increment < variables.maleCondition5){
                    tax += 20;
                } else if (taxable_increment >= variables.maleCondition5){
                    tax += 25;
                }
                taxable_increment+=100
            }        
        } else if(radio == "female"){
            while(taxable_increment < taxable){
                if(taxable_increment >= 0 && taxable_increment < variables.femaleCondition1){
                    tax += 0
                } else if (taxable_increment >= variables.femaleCondition1 && taxable_increment < variables.femaleCondition2){
                    tax += 5;
                } else if (taxable_increment >= variables.femaleCondition2 && taxable_increment < variables.femaleCondition3){
                    tax += 10;
                } else if (taxable_increment >= variables.femaleCondition3 && taxable_increment < variables.femaleCondition4){
                    tax += 15;
                } else if (taxable_increment >= variables.femaleCondition4 && taxable_increment < variables.femaleCondition5){
                    tax += 20;
                } else if (taxable_increment >= variables.femaleCondition5){
                    tax += 25;
                }
                taxable_increment+=100
            }    
        } else if(radio == "fighter"){
            while(taxable_increment < taxable){
                if(taxable_increment >= 0 && taxable_increment < variables.fighterCondition1){
                    tax += 0
                } else if (taxable_increment >= variables.fighterCondition1 && taxable_increment < variables.fighterCondition2){
                    tax += 5;
                } else if (taxable_increment >= variables.fighterCondition2 && taxable_increment < variables.fighterCondition3){
                    tax += 10;
                } else if (taxable_increment >= variables.fighterCondition3 && taxable_increment < variables.fighterCondition4){
                    tax += 15;
                } else if (taxable_increment >= variables.fighterCondition4 && taxable_increment < variables.fighterCondition5){
                    tax += 20;
                } else if (taxable_increment >= variables.fighterCondition5){
                    tax += 25;
                }
                taxable_increment+=100
            }    
        }   
        console.log(tax);      
        res.json(tax)
    })

    //console.log(tax)
    //res.json( tax );
}) 

app.get('/incVariables', (req, res) => {
    incomeTaxVariables_model.find()
    .then(variables_li => res.json(variables_li[0]))
    .catch( err => res.json(err) )
})

app.put('/incUpdate', (req,res) => {
    const id = "6555baf90a5c355a6f1db3ac"
    incomeTaxVariables_model.findByIdAndUpdate({_id:id}, {
        maleCondition1: req.body.maleCond1,
        maleCondition2: req.body.maleCond2,
        maleCondition3: req.body.maleCond3,
        maleCondition4: req.body.maleCond4,
        maleCondition5: req.body.maleCond5,
        femaleCondition1: req.body.femaleCond1,
        femaleCondition2: req.body.femaleCond2,
        femaleCondition3: req.body.femaleCond3,
        femaleCondition4: req.body.femaleCond4,
        femaleCondition5: req.body.femaleCond5,
        fighterCondition1: req.body.fighterCond1,
        fighterCondition2: req.body.fighterCond2,
        fighterCondition3: req.body.fighterCond3,
        fighterCondition4: req.body.fighterCond4,
        fighterCondition5: req.body.fighterCond5
        })
    .then( res.json("Updated") )
    .catch(err => res.json(err))
})
///////////////////////////////////


app.post('/calculateLandTax', (req, res) => {
    const { landOrigin, acres, landType } = req.body;

    let val = 0;

    if (landOrigin === "Ka") {
        if (landType === "residential") val = (acres / 100) * 60;
        else if (landType === "commercial") val = (acres / 100) * 300;
        else if (landType === "industrial") val = (acres / 100) * 150;
    } else if (landOrigin === "Kha") {
        if (landType === "residential") val = (acres / 100) * 50;
        else if (landType === "commercial") val = (acres / 100) * 250;
        else if (landType === "industrial") val = (acres / 100) * 150;
    } else if (landOrigin === "Ga") {
        if (landType === "residential") val = (acres / 100) * 40;
        else if (landType === "commercial") val = (acres / 100) * 200;
        else if (landType === "industrial") val = (acres / 100) * 125;
    } else if (landOrigin === "Gha") {
        if (landType === "residential") val = (acres / 100) * 20;
        else if (landType === "commercial") val = (acres / 100) * 100;
        else if (landType === "industrial") val = (acres / 100) * 75;
    } else if (landOrigin === "Umo") {
        if (landType === "residential") val = (acres / 100) * 15;
        else if (landType === "commercial") val = (acres / 100) * 60;
        else if (landType === "industrial") val = (acres / 100) * 40;
    } else if (landOrigin === "Cha") {
        if (landType === "residential") val = (acres / 100) * 10;
        else if (landType === "commercial") val = (acres / 100) * 40;
        else if (landType === "industrial") val = (acres / 100) * 30;
    }

    res.json({ taxValue: val });
});




mongoose.connect("mongodb+srv://TaxCalculator_admin:admin1234@database-api.sassvmz.mongodb.net/TaxCalculator_DB?retryWrites=true&w=majority")
.then(()=> {
    console.log("connected to MongoDB")
})
.catch((error) =>{
    console.log(error)
})


const port = 5000
app.listen(port, ()=> { 
    console.log(`Server is running in port ${port}`) 
})
