import React from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Modal({isOpen, onClose, children}: ModalProps) {
    //Se nao estiver aberto faz nda
    if (!isOpen) return null

    return (
        // Div que cobre a tela inteira e escurece o fundo (overlay)
        // Também permite fechar o modal ao clicar fora do conteúdo
        <div className="modal-overlay" onClick={onClose}>
            {/* Div que contém o conteúdo do modal.
                O clique aqui é interrompido para não fechar o modal */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Botão de fechar (X) no canto superior direito */}
                <button className="close-button" onClick={onClose}>×</button>

                {/* Renderiza os componentes filhos dentro do modal */}
                {children}
            </div>
        </div>
    )
}
