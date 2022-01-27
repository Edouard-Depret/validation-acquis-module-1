/*
const btnSubmit    = document.querySelector("#btnSubmit");
const formElements = document.querySelector("#studentForm").elements;
const tableStudent = document.querySelector("#tableStagiaires > tbody");
*/

let btnSubmit = undefined; // document.querySelector("#btnSubmit");
let formElements = undefined; // document.querySelector("#studentForm").elements;
let tableStudent = undefined; // document.querySelector("#tableStagiaires > tbody");

let divInfoStagiaire = undefined;

console.log("in js");

class Student {
  constructor(id, nom, prenom, email, etude, bio) {
    this.id = Math.random().toString();
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.etude = etude;
    this.bio = bio;
  }
}

const formFielsArray = ["nom", "prenom", "email", "etude", "bio"];

let form2Student = (currentFormElt) => {
  const student = new Student();

  formFielsArray.forEach((aField) => {
    student[aField] = currentFormElt[aField].value;
  });

  return student;
};

class FormFieldValidator {
  constructor() {
    this.nomMinChar = 2;
    this.nomMaxChar = 5;
  }

  static nomValidation(nom) {
    // to do
    return true;
  }

  static prenomValidation(prenom) {
    //to do
    return true;
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

let showIncorrectField = (incorrectFieldName) => {
  const incorrectFielMessage = {
    nom: "veuillez saisir un nom correct",
    prenom: "veuillez saisir un prenom correct",
    email: "email !!!",
    etude: "etude !!!",
    bio: "bio !!!",
  };

  incorrectFieldName.forEach((element) => {
    document.querySelector("#" + element + "Err").innerText =
      incorrectFielMessage[element];
  });
};

//////// ********* DataBase

class MySGBD {
  constructor(dataName = "poeProject") {
    this.dataName = dataName;
    this.monStockage = localStorage;
    this.data = {}; // {student0_ID :student0, student1_ID:student1......, studentn_ID:studentn}

    this._init();
  }

  _init() {
    try {
      this.getAll();
    } catch (error) {
      this._setAll();
    }

    return true;
  }

  getAll() {
    this.data = JSON.parse(this.monStockage[this.dataName]);
    return this.data;
  }

  _setAll() {
    try {
      this.monStockage[this.dataName] = JSON.stringify(this.data);
      return true;
    } catch {
      return false;
    }
  }

  add(params) {
    this.data = this.getAll();
    this.data[params.id] = params;
    this._setAll();
    return true;
  }

  delete(params) {
    this.data = this.getAll();
    //delete this.data[params.id];

    return true;
  }

  update(params) {}
}

////////////////////////***** fin database

function onClickSubmitForm(formElements) {
  const isValideForm = FormFieldValidator.validateAll(formElements);

  if (isValideForm.length == 0) {
    const student = form2Student(formElements);

    //save new User
    currentDB.add(student);
  } else {
    showIncorrectField(isValideForm);
  }
}

//////////// table student

let showCurentStudent = (aStudent) => {};

let addRow2tableStudent = (aStudent) => {
  const dataRow = document.createElement("tr");

  const field2show = ["nom", "prenom", "email"];

  const value2Show = field2show.map((elt) => {
    const aColumn = document.createElement("td");
    aColumn.innerText = aStudent[elt];
    return aColumn;
  });

  const boutonVoir = document.createElement("button");
  boutonVoir.innerText = "Voir";
 boutonVoir.classList.add("btn","btn-primary");
   boutonVoir.setAttribute('type', 'button');
  boutonVoir.addEventListener("click", function () {
    showCurentStudent(aStudent);
  });

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.innerText = "Supprimer";
  boutonSupprimer.classList.add("btn","btn-danger");
  boutonSupprimer.setAttribute('type', 'button');
  boutonSupprimer.addEventListener("click", function () {
    dataRow.remove();
    //this.parentElement.parentElement.remove();
    currentDB.delete(aStudent);
  });

  const action = document.createElement("td");
  action.append( boutonVoir, boutonSupprimer);

  value2Show.push(action);

  dataRow.append(...value2Show);
  tableStudent.appendChild(dataRow);
};

/////////////////////// Initialisation

currentDB = new MySGBD();

//on formulaire
try {
  btnSubmit = document.querySelector("#btnSubmit");
  formElements = document.querySelector("#studentForm").elements;

  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    onClickSubmitForm(formElements);
  });

  console.log("on formulaire");

  //on liste students
} catch {
  tableStudent = document.querySelector("#tableStagiaires > tbody");
  divInfoStagiaire = document.querySelector("#infoStagiaire");

  const aStudent = {
    id: "252666",
    nom: "hello",
    prenom: "world",
    email: "@email",
  };
  addRow2tableStudent(aStudent);

  console.log("on list students");
}
