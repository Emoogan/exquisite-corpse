import './App.css';
import ActiveDraw from './components/active-draw/ActiveDraw';

function App() {
  return (
  <ActiveDraw
  handleClick={()=>{}}
  color={"black"}
  lineWidth={3}
  dimension={[600,600]} // assume px
/>)
}

export default App;
