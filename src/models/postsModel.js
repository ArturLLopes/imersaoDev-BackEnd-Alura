//codigo para conectar ao banco
import 'dotenv/config'; 
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
export async function getTodosPosts() {
    const db = conexao.db("imersao-DevAlura");
    const colecao = db.collection("posts");
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-DevAlura");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-DevAlura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); // Converte o ID em um objeto ObjectId que o mongo entenda
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost })
}