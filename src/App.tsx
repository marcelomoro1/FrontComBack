import {ProdutoLista} from "./components/ProdutoLista.tsx";
import {useState} from "react";
import {Modal} from "./components/Modal.tsx";
import {ProdutoFormulario} from "./components/ProdutoFormulario.tsx";

function App() {

    // Cria um estado booleano chamado showForm, que indica se o modal deve ser exibido ou não
    const [showForm, setShowForm] = useState(false)

    //teste
    return (
        <>


            <ProdutoLista/>

            <div style={{padding: "20px"}}>
                <button onClick={() => setShowForm(true)}>Novo Produto</button>
            </div>

            {/* Modal que envolve o formulário. Só é exibido se showForm for true */}

            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <ProdutoFormulario onClose={() => setShowForm(false)} />
            </Modal>

        </>
    )
}

export default App
