import mongoose from "mongoose";

//Schema para criar um novo usuario. ele esta basicamente organizando os tipos de dados que serao aceitos e se sao requeridos. isso depois eh esportado como users.
//a gente pode modelar de acordo com as necessidades do nosso projeto
const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },  
  { timestamps: true }
);
export default mongoose.model("user", userSchema);
