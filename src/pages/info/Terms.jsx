import { Link } from "react-router-dom";
import "./info.scss";

const Terms = () => {
  return (
    <div className="info-container">
      <h3>Termos e Condições de Contrato</h3>
      <div className="info-item">
        <h4>1. Política de Privacidade</h4>
        <p>
          A sua privacidade é importante para nós. Todos os dados fornecidos por
          você serão tratados de acordo com a nossa <Link to="/privacy">política de privacidade</Link>.
          Certifique-se de ler e compreender nossa <Link to="/privacy">política de privacidade</Link> antes
          de utilizar a plataforma.
        </p>
      </div>
      <div className="info-item">
        <h4>2. Responsabilidade do Usuário</h4>
        <p>
          Ao utilizar nossa plataforma, você concorda em assumir total
          responsabilidade por qualquer ação ou conteúdo gerado por sua conta.
          Não nos responsabilizamos por perdas ou danos decorrentes do uso
          indevido ou inadequado da plataforma.
        </p>
      </div>
      <div className="info-item">
        <h4>3. Propriedade Intelectual</h4>
        <p>
          Todo o conteúdo disponibilizado na plataforma, incluindo logotipos,
          textos, imagens e recursos, são protegidos por direitos autorais e
          propriedade intelectual. É estritamente proibida a reprodução ou uso
          não autorizado desse conteúdo.
        </p>
      </div>
      <div className="info-item">
        <h4>4. Limitação de Responsabilidade</h4>
        <p>
          Em nenhuma circunstância seremos responsáveis por quaisquer danos
          diretos, indiretos, incidentais, especiais ou consequenciais
          decorrentes do uso ou incapacidade de uso da plataforma.
        </p>
      </div>
      <div className="info-item">
        <h4>5. Alterações nos Termos</h4>
        <p>
          Reservamos o direito de alterar ou atualizar estes termos e condições
          a qualquer momento. É responsabilidade do usuário revisar
          periodicamente os termos para estar ciente de quaisquer alterações.
        </p>
      </div>
    </div>
  );
};

export default Terms;
