import { Container, Col, Row } from 'react-bootstrap';
import { Navigate, Routes, Route, Link } from 'react-router-dom';
import {Login} from './pages/Login';
import {SignUp} from './pages/Signup';
import { Help } from './components/Help';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import { LiveJam } from './pages/LiveJam';

function App() {
	const { authUser } = useAuthContext();
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>JaMoeveo</h1>

          <section id="navigation">
            <Link to={"/"} href="#">Home</Link>-
            <Link to={"/help"} href="#">Help</Link>-
            <Link to={"/login"} href="#">Login</Link>-
            <Link to={"/signup"} href="#">Sign up</Link>-
            <Link to={"/signup-admin"} href="#">Sign up Admins</Link>
          </section>
        </Col>
      </Row>

      <Routes>
        <Route path="/" element={authUser ? <LiveJam /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login/>}  />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp isAdmin={false}/>}  />
        <Route path="/signup-admin" element={authUser ? <Navigate to='/' /> : <SignUp isAdmin={true}/>}  />
        <Route path="/help" element={<Help />} />
      </Routes>
        <Toaster />

    </Container>
  );
}

export default App;
