import ThemeContextProvider from "./store/ThemeContextProvider";
import Page from "./components/Page";
function App() {
  

  return (
   <ThemeContextProvider>
    <Page/>
    </ThemeContextProvider>
  )
}

export default App;
