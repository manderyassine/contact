const mongoose = require('mongoose');
const { Contact } = require('./app.js');  // Import the Contact model from server.js
const dotenv = require('dotenv');
dotenv.config();

// MongoDB URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {serverSelectionTimeoutMS: 5000})
  .then(() => console.log('Connected to MongoDB for CRUD operations'))
  .catch((err) => console.log('MongoDB connection error:', err));

// 1. Create a contact
async function createContact(fullName, email, phoneNumber, birthdate) {
  try {
    const contact = new Contact({ fullName, email, phoneNumber, birthdate });
    await contact.save();
    console.log('Contact Created:', contact);
  } catch (err) {
    console.error('Error creating contact:', err.message);
  }
}

// 2. Read a contact by email
async function findContactByEmail(email) {
  try {
    const contact = await Contact.findOne({ email });
    if (contact) {
      console.log('Contact Found:', contact);
    } else {
      console.log('No contact found with that email');
    }
  } catch (err) {
    console.error('Error finding contact:', err.message);
  }
}

// 3. Update a contact by email
async function updateContactByEmail(email, updateFields) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { email },
      updateFields,
      { new: true, runValidators: true }
    );
    if (updatedContact) {
      console.log('Updated Contact:', updatedContact);
    } else {
      console.log('No contact found with that email');
    }
  } catch (err) {
    console.error('Error updating contact:', err.message);
  }
}

// 4. Delete a contact by email
async function deleteContactByEmail(email) {
  try {
    const deletedContact = await Contact.findOneAndDelete({ email });
    if (deletedContact) {
      console.log('Deleted Contact:', deletedContact);
    } else {
      console.log('No contact found with that email');
    }
  } catch (err) {
    console.error('Error deleting contact:', err.message);
  }
}


createContact('Mander yassine', 'manderyassine12@gmail.com', 25456282,20040507);
findContactByEmail('manderyassine12@gmail.com');
updateContactByEmail('manderyassine12@gmail.com', { phoneNumber: 21766272 });
deleteContactByEmail('manderyassine12@gmail.com');

