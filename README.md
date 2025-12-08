# Convite de Casamento Interativo em React

Este é um template de convite de casamento interativo construído com React e Vite. Ele permite que os noivos personalizem facilmente os detalhes do evento e forneçam um formulário de RSVP para os convidados.

## Estrutura do Projeto

O projeto é estruturado com componentes React, cada um com sua própria lógica e estilização:

- `src/App.jsx`: Componente principal que integra todos os outros.
- `src/Header.jsx`: Exibe os nomes dos noivos e a mensagem de convite.
- `src/EventDetails.jsx`: Detalhes da cerimônia e recepção (data, hora, local, links para mapas).
- `src/RSVPForm.jsx`: Formulário para os convidados confirmarem presença.
- `src/Footer.jsx`: Mensagem de agradecimento ou informações de contato.
- `src/App.css`, `src/index.css`, e arquivos `.css` para cada componente: Estilização do aplicativo.

## Como Usar

Siga os passos abaixo para configurar e personalizar seu convite de casamento.

### 1. Instalação das Dependências

Primeiro, você precisa instalar as dependências do projeto. Abra o terminal na pasta raiz do projeto (`convite-casamento`) e execute:

```bash
npm install
```

### 2. Personalização do Conteúdo

Todos os detalhes do convite podem ser personalizados editando os arquivos `.jsx` na pasta `src/`.

-   **Nomes dos Noivos e Mensagens Iniciais**: Edite `src/Header.jsx`.
    ```javascript
    <h1>[Nome do Noivo] & [Nome da Noiva]</h1>
    <p>Têm a honra de convidar para o seu casamento</p>
    ```
-   **Detalhes do Evento (Data, Hora, Locais, Mapas)**: Edite `src/EventDetails.jsx`. Substitua os placeholders `[Data do Casamento]`, `[Hora da Cerimônia]`, `[Nome do Local da Cerimônia]`, `[Endereço do Local da Cerimônia]`, e os links do Google Maps. Faça o mesmo para os detalhes da recepção.
    ```javascript
    <p><strong>Data:</strong> [Data do Casamento, ex: 15 de Maio de 2026]</p>
    <p><a href="[Link do Google Maps para a Cerimônia]" ...>Ver no Mapa</a></p>
    ```
-   **Data Limite do RSVP e Mensagens do Formulário**: Edite `src/RSVPForm.jsx`.
    ```javascript
    <p>Por favor, responda até [Data Limite do RSVP, ex: 1º de Abril de 2026]</p>
    ```
    **Nota:** O formulário de RSVP é apenas um template. Para que ele funcione de fato, você precisaria integrá-lo a um serviço de backend (como um formulário do Google Forms, um serviço de e-mail, ou um banco de dados). Atualmente, ele apenas exibe os dados no console do navegador.
-   **Mensagem do Rodapé**: Edite `src/Footer.jsx`.
    ```javascript
    <p>&copy; 2025 [Nome do Noivo] & [Nome da Noiva]. Todos os direitos reservados.</p>
    ```

### 3. Executando o Servidor de Desenvolvimento

Após a instalação das dependências e personalização, você pode iniciar o servidor de desenvolvimento para ver seu convite no navegador:

```bash
npm run dev
```

Isso abrirá seu convite em `http://localhost:5173` (ou outra porta disponível). O navegador será atualizado automaticamente a cada alteração que você fizer no código.

### 4. Construindo para Produção

Quando seu convite estiver pronto para ser compartilhado, você pode gerar uma versão otimizada para produção:

```bash
npm run build
```

Este comando criará uma pasta `dist/` com todos os arquivos estáticos necessários para hospedar seu convite em qualquer servidor web (como Netlify, Vercel, GitHub Pages, etc.).

### 5. Estilização

A estilização global é definida em `src/index.css`. Cada componente possui seu próprio arquivo `.css` (ex: `Header.css`, `EventDetails.css`) para estilização específica. Você pode ajustar cores, fontes e layouts conforme sua preferência.

Esperamos que este template ajude a tornar o planejamento do seu casamento um pouco mais fácil e divertido!