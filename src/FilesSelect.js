import { Form, ListGroup } from "react-bootstrap";

export default function FilesSelect(props) {
    const files = props.files;
    let listItems = null;
    if (files !== undefined) {
        listItems = files.map((file) =>
            <option value={file.eTag}>{file.key}</option>
        );
    }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Database</Form.Label>
            <Form.Select>
                {listItems}
            </Form.Select>
        </Form.Group>

    );
}