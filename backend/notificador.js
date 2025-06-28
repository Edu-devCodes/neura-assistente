const cron = require('node-cron'); 
const fs = require('fs'); 
const path = require('path'); 
 
const tarefasPath = path.join(__dirname,'data/tarefas.json'); 
 
// A cada 1 minuto
cron.schedule('*/1 * * * *', () => {
    const dataAtual = new Date();
    const tarefas = JSON.parse(fs.readFileSync(tarefasPath,'utf-8'));

    tarefas.forEach(tarefa => {
        if (tarefa.agendarPara) {
            const horaAgendada = new Date(tarefa.agendarPara);

            if (
                dataAtual.getFullYear() === horaAgendada.getFullYear()
                && dataAtual.getMonth() === horaAgendada.getMonth()
                && dataAtual.getDate() === horaAgendada.getDate()
                && dataAtual.getHours() === horaAgendada.getHours()
                && dataAtual.getMinutes() === horaAgendada.getMinutes()
            ) {
                console.log(`Notificação: ${tarefa.titulo} - ${tarefa.descricao}`);
            }
        }
    });
});
