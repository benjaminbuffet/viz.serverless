import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import FilesSelect from "./FilesSelect";

export default function App(props) {
    const [userFiles, setUserFiles] = useState([]);



    async function onChange(e) {
        const file = e.target.files[0];
        try {
            await Storage.put(file.name, file, {
                level: 'private',
                contentType: 'test/plain',
                progressCallback(progress) {
                    console.log(progress)
                },
            });
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }
    useEffect(() => {
        Storage.list('', { level: 'private' })
            .then(result => setUserFiles(result))
            .catch(err => console.log(err));
    }, []);

    const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 350, pv: 3600, amt: 2100 },
    { name: 'Page C', uv: 200, pv: 500, amt: 3000 }];

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">Olbox.viz</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{props.user.username}</a>
                        </Navbar.Text>
                        <Nav.Item>
                            <AmplifySignOut />
                        </Nav.Item>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="file-upload-container">
                <Form>
                    <Form.Control type="file" onChange={onChange} />
                </Form>
            </Container>
            <Container className="chart-board-container">
                <Row>
                    <Col sm={4}>
                        <FilesSelect files={userFiles} onChange={handleDatabaseChange}></FilesSelect>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Columns</Form.Label>
                            <Form.Select>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm={8}>
                        <LineChart width={800} height={300} data={data}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
