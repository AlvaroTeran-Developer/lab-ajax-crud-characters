const charactersAPI = new APIHandler();

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()
        .then((res) => {
          const charactersUL = document.querySelector(".characters-container");

          let charactersInfo = "";
          res.data.reverse().forEach((character) => {
            charactersInfo += `<div class="characters-container">
            <div class="character-info">
              <div class="name">Character Name:    ${character.name}</div>
              <div class="occupation">Character Occupation:    ${character.occupation}</div>
              <div class="cartoon">Is a Cartoon?    ${character.cartoon}</div>
              <div class="weapon">Character Weapon:    ${character.weapon}</div>
            </div>
          </div>`;
          });

          charactersUL.innerHTML = charactersInfo;
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const id = document.querySelector(".operation input").value;
      console.log(id);
      charactersAPI
        .getOneRegister(id)
        .then((res) => {
          const character = res.data;
          console.log(character);
          const charactersUL = document.querySelector(".characters-container");

          let charactersInfo = `<div class="characters-container">
            <div class="character-info">
              <div class="name">Character Name:    ${character.name}</div>
              <div class="occupation">Character Occupation:    ${character.occupation}</div>
              <div class="cartoon">Is a Cartoon?    ${character.cartoon}</div>
              <div class="weapon">Character Weapon:    ${character.weapon}</div>
            </div>
          </div>`;

          charactersUL.innerHTML = charactersInfo;
          document.querySelector(".operation input").value = "";
          scriptBot();
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const id = document.querySelector(".operation-delete input").value;
      charactersAPI
        .deleteOneRegister(id)
        .then((res) => {
          console.log(res);
          document.querySelector(".operation-delete input").value = "";
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("send-data2")
    .addEventListener("click", function (event) {
      const getCharacterInfoForm = document.querySelector(
        "#edit-character-form"
      );

      getCharacterInfoForm.onsubmit = (e) => {
        e.preventDefault();

        const id = getCharacterInfoForm.querySelector("input").value;
        charactersAPI
          .getOneRegister(id)
          .then((res) => {
            const editInputs = document.querySelectorAll(
              "#edit-character-form input"
            );
            editInputs[0].value = res.data.id;
            editInputs[1].value = res.data.name;
            editInputs[2].value = res.data.occupation;
            editInputs[3].value = res.data.weapon;
            editInputs[4].checked = res.data.cartoon;
          })
          .catch((err) => console.log(err));
      };
      const editCharacterForm = document.querySelector("#edit-character-form");

      editCharacterForm.onsubmit = (e) => {
        e.preventDefault();

        const editFormInputs = editCharacterForm.querySelectorAll("input");

        const id = editFormInputs[0].value;
        const name = editFormInputs[1].value;
        const occupation = editFormInputs[2].value;
        const weapon = editFormInputs[3].value;
        const cartoon = editFormInputs[4].checked;

        const info = { name, occupation, weapon, cartoon };

        console.log(info);

        charactersAPI
          .updateOneRegister(id, info)
          .then((res) => {
            getCharacterInfoForm.reset();
            editCharacterForm.reset();
            document.getElementById("send-data2").style.backgroundColor =
              "green";
          })
          .catch((err) => {
            document.getElementById("send-data2").style.backgroundColor = "red";
            console.log(err);
          });
      };
    });

  document
    .getElementById("send-data")
    .addEventListener("click", function (event) {
      const newCharacterForm = document.querySelector("#new-character-form");

      newCharacterForm.onsubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("#new-character-form input");

        const name = inputs[0].value;
        const occupation = inputs[1].value;
        const weapon = inputs[2].value;
        const cartoon = inputs[3].checked;

        console.log(cartoon);
        charactersAPI
          .createOneRegister({ name, occupation, weapon, cartoon })
          .then((res) => {
            newCharacterForm.reset();
            document.getElementById("send-data").style.backgroundColor =
              "green";
          })
          .catch((err) => {
            document.getElementById("send-data").style.backgroundColor = "red";
            console.log(err);
          });
      };
    });
});
