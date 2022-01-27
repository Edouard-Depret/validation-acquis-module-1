

const btnSubmit = document.querySelector("#btnSubmit");
const formElements = document.querySelector("#studentForm").elements;
const tableStudent = document.querySelector("#tableStagiaires");


class Student {
  constructor( id, nom, prenom, email, etude, bio){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.etude = etude;
        this.bio = bio;
  }
   
}




const formFielsArray = [
    "nom",
    "prenom",
    "email",
    "etude",
    "bio",
  ];



  let form2Student = (currentFormElt) => {

  const student = new Student();

  formFielsArray.forEach((aField)=>{

  student[aField] = currentFormElt[aField].value;
  });

  return student;

}


class FormFieldValidator {
  constructor() {
    this.nomMinChar = 2;
    this.nomMaxChar = 5;
  }

  static nomValidation(nom) {
      // to do
    return false;
  }

  static prenomValidation(prenom) {
      //to do
    return false;
  }

  static validateAll(currentFormElt) {
    const notValidate = [];

    formFielsArray.forEach((aField) => {
      try {
        const isValidated = this[aField + "Validation"](
          currentFormElt[aField].value
        );
        if (!isValidated) {
          notValidate.push(aField);
        }
      } catch {}
    });

    return notValidate;
  }
}



let showIncorrectField = (incorrectFieldName)=>{

    const incorrectFielMessage = {
        nom : "veuillez saisir un nom correct",
        prenom: "veuillez saisir un prenom correct",
        email : "email !!!",
        etude : "etude !!!",
        bio : "bio !!!",
    
    }

    incorrectFieldName.forEach(element => {
        document.querySelector("#"+element+"Err").innerText = incorrectFielMessage[element]
    });

}






//////// ********* DataBase

class MySGBD{
  constructor(dataName = "poeProject"){
    this.dataName = dataName;
    this.monStockage = localStorage;
    this.data = {}; // {student0_ID :student0, student1_ID:student1......, studentn_ID:studentn}

    this.__init__();
  }

  getAll(){
     this.data = JSON.parse(this.monStockage[this.dataName]);
     return this.data;
  }

  _setAll(){
      try{
        this.monStockage[this.dataName] =   JSON.stringify(this.data);
         return true;
      }catch{
          return false;
      }
         
  }

  add(params) {
    this.data = this.getAll();
    this.data[params.id] = params;
    this._setAll();
    return true;
  }

  update(params){

  }

  ___init__(){

  }

}


currentDB = new MySGBD()
////////////////////////***** fin database




function onClickSubmitForm(){

const isValideForm = FormFieldValidator.validateAll(formElements);

  if(isValideForm.length == 0 ){

    const student = form2Student(formElements);

    //currentDB
    


    

    
  }else{
        showIncorrectField(isValideForm);
  }
  

}




btnSubmit.addEventListener("click", (event)=>{
  event.preventDefault();

 console.log("in buttin");

 onClickSubmitForm();
  

  
})

