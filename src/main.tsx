import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './config'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './views/not-found/notfound'
import { Layout } from './views/layout'
import { History } from './views/history'
import { Home } from './views/home'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
    <GlobalStyle/>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path='history' element={<History />} />
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </>
)
