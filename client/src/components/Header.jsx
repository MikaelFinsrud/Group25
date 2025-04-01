import './header.css'

function Header() {
    return(
        <>
            <div className="header">
                <div className="header-left">
                    <h2>ElectroMart</h2>
                </div>

                <div className="header-center">
                    <input type="text" placeholder="Search for products..." />
                </div>

                <div className="header-right">
                    <button>Login</button>
                    <button>Cart</button>
                </div>
            </div>
        </>
    )
}

export default Header;