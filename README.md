# STOREAPI

- É uma API que simula uma pequena loja. Foi criado para solidificar os conceitos aprendidos.
- Ela permite criar os funcionários, que são divididos entre Gerente e Vendedor.
- Podemos adicionar fotos para os nosso funcionários.
- Também podemos criar produtos.
- Os dados são salvos no banco de dados MYSQL.
- Foi usado o SEQUELIZE como ORM.

## Tecnologias

- Neste projeto foi utilizado: EXPRESS, MYSQL.

### Funcionalidades

- [x] Criar/Atualizar/Deletar/Buscar funcionários.
- [x] Criar/Atualizar/Deletar/Buscar produtos.
- [x] Adicionar uma imagem referente a cada usuário.
- [x] Criar TOKEN para autenticação.
- [x] Exigir o TOKEN para a CRIAÇÃO/ATUALIZAÇÃO/DELEÇÃO.
- [x] Validar o CPF passado no momento da criação.
- [x] Permitir a DELEÇÃO de funcionários, somente para os GERENTES.

#### Aprendizado

- Com este projeto tive a oportunidade de aprender mais sobre:
  - Middlewares.
  - Autenticação JWT.
  - Integração com Banco de Dados.
  - Criação e configuração de Chave Estrangeira.
  - Upload de Imagem (MULTER).
  - Utilização da função HASH para armazenar a senha no Banco de Dados (bcryptjs).

- Neste projeto coloquei em prática a Arquitetura MVC, apesar de não ter usado as VIEWS, aprendi na prática como essa arquitetura funciona, separando totalmente os MODELS e os CONTROLLERS.
  - Models -> Onde é feita a comunicação com o Banco de dados.
  - Controllers -> Onde se encontra a lógica das nossas rotas.

