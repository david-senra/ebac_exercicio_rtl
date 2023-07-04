import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    const comentariosValidos: string[] = ["Não achei muito bom", "Gostei bastante", "Razoável"]
    const comentariosInvalidos: string[] = [" ", ""]
    const comentariosTotais: string[] = comentariosValidos.concat(comentariosInvalidos)

    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve renderizar comentário válido corretamente', () => {
        render(<PostComment/>);
        const textoComment = screen.getByTestId('texto-comentario')
        const form = screen.getByTestId('form')
        fireEvent.change(textoComment, {target: {value: comentariosValidos[0]}})
        fireEvent.submit(form)
        expect(screen.getByText('Não achei muito bom')).toBeInTheDocument();
    });

    it('Não deve renderizar comentários inválidos', () => {
        render(<PostComment/>);
        const textoComment = screen.getByTestId('texto-comentario')
        const form = screen.getByTestId('form')
        comentariosInvalidos.forEach((comentario) => {
            fireEvent.change(textoComment, {target: {value: comentario}})
            fireEvent.submit(form)
        })
        expect(screen.queryByTestId('comentario')).toBeNull()
    });

    it('Deve renderizar múltiplos comentários adicionados separadamente, sem incluir comentários inválidos', () => {
        render(<PostComment/>);
        const textoComment = screen.getByTestId('texto-comentario')
        const form = screen.getByTestId('form')
        comentariosTotais.forEach((comentario) => {
            fireEvent.change(textoComment, {target: {value: comentario}})
            fireEvent.submit(form)
        })
        expect(screen.getAllByTestId('comentario')).toHaveLength(3)
    })
});