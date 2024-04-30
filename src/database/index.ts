import { DataSource } from "typeorm";

// configuraçao do banco de dados eh dada por aqui
export const AppDataSource = new DataSource({
    type : "sqlite",
    database : "./src/database/db.sqlite",
    entities: [
        "./src/database/entities/*.{ts,js}"
    ],
    migrations : [
        "./src/database/migrations/*.ts"
    ],
    // synchronize : true // nao use synchronize, da sempre ruim 
})


// inciando banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log("Data source typeorm initialized!");
    })
    .catch((err) => {
        console.error("Error on data source typeorm intialization ", err);
    })
