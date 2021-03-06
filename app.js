/*
const btnSubmit    = document.querySelector("#btnSubmit");
const formElements = document.querySelector("#studentForm").elements;
const tableStudent = document.querySelector("#tableStagiaires > tbody");
*/

let btnSubmit = undefined; // document.querySelector("#btnSubmit");
let formElements = undefined; // document.querySelector("#studentForm").elements;
let tableStudent = undefined; // document.querySelector("#tableStagiaires > tbody");

let exportDataBtn = undefined;

let divInfoStagiaire = undefined;

console.log("in js");

class Student {
  constructor(id, nom, prenom, email, etude, bio) {
    this.id = Math.round(Math.random().toString() * 1000000000);
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.etude = etude;
    this.bio = bio;
  }
}

const formFielsArray = ["nom", "prenom", "email", "etude", "bio"];

////////////////////////////

let form2Student = (currentFormElt) => {
  const student = new Student();
  formFielsArray.forEach((aField) => {
    student[aField] = currentFormElt[aField].value;
  });
  return student;
};

class FormFieldValidator {
  static nomMinChar = 2;
  static nomMaxChar = 50;

  static prenomMinChar = 2;
  static prenomMaxChar = 50;

  static bioMinChar = 2;
  static bioMaxChar = 50;

  static nomValidation(nom) {
    nom = nom.replace(/\s/g, '');
    return nom.length >= this.nomMinChar && nom.length <= this.nomMaxChar;
  }

  static prenomValidation(prenom) {
    prenom = prenom.replace(/\s/g, '');
    return (
      prenom.length >= this.prenomMinChar && prenom.length <= this.prenomMaxChar
    );
  }

  static emailValidation(email) {
    const validateAnEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    return validateAnEmail(email);
  }

  static etudeValidation(etude) {
    console.log(etude);
    return etude != "Choisir votre niveau d'??tude";
  }

  static bioValidation(bio) {
    bio = bio.replace(/\s/g, '');
    return bio.length >= this.bioMinChar && bio.length <= this.bioMaxChar;
    //return true; //bio != "";
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

let showIncorrectField = (incorrectFieldName, currentFormElt) => {
  const incorrectFielMessage = {
    nom: "Veuillez saisir un nom correct",
    prenom: "Veuillez saisir un pr??nom correct",
    email: "Veuillez saisir un email correct",
    etude: "Veuillez choisir le niveau d'??tude",
    bio: "Veuillez saisir une bio correcte",
  };

  formFielsArray.forEach((element) => {
    const isInvalide = incorrectFieldName.includes(element) 
    document.querySelector("#" + element + "Err").innerText =
     isInvalide ? incorrectFielMessage[element] : "";

     if(isInvalide){
       currentFormElt[element].classList.remove("is-valid" );
       currentFormElt[element].classList.add( "is-invalid" );
     }else{
       currentFormElt[element].classList.remove("is-invalid" );

      if(incorrectFieldName.length != 0 ){
        currentFormElt[element].classList.add("is-valid");
      }else{
        currentFormElt[element].classList.remove("is-valid" );
      }
       
     }

   
  });
};

let emptyForm = (currentFormElt) => {
  formFielsArray.forEach((aField) => {
    currentFormElt[aField].value = "";
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
    delete this.data[params.id];
    this._setAll();

    return true;
  }

  update(params) {}

  exporteData(){
    this.data = this.getAll();

    const rows = [ ["id", "nom", "prenom", "email", "etude", "bio"] ];
    Object.getOwnPropertyNames(this.data).forEach((id) =>{
      rows.push(  [id, this.data[id]["nom"], this.data[id]["prenom"], this.data[id]["email"], this.data[id]["etude"], this.data[id]["bio"]  ])
    })

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });


      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "liste_stagiaires.csv");
      document.body.appendChild(link); 
      link.click();

  }

}

////////////////////////***** fin database

function onClickSubmitForm(formElements) {
  const isValideForm = FormFieldValidator.validateAll(formElements);

  if (isValideForm.length == 0) {
    const student = form2Student(formElements);

    //save new User
    currentDB.add(student);

    emptyForm(formElements);
    showIncorrectField(isValideForm, formElements);

    var modalStagiaire = new bootstrap.Modal(
      document.getElementById("modalStagiaire")
    );

    modalStagiaire.toggle()

    
  } else {
    showIncorrectField(isValideForm, formElements);
  }
}

//////////// table student

let showCurentStudent = (aStudent) => {
  const info2show = `<p> <h4> ${aStudent.prenom} ${aStudent.nom}</h4> <br> <b>Email :  ${aStudent.email}</b><br> 
    <b> ??tudes faites :</b> ${aStudent.etude}<br> <b>Bio : </b>${aStudent.bio} </p>`;
  divInfoStagiaire.innerHTML = info2show;
};

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
  boutonVoir.setAttribute("type", "button");
  boutonVoir.classList.add("btn", "btn-primary");
  boutonVoir.addEventListener("click", function () {
    showCurentStudent(aStudent);
  });

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.innerText = "Supprimer";
  boutonSupprimer.setAttribute("type", "button");
  boutonSupprimer.classList.add("btn", "btn-danger");
  boutonSupprimer.addEventListener("click", function () {
    dataRow.remove();
    //this.parentElement.parentElement.remove();
    currentDB.delete(aStudent);
  });

  const action = document.createElement("td");
  const div = document.createElement("div");
  div.append(boutonVoir, boutonSupprimer);
  action.append(div);

  value2Show.push(action);

  dataRow.append(...value2Show);
  tableStudent.appendChild(dataRow);
};

let initStudentTable = () => {
  const storedStudent = currentDB.getAll();

  Object.getOwnPropertyNames(storedStudent).forEach((id) => {
    addRow2tableStudent(storedStudent[id]);
  });
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

  exportDataBtn = document.querySelector("#exportBtn")

    exportDataBtn.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("on btn export");

    currentDB.exporteData();


    
  });


  initStudentTable();
  console.log("on list students");
}

