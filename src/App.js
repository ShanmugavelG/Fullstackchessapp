import { CourseProvider } from './Component/Couses/CourseContext';
import { AuthProvider } from './Component/Login/AuthContext';
import { LoginProvider } from './Component/Login/LoginContext';
import Routing from './Component/Routing';
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <LoginProvider>
        <CourseProvider>
            <Routing/>
      </CourseProvider>
      </LoginProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
