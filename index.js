const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const SchoolModel = require('./models/School');
const DormModel = require('./models/Dorm');
const StudentModel = require('./models/Student');
const ReviewModel = require('./models/Review');

app.use(express.json());
app.use(cors());

// change 'USERNAME' to your username for mongoDB Atlas
// change 'PASSWORD' to your password for mongoDB Atlas
mongoose.connect("mongodb+srv://USERNAME:PASSWORD@soba-cluster.bngzh.mongodb.net/school?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

/****** DORM ******/
// localhost:3001/dorm/new
// this route inserts a DUMMY entry into the dorm collection
app.get("/dorm/dummy", async (req, res) => {
    res.send("Hello World from index.js");
    const dorm = new DormModel({
        dorm_name: "test",
        dorm_amenities: ["wifi", "gym", "pool"],
        dorm_img_url: "https://www.soba.com/wp-content/uploads/2019/01/soba-dorm-1.jpg",
        dorm_room_plan: ["1 bedroom", "2 bedrooms", "3 bedrooms"],
        dorm_room_types: ["single", "double", "triple"],
    });

    try {
        await dorm.save();
    } catch (error) {
        console.log(error);
    }
});

// localhost:3001/school/new
// INSERT an entry into the dorm collection
app.post('/dorm/insert', async (req, res) => {
    const dorm_name = req.body.dorm_name;
    const dorm_amenities = req.body.dorm_amenities;
    const dorm_img_url = req.body.dorm_img_url;
    const dorm_room_plan = req.body.dorm_room_plan;
    const dorm_room_types = req.body.dorm_room_types;

    const dorm = new DormModel({
        dorm_name: dorm_name,
        dorm_amenities: dorm_amenities,
        dorm_img_url: dorm_img_url,
        dorm_room_plan: dorm_room_plan,
        dorm_room_types: dorm_room_types,
    });

    try {
        const result = await dorm.save();
        console.log(result);
        res.send("Successfully inserted into 'dorm' collection");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// localhost:3001/dorm/delete/:id
// DELETE an entry from the dorm collection
app.delete('/dorm/delete/:id', async (req, res) => {
    const id = req.params.id;
    await DormModel.deleteOne({_id: id});
    res.send("Successfully deleted");
});

// localhost:3001/read
// FIND all entries in the dorm collection
app.get('/read', async (req, res) => {
    try {
        const result = await DormModel.find();
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// localhost:3001/find/:id
// COUNT an entry in the dorm collection
app.get('/dorm/count', async (req, res) => {
    try {
        // const result = await DormModel.find().count();
        const result = DormModel.count({}, function(err, count){
            console.log( "Number of docs: ", count );
        });
        res.send(count);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/count', async (req, res) => {
    try {
        const result = await DormModel.count();
        res.json({result: result});
        console.log(result);
    }
    catch (err) {
        console.log(err);
        res.status(501).send(err);
    }
});


/********* DORM END *********/


/****** SCHOOL ******/
// localhost:3001/school/insert
// INSERT an entry into the school collection
app.post('/school/insert', async (req, res) => {
    const schoolName = req.body.school_name;
    const schoolAddress = req.body.school_address;

    const school = new SchoolModel({school_name: schoolName, school_address: schoolAddress});

    try {
        const result = await school.save();
        console.log(result);
        res.send("Successfully inserted into DB");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// localhost:3001/update
// UPDATE an entry in the school collection
// param: object
app.put('/school/update', async (req, res) => {
    const id = req.body.id;
    const newSchoolName = req.body.school_name;
    const newSchoolAddress = req.body.school_address;

    try {
        const result = await SchoolModel.updateOne(
            {_id: id},
            {school_name: newSchoolName},
            {school_address: newSchoolAddress});

        console.log(result);
        res.send("Successfully updated school info");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// localhost:3001/school/delete/:id
// DELETE an entry from the school collection
// param: _id
app.delete('/school/delete/:id', async (req, res) => {
    const id = req.params.id;
    await SchoolModel.deleteOne({_id: id});

    try {
        const result = await SchoolModel.deleteOne({_id: id});
        res.send("Successfully deleted student");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
/********* SCHOOL END *********/


/****** STUDENT ******/
// localhost:3001/student/insert
// INSERT an entry into the student collection
app.post('/student/insert', async (req, res) => {
    const student_name = req.body.name;
    const student_year = req.body.year;
    const student_gender = req.body.gender;
    const student_roommates = req.body.roommates;
    const student_num_roommates = req.body.numRoommates;
    const student_school = req.body.school;
    const student_points = req.body.points;
    const student_saved_dorms = req.body.savedDorms;

    console.log(student_name);
    console.log(student_points);

    const student = new StudentModel({
        name: student_name,
        year: student_year,
        gender: student_gender,
        roommates: student_roommates,
        num_roommates: student_num_roommates,
        school: student_school,
        points: student_points,
        savedDorms: student_saved_dorms
    });

    try {
        await student.save();
    } catch (error) {
        console.log(error);
    }
});

// localhost:3001/student/delete/:id
// DELETE an entry from the student collection
// param: _id
app.delete('/student/delete/:id', async (req, res) => {
    const id = req.params.id;
    await DormModel.deleteOne({_id: id});
    try {
        const result = await DormModel.deleteOne({_id: id});
        res.send("Successfully deleted student");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
/********* STUDENT END *********/


/****** REVIEW ******/
// localhost:3001/review/insert
// INSERT an entry into the review collection
// param: _id
app.delete('/review/delete/:id', async (req, res) => {
    const id = req.params.id;
    await ReviewModel.deleteOne({_id: id});
    try {
        const result = await ReviewModel.deleteOne({_id: id});
        res.send("Successfully deleted review");
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
/********* REVIEW END *********/




/****** PORT ******/
app.listen(3001, () => {
    console.log('Server is running on port 3001')
});
