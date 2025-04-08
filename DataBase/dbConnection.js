import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/task').then(() => {
        console.log('DataBase Connected!')   
        }).catch( (err) => {
            console.log('DataBase Failed To Connected!');
            
        })
}

