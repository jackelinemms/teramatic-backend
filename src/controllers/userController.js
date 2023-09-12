import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

//RESPONSÁVEL POR GERENCIAR A REQUISIÇÃO E RESPOSTA
//essa funcao vai retornar uma resposta status 200 - tudo ok, se tiver tudo ok

/* const getAll = (req, res) => {
  console.log("BATER NA ROTA OLÁ MUNDO!!"); //essa resposta vai aparecer no nosso terminal
  res.status(200).send({
    message: "Resposta 200 (tudo ok)!!", //essa resposta vai aparecer no nosso cliente. o meu cliente vai fazer uma requisicao, ela vai chegar na minha api, a api vai processar essa requisicao e vai enviar uma resposta
  });
}; */

//função assincrona pra esperar ele primeiro conectar ao banco
//READ - lê o banco de dados e retorna os dados pedidos
const getAll = async (req, res) => {
  const users = UserSchema.find(function (err, users) {
    //query no banco de dados que retorna todos os usuarios. Ele acessa meu userSchema e faz um find e isso pode ser enviado como resposta
    if (err) {
      res.status(500).send({ message: err.message }); //se achar algum erro retorna um status de erro
    }
    res.status(200).send(users);
  });
};

//CREATE - criar um novo usuário
//funcao assincrona porque precisamos que o JS espere que o usuario seja salvo no banco, pro caso de dar algum erro, antes de prosseguir com a leitura do codigo
const createUser = async (req, res) => {
  //codigo pra hasherizar a senha, o primeiro parametro pega o objeto password do corpo da requisição e o segundo parametro define o nivel de complexidade do hash, que geralmente é usado entre 8 e 10
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  //aí pega essa senha já hasherizada e reatribui esse valor ao password que estamos cadastrando
  req.body.password = hashedPassword;

  try {
    //acessar as informacoes do usuario (vem do body)
    //acessar o body da request (corpo da requisicao, sem os headers)
    const newUser = new UserSchema(req.body);

    //salvar usuario no banco de dados
    //usar algum metodo do mongoose para salvar o usuario no banco
    const savedUser = await newUser.save();

    //enviar a resposta da requisicao
    res.status(201).send({
      message: "Usuário cadastrado com sucesso",
      statusCode: 201,
      data: savedUser,
    });
  } catch (e) {
    console.error(e);
  }
};

//PATCH - atualizar usuário
const updateUser = async (req, res) => {
  try {
    //atualizar o documento / essa eh uma funcao ja do mongoose
    //acessar o id a ser atualizado / aqui ele vai conectar o id que ele vai puxar dos parametros e vai conectar com o id que esta na rota definida em userRoutes
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    //enviar a resposta
    res.status(200).send({
      message: "Usuário atualizado com sucesso",
      statusCode: 200,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error(error);
  }
};

// DELETE

const deleteUser = async (req, res) => {
  try {
    //achar o usuario pelo id e deletar o usuario
    await UserSchema.findByIdAndDelete(req.params.id);
    //enviar resposta
    res.status(200).send({
      message: "Usuário deletado com sucesso",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAll,
  createUser,
  updateUser,
  deleteUser,
};
