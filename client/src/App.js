import { Container, Col, Row } from 'react-bootstrap';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/Signup';
import { Help } from './pages/Help';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import { LiveJam } from './pages/LiveJam';
import { NavBar } from './components/NavBar';

function App() {
  const { authUser  } = useAuthContext();
  const isLoggedIn = Boolean(authUser);    

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="m-2">JaMoeveo</h1>
          <NavBar isLoggedIn={isLoggedIn}/>
        </Col>
      </Row>

      <Routes>
        <Route path="/" element={authUser ? <LiveJam /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp isAdmin={false} />} />
        <Route path="/signup-admin" element={authUser ? <Navigate to='/' /> : <SignUp isAdmin={true} />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Toaster />

    </Container>
  );
}

export default App;
