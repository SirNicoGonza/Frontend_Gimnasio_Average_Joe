export default function NotFound() {
    return (
        <div id="container-login">
            <style>
                {`
                    #container-login {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 90vh;
                        background-color: #303030;
                        color: white;
                        text-align: center;
                    }

                    #title {
                        font-size: 2rem;
                        margin-bottom: 10px;
                        color: #1db954;
                    }

                    p {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 5px 0;
                    }

                    .material-symbols-outlined {
                        font-size: 4rem;
                        color: #1db954;
                        margin-top: 10px;
                    }
                `}
            </style>
            <link 
                rel="stylesheet" 
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" 
            />
            <h2 id="title">Página no encontrada</h2>
            <p>ERROR 404</p>
            <i className="material-symbols-outlined">database_off</i>
        </div>
    );
}
