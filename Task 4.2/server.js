const { MongoClient } = require("mongodb");
 
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";
 
async function insertBook() {
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB server
        await client.connect();
 
        // Access the database and collection
        const db = client.db("LibraryDB");
        const collection = db.collection("books");
 
        const books = [
            { title: "1984", author: "George Orwell", genre: "Dystopian", price: 12.99 },
            { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", price: 10.99 },
            { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", price: 14.99 }
        ];
       
 
        // Insert the data
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
    } catch (err) {
        console.error('Error inserting books:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}
 
async function updateBookPrice() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const booksCollection = db.collection("books");

        // Update the price of "1984"
        const result = await booksCollection.updateOne(
            { title: "1984" },
            { $set: { price: 15.99 } }
        );
        console.log(`Matched ${result.matchedCount} and updated ${result.modifiedCount} document.`);
    } catch (err) {
        console.error('Error updating book price:', err);
    } finally {
        await client.close();
    }
}
 
async function deleteBook() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const booksCollection = db.collection("books");

        // Delete a book by title
        const result = await booksCollection.deleteOne({ title: "1984" });
        console.log(`Deleted ${result.deletedCount} document.`);
    } catch (err) {
        console.error('Error deleting book:', err);
    } finally {
        await client.close();
    }
}

async function fetchBooksByGenre() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const booksCollection = db.collection("books");

        // Fetch all fiction books
        const books = await booksCollection.find({ genre: "Fiction" }).toArray();
        console.log('Fiction books:', books);
    } catch (err) {
        console.error('Error fetching books:', err);
    } finally {
        await client.close();
    }
}

async function fetchAllBooks() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const booksCollection = db.collection("books");

        const allBooks = await booksCollection.find().toArray();
        console.log("All books:", allBooks);
    } catch (err) {
        console.error('Error fetching all books:', err);
    } finally {
        await client.close();
    }
}


// async function wipeDatabase() {
//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB server
//         await client.connect();

//         // Access the database you want to wipe
//         const db = client.db("LibraryDB");

//         // Drop (delete) the entire database
//         const result = await db.dropDatabase();

//         if (result) {
//             console.log("Database 'LibraryDB' wiped successfully.");
//         }
//     } catch (err) {
//         console.error("Error wiping the database:", err);
//     } finally {
//         // Close the connection
//         await client.close();
//     }
// }

// // Run the function to wipe the database
// wipeDatabase();
 
async function main() {
    // Insert books
    await insertBook();
    
    // Fetch all books
    await fetchAllBooks();

    // Update a book price
    await updateBookPrice();

    // Fetch all books after the update
    await fetchAllBooks();

    // Delete a book
    await deleteBook();

    // Fetch all books after deletion
    await fetchAllBooks();

    // Fetch all books by genre
    await fetchBooksByGenre();
}

main();
