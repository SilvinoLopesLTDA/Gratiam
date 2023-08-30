import './info.scss'

const Faq = () => {
  return (
    <div className="info-container">
      <h3>Perguntas frequentes - FAQ</h3>
      <div className="info-item">
        <h4>1. Como posso cadastrar um novo produto no sistema?</h4>
        <p>
          Para cadastrar um novo produto, acesse a página &quot;Adicionar&quot; localizada
          na sidebar e clique para ser redirecionado ao &quot;Adicionar Produto&quot;.
          Preencha as informações solicitadas, como nome, descrição, preço e
          quantidade disponível, e clique em &quot;Salvar&quot;. O produto será adicionado
          ao seu estoque.
        </p>
      </div>
      <div  className="info-item">
        <h4>
          2. Como faço para atualizar a quantidade de um produto no estoque?
        </h4>
        <p>
          Para atualizar a quantidade de um produto no estoque, vá para a página
          de gerenciamento de estoque e encontre o produto na lista. Ao lado da
          quantidade atual, haverá um icone roxo, clique nele para ser
          redirecionado ao campo de edição. Digite a nova quantidade desejada e
          clique em &quot;Atualizar&quot; para salvar as alterações.
        </p>
      </div>
      <div className="info-item">
        <h4>3. Posso realizar pagamentos diretamente pelo sistema?</h4>
        <p>
          Não, o sistema de gerenciamento de estoque não possui integração
          direta com métodos de pagamento. Ele é projetado para auxiliar no
          controle e organização do estoque. Para processar pagamentos, você
          pode integrar o sistema com uma plataforma de pagamento de sua
          escolha.
        </p>
      </div>
      <div className="info-item">
        <h4>4. Como exportar a tabela de produtos em formato CSV ou XLSX?</h4>
        <p>
          Para exportar a tabela de produtos, navegue até a seção de estoque no
          menu principal. E clique no botão &quot;Exportar&quot;. O sistema gerará um
          arquivo no formato CSV ou XLSX contendo os dados de vendas
          correspondentes, que você poderá baixar e utilizar em outras
          ferramentas, como planilhas eletrônicas.
        </p>
      </div>
      <div className="info-item">
      <h4>5. Como identifico quando o estoque de um produto estiver em baixa quantidade?</h4>
        <p>
          O sistema permite limite mínimo de estoque para cada produto. Quando a
          quantidade disponível de um produto atingir esse limite, você podera
          encontrar facilmente encontra-lo pois estara em vermelho além do card
          &quot;Fora de Estoque&quot; que exibe a quantidade de produtos com a quantidade
          igual a zero;
        </p>
      </div>
    </div>
  );
};

export default Faq;
