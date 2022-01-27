

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
    return true;
  }

  static prenomValidation(prenom) {
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



class MySGBD{
  constructor(dataName = "poeProject"){
    this.dataName = dataName;
    this.monStockage = localStorage;
    this.data = {}; // {student0_ID :student0, student1_ID:student1......, studentn_ID:studentn}
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

}









btnSubmit.addEventListener("click", (event)=>{
  event.preventDefault();

  console.log(formElements);

console.log( FormFieldValidator.validateAll(formElements));

formFielsArray.forEach ((elt) =>{console.log( formElements[elt].value  )});

  //let student = form2Student(formElements);
 // console.log(student);
})

