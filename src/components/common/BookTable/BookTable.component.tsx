
import { FunctionComponent, } from 'react';
import { Table, Popconfirm, Space } from 'antd';
import { useDeleteBookByIdMutation, useFetchBooksQuery } from '../../../state/services/bookApi';
import { Book } from '../../../models/book.model';

interface BookTableProps {
    children?: any;
    onSelectBook: (book: Book) => void;
}

export const BookTable: FunctionComponent<BookTableProps> = ({ onSelectBook }) => {

    const { data: booksPayload, isLoading: booksLoading } = useFetchBooksQuery("");

    const [deleteBook] = useDeleteBookByIdMutation();

    const onDeleteRow = (row: Book) => {
        deleteBook(row._id);
    }


    const bookTableColumns = [{
        title: 'Name',
        key: 'name',
        dataIndex: 'name'
    }, {
        title: 'Author',
        key: 'author',
        dataIndex: 'author'
    }, {
        title: "Year",
        key: 'year',
        dataIndex: 'year'
    }, {
        title: "Description",
        key: 'description',
        dataIndex: 'description'
    },
    {
        title: 'Actions',
        dataIndex: '',
        key: 'x',
        render: (text: string, record: Book) => <div>
            <Space size="middle">
                <a style={{ userSelect: "none" }} onClick={() => onSelectBook(record)}>Update</a>
                <Popconfirm
                    title="Delete the book"
                    description="Are you sure to delete this book?"
                    onConfirm={() => onDeleteRow(record)}
                    okText="Yes"
                    cancelText="No"
                ><a style={{ userSelect: "none" }}>Delete</a></Popconfirm>
            </Space>

        </div>,
    },
    ]

    return <Table dataSource={booksPayload?.books} columns={bookTableColumns} loading={booksLoading} pagination={false} />
}