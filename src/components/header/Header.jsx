const Header = () => {
  return (
    <div className="--pad header">
        <div className="--flex-between">
            <h3>
                <span className="--fw-thin">Bem vindo de volta, </span>
                <span className="--color-primary"> Matheus </span>
            </h3>
            <button className="--btn --btn-primary">
                Sair
            </button>
        </div>
        <hr />
    </div>
  )
}

export default Header