// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Row, Col, Container, Navbar, Nav, Carousel } from 'react-bootstrap';

// function AnimeCrudOperations() {
//   const [animeList, setAnimeList] = useState([]);
//   const [name, setName] = useState('');
//   const [synopsis, setSynopsis] = useState('');
//   const [rating, setRating] = useState('');
//   const [editingAnime, setEditingAnime] = useState(null);

//   useEffect(() => {
//     fetchAnime();
//   }, []);

//   const fetchAnime = () => {
//     axios.get('http://localhost:6005/anime/readP')
//       .then(response => {
//         setAnimeList(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the anime!', error);
//       });
//   };

//   const createAnime = () => {
//     axios.post('http://localhost:6005/anime/addP', {
//       name,
//       synopsis,
//       rating: parseFloat(rating)
//     })
//     .then(response => {
//       setAnimeList([...animeList, response.data]);
//       setName('');
//       setSynopsis('');
//       setRating('');
//     })
//     .catch(error => {
//       console.error('There was an error creating the anime!', error);
//     });
//   };

//   const updateAnime = (anime) => {
//     axios.put(`http://localhost:6005/anime/updateP/${anime.id}`, anime)
//       .then(response => {
//         setAnimeList(animeList.map(a => (a.id === anime.id ? response.data : a)));
//         setEditingAnime(null);
//       })
//       .catch(error => {
//         console.error('There was an error updating the anime!', error);
//       });
//   };

//   const deleteAnime = (id) => {
//     axios.delete(`http://localhost:6005/anime/deleteP/${id}`)
//       .then(() => {
//         setAnimeList(animeList.filter(anime => anime.id !== id));
//       })
//       .catch(error => {
//         console.error('There was an error deleting the anime!', error);
//       });
//   };

//   const handleEditClick = (anime) => {
//     setEditingAnime(anime);
//     setName(anime.name);
//     setSynopsis(anime.synopsis);
//     setRating(anime.rating.toString());
//   };

//   const handleSaveClick = () => {
//     if (editingAnime) {
//       updateAnime({ ...editingAnime, name, synopsis, rating: parseFloat(rating) });
//     } else {
//       createAnime();
//     }
//   };

//   return (
//     <div className="AnimeCRUD" style={{ backgroundColor: '#292929', color: '#fff' }}>
//       <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
//         <Container>
//           <Navbar.Brand href="#home">AnimeSuge</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="#home">Home</Nav.Link>
//               <Nav.Link href="#link">Link</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
      
//       <Carousel>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src={require('./1A.png')}
//       alt="First slide"
//     />

//   </Carousel.Item>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src={require('./2.jpg')}
//       alt="Second slide"
//     />
//   </Carousel.Item>
// </Carousel>


//       <Container className="mt-4">
//         <Row>
//           <Col lg={6}>
//             <Table striped bordered hover variant="dark" style={{ color: '#fff' }}>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Synopsis</th>
//                   <th>Rating</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {animeList.map(anime => (
//                   <tr key={anime.id}>
//                     <td>{anime.name}</td>
//                     <td>{anime.synopsis}</td>
//                     <td>{anime.rating}</td>
//                     <td>
//                       <Button variant="primary" onClick={() => handleEditClick(anime)}>Edit</Button>{' '}
//                       <Button variant="danger" onClick={() => deleteAnime(anime.id)}>Delete</Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>
//           <Col lg={6}>
//             <Form className="mt-3">
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
//               </Form.Group>
//               <br></br>
//               <Form.Group controlId="formSynopsis">
//                 <Form.Label>Synopsis</Form.Label>
//                 <Form.Control as="textarea" rows={3} placeholder="Enter synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
//               </Form.Group>
//               <br></br>
//               <Form.Group controlId="formRating">
//                 <Form.Label>Rating</Form.Label>
//                 <Form.Control type="number" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} />
//               </Form.Group>

//               <br></br>

//               <Button variant="success" onClick={handleSaveClick}>{editingAnime ? 'Update Anime' : 'Add Anime'}</Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default AnimeCrudOperations;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col, Container, Navbar, Nav, Carousel } from 'react-bootstrap';

function AnimeCrudOperations() {
  const [animeList, setAnimeList] = useState([]);
  const [name, setName] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [rating, setRating] = useState('');
  const [editingAnime, setEditingAnime] = useState(null);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = () => {
    axios.get('http://localhost:6005/anime/readP')
      .then(response => {
        setAnimeList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the anime!', error);
      });
  };

  const createAnime = () => {
    axios.post('http://localhost:6005/anime/addP', {
      name,
      synopsis,
      rating: parseFloat(rating)
    })
    .then(response => {
      setAnimeList([...animeList, response.data]);
      setName('');
      setSynopsis('');
      setRating('');
    })
    .catch(error => {
      console.error('There was an error creating the anime!', error);
    });
  };

  const updateAnime = (anime) => {
    axios.put(`http://localhost:6005/anime/updateP/${anime.id}`, anime)
      .then(response => {
        setAnimeList(animeList.map(a => (a.id === anime.id ? response.data : a)));
        setEditingAnime(null);
      })
      .catch(error => {
        console.error('There was an error updating the anime!', error);
      });
  };

  const deleteAnime = (id) => {
    axios.delete(`http://localhost:6005/anime/deleteP/${id}`)
      .then(() => {
        setAnimeList(animeList.filter(anime => anime.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the anime!', error);
      });
  };

  const handleEditClick = (anime) => {
    setEditingAnime(anime);
    setName(anime.name);
    setSynopsis(anime.synopsis);
    setRating(anime.rating.toString());
  };

  const handleSaveClick = () => {
    if (editingAnime) {
      updateAnime({ ...editingAnime, name, synopsis, rating: parseFloat(rating) });
    } else {
      createAnime();
    }
  };

  return (
    <div className="AnimeCRUD" style={{ backgroundColor: '#292929', color: '#fff' }}>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">AnimeSuge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./1A.png')}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./2.jpg')}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-4">
        <Row>
          <Col lg={6}>
            <Table striped bordered hover variant="dark" style={{ color: '#fff' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Synopsis</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {animeList.map(anime => (
                  <tr key={anime.id}>
                    <td>{anime.name}</td>
                    <td>{anime.synopsis}</td>
                    <td>{anime.rating}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditClick(anime)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => deleteAnime(anime.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={6}>
            <Form className="mt-3">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <br />
              <Form.Group controlId="formSynopsis">
                <Form.Label>Synopsis</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
              </Form.Group>
              <br />
              <Form.Group controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} />
              </Form.Group>
              <br />
              <Button variant="success" onClick={handleSaveClick}>{editingAnime ? 'Update Anime' : 'Add Anime'}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AnimeCrudOperations;
