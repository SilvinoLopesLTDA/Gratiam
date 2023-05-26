import "./info.scss";

const Privacy = () => {
  return (
    <div className="info-container">
      <h3>Política de Privacidade</h3>
      <div className="info-item">
        <h4>1. Coleta de Dados</h4>
        <p>
          A sua privacidade é importante para nós. Todos os dados fornecidos por
          você serão tratados de acordo com a nossa política de privacidade.
          Certifique-se de ler e compreender nossa política de privacidade antes
          de utilizar a plataforma.
        </p>
      </div>
      <div className="info-item">
        <h4>2. Uso dos Dados</h4>
        <p>
          Os dados coletados serão utilizados exclusivamente para fins de
          gerenciamento do estoque e processamento de pedidos. Não compartilharemos
          suas informações com terceiros sem o seu consentimento.
        </p>
      </div>
      <div className="info-item">
        <h4>3. Segurança dos Dados</h4>
        <p>
          Implementamos medidas de segurança para proteger seus dados contra
          acesso não autorizado ou uso indevido. No entanto, não podemos garantir
          a segurança absoluta dos dados transmitidos pela internet.
        </p>
      </div>
      <div className="info-item">
        <h4>4. Cookies</h4>
        <p>
          Utilizamos cookies para melhorar a experiência do usuário e fornecer
          recursos personalizados. Você pode optar por desativar os cookies no
          seu navegador, mas isso pode afetar o funcionamento da plataforma.
        </p>
      </div>
      <div className="info-item">
        <h4>5. Alterações na Política de Privacidade</h4>
        <p>
          Reservamos o direito de alterar ou atualizar nossa política de privacidade
          a qualquer momento. É responsabilidade do usuário revisar periodicamente
          a política de privacidade para estar ciente de quaisquer alterações.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
