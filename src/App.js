import { faSearch, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="nav">
          <h1 className="logo">
            Rock<span>STORE</span>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Produto</Link>
              </li>
              <li>
                <Link to="/about">Sobre</Link>
              </li>
              <li>
                <Link to="/contact">Contato</Link>
              </li>
              <li>
                <Link to="/account">Conta</Link>
              </li>
            </ul>
          </nav>
          
          <div className="nav-icon-container">
            <div className="search-input-container">
              <input type="search"/>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <button className="shopping-cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              <div className="product-count">0</div>
            </button>
            <button className="menu-button">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

