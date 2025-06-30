if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service Worker registrado com sucesso:', reg.scope);
      })
      .catch(err => {
        console.error('Falha ao registrar o Service Worker:', err);
      });
  });
}


class MobileNavbar {
    constructor(mobileMenuSelector, navListSelector, navLinksSelector) {
        this.mobileMenu = document.querySelector(mobileMenuSelector);
        this.navList = document.querySelector(navListSelector);
        this.navLinks = document.querySelectorAll(navLinksSelector);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Menu clicado");
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener("click", this.handleClick);
        }
    }

    init() {
        if (this.mobileMenu && this.navList) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobileMenu",
    ".navlist",
    ".navlist li"
);

mobileNavbar.init();



// ----------- SE COMUNICANDO A MINHA API -------------

// botão do modal
const btnModal = document.getElementById('modalBtn');

// Listener único para salvar ou editar
btnModal.addEventListener('click', () => {
    const modo = btnModal.getAttribute('data-mode');
    const dados = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        agendarPara: document.getElementById('agendar').value,
        status: document.getElementById('status').value
    };

    const dadosValidados = validarValues(
        dados.titulo, dados.descricao, dados.agendarPara
    );


    if (!dadosValidados) return; // Se dados inválidos, sai

    if (modo === 'salvar') {
        salvarTasks(dados);

    } else if (modo === 'editar') {
        const id = btnModal.getAttribute('data-editing-id');
        UpdateTaks(id, dados);
    }
});


// Função para abrir modal em modo adicionar (limpa tudo)
const abrirModalAdicionar = () => {
    btnModal.setAttribute('data-mode', 'salvar');
    btnModal.removeAttribute('data-editing-id');
    btnModal.textContent = "Salvar";

    document.getElementById('modalTarefaLabel').textContent = "Nova Tarefa";

    ['titulo', 'descricao', 'agendar',].forEach(id => {
        document.getElementById(id).value = "";
    });
};


// Função para abrir modal em modo editar (preenche campos e seta id)
const abrirModalEditar = (data) => {
    btnModal.setAttribute('data-mode', 'editar');
    btnModal.setAttribute('data-editing-id', data.id);
    btnModal.textContent = "Editar";

    document.getElementById('modalTarefaLabel').textContent = "Atualizando Task";

    document.getElementById('titulo').value = data.titulo;
    document.getElementById('descricao').value = data.descricao;
    document.getElementById('agendar').value = data.agendarPara;
    document.getElementById('status').value = data.status;


};


// Botão para abrir modal adicionando nova tarefa
const btnSaveTasks = document.getElementById('btnSaveTasks');
btnSaveTasks.addEventListener('click', abrirModalAdicionar);

// ** minha api **//
const apiUrl = 'https://neura-assistente.onrender.com'

const LoadTasks = async () => {
    const api = await fetch(`${apiUrl}/tarefas`);
    const data = await api.json();
    return data;
}


const CreateElements = (data) => {
    const container = document.querySelector('.container');
    const divCard = document.createElement('div');
    divCard.classList.add("card")

    const divStatus = document.createElement('div');
    divStatus.classList.add("card-idStatus");

    const divId = document.createElement('div');
    divId.classList.add("id");
    divId.textContent = ("ID " + data.id);

    const statusSpan = document.createElement('div');
    statusSpan.classList.add("tag");
    statusSpan.textContent = data.status.toUpperCase();

    const divCardotop = document.createElement('div');
    divCardotop.classList.add("card-top")

    const title = document.createElement('h3');
    title.classList.add("title");
    title.textContent = data.titulo;

    const description = document.createElement('p');
    description.classList.add("descricao");
    description.textContent = data.descricao

    const divDate = document.createElement('div')
    divDate.classList.add("date")
    divDate.textContent = data.agendarPara;

    const botons = document.createElement('div')
    botons.classList.add("card-botton");

    const editBtn = createIconButton('edit-button', 'bi bi-pencil');
    editBtn.addEventListener('click', () => {
    abrirModalEditar(data); // Abre modal no modo editar e preenche dados
    });
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#modalTarefa");


    const deleteBtn = createIconButton('delete-button', 'bi bi-trash3');
    deleteBtn.addEventListener('click', () => deleteTaskInfo(data));



    container.appendChild(divCard);
    divCard.appendChild(divStatus);
    divStatus.appendChild(divId);
    divStatus.appendChild(statusSpan);
    divCard.appendChild(divCardotop)
    divCardotop.appendChild(title);
    divCard.appendChild(description);
    divCard.appendChild(divDate);
    divCard.appendChild(botons);
    const divBottom = document.createElement('div');
    divBottom.className = 'card-bottom';

    divBottom.appendChild(editBtn);
    divBottom.appendChild(deleteBtn);
    divCard.appendChild(divBottom);
}


function createIconButton(className, iconClass) {
    const button = document.createElement('button');
    button.className = className;

    const icon = document.createElement('i');
    icon.className = iconClass;

    button.appendChild(icon);

    return button;
}

LoadTasks().then(tasks => {
    tasks.forEach(task => CreateElements(task));
});


function validarValues(titulo, descricao, agendarPara, status) {
    // validação de campos vazios
    if (!titulo || titulo.trim() === "" ||
        !descricao || descricao.trim() === "" ||
        !agendarPara || agendarPara.trim() === "") {

        Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "Preencha todos os campos!",
        });
        return false; // invalido
    } else {
        return true; // válido
    }
};

const salvarTasks = async (dados) => {
    await fetch(`${apiUrl}/tarefas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(() => {
            beforeSave();
        })
        .catch(error => console.error('Erro:', error));
};


function deleteTaskInfo(data) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTask(data)
        }
    });
}

const deleteTask = async (data) => {
    const urlApidelete = await fetch(`${apiUrl}/tarefas/${data.id}`, {
        method: 'DELETE',
    });
    if (urlApidelete.ok) {
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
        afterActions();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
}


const UpdateTaks = async (id, dadosUpd) => {
    const updtaApi = await fetch(`${apiUrl}/tarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUpd)
    });

    if (updtaApi.ok) {
        console.log("Tarefa atualizada com sucesso");
        beforeSave();
    } else {
        console.error("Erro ao atualizar tarefa");
    }
};


function beforeSave() {
    document.getElementById("formTarefa").reset();

    const modalElement = document.getElementById('modalTarefa');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    afterActions();
}

const afterActions = () => {
    // limpa tasks antigas
    const container = document.querySelector('.container');
    container.innerHTML = '';

    // recarrega as tasks
    LoadTasks().then(tasks => {
        tasks.forEach(task => CreateElements(task));
    });
};
