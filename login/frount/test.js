export async function tt(){
    await console.log("i am naresh");
}
// Insert data into a table
export async function insertData(us,pass) {
    console.log("test match");
    const query = 'INSERT INTO public."Authentication" (username, password) VALUES ($1, $2)';
    const values = [us, pass];
}