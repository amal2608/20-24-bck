const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const packagedetailsmodel = require("./model/package");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DB Connection 
mongoose.connect("mongodb+srv://amalbabu2806:acpamal24@cluster0.pjnqcs6.mongodb.net/db1?retryWrites=true&w=majority")
    .then(() => { console.log("DB connected") })
    .catch(err => console.log(err));

// API creation
app.get('/', (request, response) => {
    response.send("Hai");
});


// Food Items save
app.post('/ptnew', upload.single('foodimage'), async (request, response) => {
    try {
        const { fdid, fdname, fdtype, price, pdescription, status } = request.body;
        const newFoodItem = new packagedetailsmodel({
    fdid,
    fdname,
    fdtype,
    price,
    pdescription,
    status,
    foodphoto:{
        data : Buffer,
        contentType:String,
    },
    
        });
        await newFoodItem.save();

        response.status(200).json({ message: 'Food item added successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Food Items edit
app.put('/ptedit/:id', upload.single('image'), async (request, response) => {
    try {
        const id = request.params.id;
        const { fdid, fdname, fdtype, pprice, pdescription, status } = request.body;
        let updatedData = {
            fdid,
            fdname,
            fdtype,
            pprice,
            pdescription,
            status,
        };
        if (request.file) {
            updatedData.image = {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            };
        }
        const result = await fooddetailsmodel.findByIdAndUpdate(id, updatedData);
        if (!result) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item updated successfully', data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Food Items view
app.get('/ptview', async (request, response) => {
    try {
        const foodItems = await fooddetailsmodel.find();
        response.status(200).json(foodItems);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Food Item status
app.put('/ptupdatestatus/:id', async (request, response) => {
    try {
        const id = request.params.id;
        await fooddetailsmodel.findByIdAndUpdate(id, { $set: { status: "INACTIVE" } });
        response.status(200).json({ message: 'Food item status updated successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete Food Item
app.delete('/ptdelete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deletedFoodItem = await fooddetailsschema.findByIdAndDelete(id);
        if (!deletedFoodItem) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});




// Stage Items save
app.post('/stnew', upload.single('image'), async (request, response) => {
    try {
        const { packid, packname, pprice, description, status } = request.body;
        const newFoodItem = new packagedetailsmodel({
            packid,
            packname,
            pprice,
            description,
            status,
            packimage: {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            }
        });
        await newFoodItem.save();

        response.status(200).json({ message: 'Stage item added successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Stage Items edit
app.put('/stedit/:id', upload.single('image'), async (request, response) => {
    try {
        const id = request.params.id;
        const { packid, packname, pprice, description, status } = request.body;
        let updatedData = {
            packid,
            packname,
            pprice,
            description,
            status,
        };
        if (request.file) {
            updatedData.image = {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            };
        }
        const result = await packagedetailsmodel.findByIdAndUpdate(id, updatedData);
        if (!result) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item updated successfully', data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Stage Items view
app.get('/stview', async (request, response) => {
    try {
        const stageItems = await packagedetailsmodel.find();
        response.status(200).json(stageItems);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update stage Item status
app.put('/stupdatestatus/:id', async (request, response) => {
    try {
        const id = request.params.id;
        await packagedetailsmodel.findByIdAndUpdate(id, { $set: { status: "INACTIVE" } });
        response.status(200).json({ message: 'Food item status updated successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete stage Item
app.delete('/stdelete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deletedFoodItem = await packagedetailsmodel.findByIdAndDelete(id);
        if (!deletedFoodItem) {
            return response.status(404).json({ message: 'Food item not found' });
        }
        response.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


// Assign port
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
