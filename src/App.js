import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./components/Header.js";
import Homepage from "./Pages/Homepage.js";
import Coinpage from "./Pages/Coinpage.js";
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles({
  App:{
  backgroundColor: "#14161a",
  color:"white",
  minHeight:"100vh",
  },
});

function App() {

 const classes=useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
           <Header/>
           <Routes>
           <Route path="/" element={<Homepage/>} exact/>
           <Route path="/coins/:id" element={<Coinpage/>}/>
           </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
