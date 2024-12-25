import pool from './postgres.js';

// ------------------Insert data-------- into a table--------------
export async function insertData(us,pass) {
    try 
    {
        const Hash_p=hashpass(pass);
        const query = 'INSERT INTO public."Authentication" (username, password,hashed_pass) VALUES ($1, $2, $3)';
        const values = [us, pass ,Hash_p];
        await pool.query(query, values);
        console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err.message);
    }
}

// ----------------Fetch all data -----------from a table----------------
export async function fetchDataAll() {
    try {
        const result1 = await pool.query('SELECT * FROM public."Authentication"');
console.log(result1.rows);
// const password = result1.rows[1].password;
        return result1.rows;
    } catch (err) {
        console.error('Error fetching data:', err.message);
    }
}

//-----------------fetch -----only single ------required data-----------------------
export async function fetchData(us) {
    try 
    {
        const query = 'SELECT username,hashed_pass FROM public."Authentication" WHERE username = $1';
        const values = [us]; // Array of parameterized values
        const result = await pool.query(query, values);
        if (!result.rows || result.rows.length === 0) {
            throw new Error('No rows returned from the database');
        }
        const temp_pass= await result.rows[0].hashed_pass;
        const temp_us=await result.rows[0].username;
        console.log(" -----> "+result.rows[0].hashed_pass);
        return [temp_us,temp_pass]; // Return the fetched data
    } catch (error) 
    {
        console.error('Error fetching data:', error.message);
        return null; // Or throw error to let the caller handle it
    }
}

// -------------------Function to delete ------a record by username and password--------
export async function deleteData(username, password) {
    const query = `DELETE FROM public."Authentication" WHERE username = $1 AND password = $2`;
    try {
        const res = await pool.query(query, [username, password]);
        console.log(`Deleted ${res.rowCount} record(s).`);
    } catch (err) {
        console.error('Error deleting record:', err.message);
    }
}

// Example usage
// insertData('poop','123');
// insertData('nari22','1234');
// fetchData('poop'); 
fetchDataAll();
// deleteData('testUser', '123');


// ---------------Hashing the Password---------------

// const crypto = require('crypto'); // Ensure this line is at the top of your file
import crypto from 'crypto';

export function hashpass(valueToBeHashed){
    const stage1 = crypto.createHash('sha256').update(valueToBeHashed).digest('hex');
    const hashed_pass=crypto.createHash('sha256').update(stage1).digest('hex');
    console.log("Original Password : "+valueToBeHashed);
    console.log("Hashed password is : "+hashed_pass);
    return hashed_pass;
}
// hashpass('maheshp');
// hashpass('beb07467641f55b833ffcc20b7f45ffb50d08d145f1a4b45b06b2b1f859de221');
// ----------------End Hashing the Password-------------