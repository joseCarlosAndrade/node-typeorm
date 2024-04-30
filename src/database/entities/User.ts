import { randomUUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') // nome da tabela que esta entidade fará referencia.
export class User{
    // de acordo com as colunas qeu a tabela users tem:

    @PrimaryGeneratedColumn() // coluna primaria da tabela users, gerada gerada pelo bd, nao por nos
    user_id : string
    
    @Column( { nullable : false}) // coluna que nao pode ser nula
    name : string

    @Column({ nullable : false, unique: true}) //coluna que nao pode ser nula nem repetir
    email : string

    @Column({ nullable : false}) // coluna que nao pode ser nula
    password : string

    constructor( // definindo construtor que atribui os dados pra cada entidade
        
        name: string,
        email : string,
        password : string
    ) {
        this.user_id = randomUUID(); // gerando um id aleatorio para cada usuario
        this.name = name;
        this.email = email;
        this.password = password;
    }
}