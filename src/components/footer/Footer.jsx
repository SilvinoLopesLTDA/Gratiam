import { useState, useEffect } from "react";
import versionData from "./version/version.json";
import styles from "./Footer.module.scss";

const Footer = () => {
  const [version, setVersion] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const repoUrl = "https://github.com/SilvinoLopesLTDA/Gratiam";

  useEffect(() => {
    try {
      const { version: versionNumber } = versionData;
      setVersion(versionNumber);
    } catch (error) {
      console.error("Erro ao obter a versão do arquivo version.json:", error);
    }

    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);

  return (
    <div className={styles.footer}>
      Todos Direitos Reservados &copy; Gratiam |{" "}
      <a href={repoUrl} target="_blank" rel="noreferrer">
        {version}
      </a>{" "}
      | {currentYear}
    </div>
  );
};

export default Footer;
