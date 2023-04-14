let send = document.getElementById("boton-Ingreso"),
    inputName = document.getElementById("input-name"),
    inputCell = document.getElementById("input-cell");

send.addEventListener('click', function() {
    let urlUser = "../User/index.html";
    let cell;

    if (/^[a-z]+$/i.test(inputName.value)) {
        if (/^(\d{4}?)+(-)(\d{4}?)+$/i.test(inputCell.value) || /^\d{8}?$/i.test(inputCell.value) || /^(\d{4}?)\s(\d{4}?)+$/i.test(inputCell.value)) {

            if ((inputCell.value).indexOf('-') > -1) {
                cell = (inputCell.value).replace('-', '');
                axios.post('http://localhost:3000/login', { name: inputName.value, cell: cell })
                    .then((result => {
                        if (result.data == true) {
                            alert('El nombre o celular ya existen');
                            inputCell.value = "";
                            inputName.value = "";
                            inputCell.focus();
                            inputName.focus();
                        } else {
                            window.location.href = urlUser + `?id=${result.data.id}`;
                        }
                    }));
            } else if ((inputCell.value).indexOf(' ') > -1) {
                cell = (inputCell.value).replace(' ', '');
                axios.post('http://localhost:3000/login', { name: inputName.value, cell: cell })
                    .then((result => {
                        console.log(`result ${result}`);
                        if (result.data == true) {
                            alert('El nombre o celular ya existen');
                            inputCell.value = "";
                            inputName.value = "";
                            inputCell.focus();
                            inputName.focus();
                        } else {
                            window.location.href = urlUser + `?id=${result.data.id}`;
                        }
                    }));

            } else {
                axios.post('http://localhost:3000/login', { name: inputName.value, cell: inputCell.value })
                    .then((result => {
                        console.log(`result ${result}`);
                        if (result.data == true) {
                            alert('El nombre o celular ya existen');
                            inputCell.value = "";
                            inputName.value = "";
                            inputCell.focus();
                            inputName.focus();
                        } else {
                            window.location.href = urlUser + `?id=${result.data.id}`;
                        }
                    }));
            }

        } else {
            inputCell.value = "";
            inputCell.focus();
        }
    } else {
        inputName.value = "";
        inputName.focus();
        alert('Ingrese solamente letras en su nombre');
    }
});