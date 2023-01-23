import { FunctionComponent, useState } from 'react';
import { Layout, Drawer } from 'antd';
import { BookTable } from '../common/BookTable';
import { HeaderComponent } from '../common/Header';
import { BookForm } from '../common/BookForm';
import { Book } from '../../models/book.model';
import { useCreateBookMutation, useUpdateBookByIdMutation } from '../../state/services/bookApi';

interface HomePageProps {
    children?: any
}

const { Content } = Layout;

export const HomePage: FunctionComponent<HomePageProps> = () => {

    const [createBook, { isLoading: isCreateBookLoading }] = useCreateBookMutation();
    const [updateBook, { isLoading: isUpdateBookLoading }] = useUpdateBookByIdMutation();

    const [activeBook, setActiveBook] = useState<Book | null>(null)

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);


    const onOpenDrawer = () => {
        setOpenDrawer(true)
    }

    const onCloseDrawer = () => {
        setActiveBook(null);
        setOpenDrawer(false);
    }

    const onSelectBook = (book: Book) => {
        setActiveBook(book);
        onOpenDrawer();
    }

    const onCreateBook = (values: Omit<Book, "_id">) => {
        createBook(values);
        onCloseDrawer();
    }

    const onUpdateBook = (id: string, values: Omit<Book, "_id">) => {
        updateBook({
            id,
            body: values
        })
        onCloseDrawer();
    }

    const h3Styles = {
        marginBottom: '0.8rem'
    }

    return <Layout>
        <Content>
            <HeaderComponent onOpenDrawer={onOpenDrawer} />
            <BookTable onSelectBook={onSelectBook} />
        </Content>

        <Drawer placement='right' open={openDrawer} onClose={onCloseDrawer}>
            <h3 style={h3Styles}>{activeBook ? 'Update your book' : 'Create a new book'}</h3>
            <BookForm activeBook={activeBook} onCreate={onCreateBook} onUpdate={onUpdateBook} />
        </Drawer>
    </Layout>
}
