import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import './index.css'

import Root, { loader as rootLoader } from './routes/Root';
import ErrorPage from './ErrorPage';
import Index from './routes/Index';

import Read from './routes/Read';
import Create, { action as addAction } from './routes/Create';
import Edit, { action as editAction } from './routes/Edit';
import { action as deleteAction } from './routes/Delete';

import Relatório from './routes/Relatório';
import Configuracoes from './routes/Configuracoes';
import Instrucoes from './routes/Instrucoes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: < ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/recursos',
        element: <Read />,
      },
      {
        path: '/recursos/adicionar',
        element: <Create />,
        action: addAction,
      },
      {
        path: '/recursos/:resourceId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/recursos/:resourceId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/relatorio',
        element: <Relatório />,
      },
      {
        path: '/poupanças',
        element: <Read />,
      },
      {
        path: '/poupanças/adicionar',
        element: <Create />,
        action: addAction
      },
      {
        path: '/poupanças/:savingId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/poupanças/:savingId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/contas',
        element: <Read />
      },
      {
        path: '/contas/adicionar',
        element: <Create />,
        action: addAction
      },
      {
        path: '/contas/:billId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/contas/:billId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/despesas',
        element: <Read />
      },
      {
        path: '/despesas/adicionar',
        element: <Create />,
        action: addAction
      },
      {
        path: '/despesas/:savingId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/despesas/:expeseId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/parcelas',
        element: <Read />
      },
      {
        path: '/parcelas/adicionar',
        element: <Create />,
        action: addAction
      },
      {
        path: '/parcelas/:istallmentId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/parcelas/:istallmentId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/creditos',
        element: <Read />
      },
      {
        path: '/creditos/adicionar',
        element: <Create />,
        action: addAction
      },
      {
        path: '/creditos/:creditId/editar',
        element: <Edit />,
        action: editAction,
      },
      {
        path: '/creditos/:creditId/editar/delete',
        action: deleteAction,
      },
      {
        path: '/configuracoes',
        element: <Configuracoes />
      },
      {
        path: '/instrucoes',
        element: <Instrucoes />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
