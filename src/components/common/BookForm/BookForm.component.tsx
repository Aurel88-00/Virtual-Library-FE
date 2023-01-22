import { FunctionComponent, useEffect } from 'react';
import { Book } from '../../../models/book.model';
import { Form, Input, Button } from 'antd';


interface BookFormProps {
    children?: any;
    activeBook: Book | null;
    onCreate: (values: Omit<Book, "_id">) => void;
    onUpdate: (id: string, values: Omit<Book, "_id">) => void;
}

export const BookForm: FunctionComponent<BookFormProps> = ({ activeBook, onCreate, onUpdate }) => {

    const [form] = Form.useForm();

    useEffect(() => {
       
        if(activeBook) {
            form.setFieldsValue(activeBook);
        } else {
            form.resetFields()
        }
    }, [activeBook])

    return <Form
        name="book_form"
        className="book-form"
        onFinish={(values) => {
            if(activeBook) {
                onUpdate(activeBook._id, values);
            } else {
                onCreate(values);
            }
        }}
        form={form}
    >
        <Form.Item
            name="name"
            rules={[
                {
                    required: true,
                    message: `Please input the book's Name!`,
                },
            ]}
        >
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
            name="author"
            rules={[
                {
                    required: true,
                    message: `Please input the book's Author!`,
                },
            ]}
        >
            <Input placeholder="Author" />
        </Form.Item>

        <Form.Item
            name="year"
            rules={[
                {
                    required: true,
                    message: `Please input the book's Year!`,
                },
            ]}
        >
            <Input placeholder="Year" type="number" />
        </Form.Item>

        <Form.Item
            name="description"
            rules={[
                {
                    required: true,
                    message: `Please input the book's Description!`,
                },
            ]}
        >
            <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                {activeBook ? 'Update' : 'Create'}
            </Button>
        </Form.Item>
    </Form>
}