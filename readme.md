# 🤖 Neura Assistente — Beta V1

O **Neura Assistente** é um projeto experimental de assistente pessoal que aprende com o usuário e automatiza tarefas do dia a dia.  
A versão Beta V1 é **focada em organização**, permitindo **criação, listagem, agendamento e remoção de tarefas** via API + front-end funcional.

> 🚧 O projeto está em desenvolvimento e será expandido com comandos por voz, reconhecimento personalizado e funções offline nas próximas versões.

---

## ✨ Funcionalidades da Beta V1

- ✅ Criar tarefas (com título, descrição, e data agendada)
- ✅ Listar tarefas salvas
- ✅ Deletar tarefas por ID
- ✅ Agendamento com notificações locais via terminal/API
- ✅ Interface visual mobile-first
- ✅ Notificações reais via Firebase (mesmo com o app fechado) **# em versão futura**
- ✅ API segura com variáveis de ambiente (.env) # em produção
- 🚀 Pronto para virar PWA

---

## 🧱 Tecnologias utilizadas

| Camada       | Ferramenta                  |
|--------------|-----------------------------|
| Back-end     | Node.js + Express           |
| Banco de dados | LowDB (JSON local)         |
| Agendador    | node-cron                   |
| Front-end    | HTML + CSS + JS + bootstrap |
|              | + sweetAlert (mobile first) |
| Notificações | Firebase Cloud Messaging (FCM) |
| Segurança    | dotenv + (futuras atualzações) |
| Deploy       | Render + vercel (✔)              |

---

##


---

## 📌 Observações

- 🔐 Os dados sensíveis (como URLs reais da API) são gerenciados via `.env` e não estão disponíveis publicamente.
- 🌐 Para uso externo, a comunicação é feita via proxy configurado, protegendo a API real.

---

## 📲 Próximas metas

- [ ] Comandos por voz
- [ ] Login e identificação do usuário
- [ ] Notificações  (via FMC firebase)
- [ ] Interface reativa com Vue ou React
- [ ] Autenticação e segurança na Api

---

## 💡 Contribuições

Este é um projeto experimental e pessoal, mas contribuições e feedbacks são bem-vindos!  
Sinta-se à vontade para acompanhar o projeto, sugerir melhorias ou até mesmo fazer parte da construção do Neura Assistente. Qualquer ideia, contribuição ou pull request será muito bem-vinda!

---

## 🧠 Autor

Feito com dedicação por **Eduardo**  
🔗 GitHub: [@Edu-devCodes](https://github.com/Edu-devCodes)

